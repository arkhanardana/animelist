"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function AnimeList() {
	const [animeList, setAnimeList] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const inputRef = useRef(null);

	const getAnimeList = async (query = "") => {
		const apiUrl = query ? `https://api.jikan.moe/v4/anime?q=${query}` : "https://api.jikan.moe/v4/anime";
		try {
			const response = await fetch(apiUrl);
			const data = await response.json();
			setAnimeList(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(searchQuery);
		}, 500);
		return () => {
			clearTimeout(handler);
		};
	}, [searchQuery]);

	useEffect(() => {
		getAnimeList(debouncedQuery);
	}, [debouncedQuery]);

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<div className="container mx-auto">
			<h1 className="text-3xl text-center p-4">ANIMELIST</h1>

			{/* Search Bar */}
			<div className="flex mx-2 sm:mx-4 justify-center mb-4">
				<input
					type="text"
					placeholder="Search anime..."
					value={searchQuery}
					onChange={handleSearch}
					className="border p-2 rounded w-full sm:w-1/2 text-black"
					ref={inputRef}
				/>
			</div>

			{/* Anime Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
				{!!animeList.length ? (
					animeList.map((anime) => (
						<div key={anime.mal_id} className="bg-white p-4 rounded shadow-lg">
							<Image
								className="w-full h-96 object-cover rounded-lg"
								src={anime.images.webp.image_url}
								alt={anime.title}
								width={300}
								height={500}
								loading="lazy"
							/>
							<h2 className="text-xl font-bold mt-2 text-black">{anime.title}</h2>
							<p className="text-sm mt-1 text-black">
								{anime.synopsis ? anime.synopsis.slice(0, 100) + "..." : "No synopsis available."}
							</p>
						</div>
					))
				) : (
					<p className="text-center col-span-4">No anime found...</p>
				)}
			</div>
		</div>
	);
}
