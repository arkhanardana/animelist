"use client";

import { GithubLogo } from "@phosphor-icons/react";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="sticky p-3 w-full bg-white mb-9 top-0">
			<ul>
				<li className="flex justify-between items-center mx-4 sm:mx-14">
					<Link href="/" className="text-xl text-[#070f2b] font-semibold cursor-pointer">
						AnimeList
					</Link>
					<Link href="https://github.com/arkhanardana" aria-label="GitHub Arkhan Ardana">
						<GithubLogo size={40} className="cursor-pointer" />
					</Link>
				</li>
			</ul>
		</nav>
	);
}
