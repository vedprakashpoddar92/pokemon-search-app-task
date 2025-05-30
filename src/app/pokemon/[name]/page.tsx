import { notFound } from "next/navigation"
import { getPokemonDetails } from "@/lib/pokemon-api"
import { PokemonDetails } from "@/components/pokemon-details"
import { Breadcrumb } from "@/components/breadcrumb"


export default async function PokemonPage({params}:{params: Promise<{name: string}>}) {
  const { name } = await params
  
  try {
    const pokemon = await getPokemonDetails(name || '')

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb pokemonName={pokemon.name} />
            <PokemonDetails pokemon={pokemon} />
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

export async function generateMetadata({params}:{params: Promise<{name: string}>}) {
    const { name } = await params
  try {
    const pokemon = await getPokemonDetails(name)
    return {
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokedex`,
      description: `Learn about ${pokemon.name}, a ${pokemon.types.map((t) => t.type.name).join("/")} type Pokemon.`,
    }
  } catch {
    return {
      title: "Pokemon Not Found - Pokedex",
      description: "The Pokemon you're looking for doesn't exist in our Pokedex.",
    }
  }
}