import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pokémon Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">The Pokémon you're looking for doesn't exist or has escaped!</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          <Link href="/">Return to Pokédex</Link>
        </button>
      </div>
    </div>
  )
}