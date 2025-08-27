import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-center px-4">
      <h1 className="text-6xl sm:text-7xl font-extrabold text-white drop-shadow-lg">
        404
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors duration-300 shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}