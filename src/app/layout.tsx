import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const font = GeistSans;

export const metadata: Metadata = {
	title: "Anime List",
	description: "Cari anime favorit kamu semua",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>{children}</body>
		</html>
	);
}
