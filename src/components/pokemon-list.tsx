import { getPokemonList } from "@/lib/pokemon-api"
import { PokemonCard } from "@/components/pokemon-card"

interface PokemonListProps {
  selectedType?: string
  searchTerm?: string
}

export async function PokemonList({ selectedType, searchTerm }: PokemonListProps) {
  const pokemon = await getPokemonList(selectedType, searchTerm)
   
  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Pokemon found</h3>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.name} pokemon={poke} />
      ))}
    </div>
  )
}
