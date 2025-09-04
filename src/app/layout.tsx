import type { Metadata } from "next";
import { Inter, Roboto } from 'next/font/google';
import "./globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import { Header } from "@/components/ui/header/header";
import { Footer } from "@/components/ui/footer/footer";


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})
export const metadata: Metadata = {
  metadataBase: new URL("https://on-air-movies.vercel.app"),
  title: {
    default: "OnAir Movies",
    template: "%s | OnAir Movies",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  description:
    "Watch movies and TV shows online, explore movie galleries, see popular actors and their works, read actor biographies, and watch trailers.",
  keywords: [
    "movies online",
    "tv shows online",
    "movie gallery",
    "actors",
    "actor biography",
    "watch trailers",
  ],
  openGraph: {
    title: "OnAir Movies – Movies, Actors, Trailers",
    description:
      "Discover the latest movies and TV shows, browse images, explore popular actors and their filmography, and watch trailers online.",
    url: "https://on-air-movies.vercel.app",
    siteName: "OnAir Movies",
    images: [
      {
        url: "/og-hero.jpg", 
        width: 1200,
        height: 630,
        alt: "Movies and actors online",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable}`}
      >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <div id="root_modal" />
      </body>
    </html>
  );
}
