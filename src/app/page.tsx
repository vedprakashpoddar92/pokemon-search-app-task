import { Suspense } from "react"
import { PokemonSearchForm } from "@/components/pokemon-search-form"
import { getPokemonTypes } from "@/lib/pokemon-api"
import { PokemonList } from "@/components/pokemon-list";

type SearchParams = Promise<{ type?: string; search?:string }>

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {type, search} = await searchParams;
  const types = await getPokemonTypes()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-600 mb-4">Pokemon App </h1>
          <p className="text-lg text-gray-600">Discover and explore the world of Pokémon</p>
        </header>

        <div className="max-w-5xl mx-auto">
          <PokemonSearchForm types={types} />

          <Suspense fallback={<PokemonListSkeleton />}>
            <PokemonList selectedType={type} searchTerm={search} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function PokemonListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>
      ))}
    </div>
  )
}