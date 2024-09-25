import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pokemonFont = localFont({
  src: "./fonts/PokemonSolid.woff",
  variable: "--font-pokemon",
});

export const metadata: Metadata = {
  title: "Pokémon Epicness",
  description: "Pokémon Epicness by Tarik Trokic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pokemonFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
