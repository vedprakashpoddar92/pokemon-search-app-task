"use client"

import { useState, useEffect } from "react"

interface PokemonDetails {
  id: number
  name: string
  types: Array<{ type: { name: string } }>
  moves: Array<{ move: { name: string } }>
  sprites: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
}

export function usePokemonDetails(pokemonName: string) {
  const [data, setData] = useState<PokemonDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        setIsLoading(true)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon details")
        }

        const pokemon = await response.json()
        setData(pokemon)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    if (pokemonName) {
      fetchPokemonDetails()
    }
  }, [pokemonName])

  return { data, isLoading, error }
}
