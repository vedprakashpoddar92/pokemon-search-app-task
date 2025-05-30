interface Pokemon {
    name: string
    url: string
  }
  
  interface PokemonType {
    name: string
    url: string
  }
  
  interface PokemonDetails {
    id: number
    name: string
    height: number
    weight: number
    types: Array<{ type: { name: string } }>
    stats: Array<{ base_stat: number; stat: { name: string } }>
    abilities: Array<{ ability: { name: string } }>
    moves: Array<{ move: { name: string } }>
    sprites: {
      other: {
        "official-artwork": {
          front_default: string
        }
      }
    }
  }
  
  export async function getPokemonTypes(): Promise<PokemonType[]> {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type", {
        next: { revalidate: 3600 }, // Cache for 1 hour
      })
  
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon types")
      }
  
      const data = await response.json()
      return data.results
    } catch (error) {
      console.error("Error fetching Pokémon types:", error)
      return []
    }
  }
  
  export async function getPokemonList(selectedType?: string, searchTerm?: string): Promise<Pokemon[]> {
    try {
      let pokemon: Pokemon[] = []
  
      if (selectedType) {
        // Fetch Pokemon by type
        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`, {
          next: { revalidate: 3600 },
        })
  
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon by type")
        }
  
        const data = await response.json()
        pokemon = data.pokemon.map((p: any) => p.pokemon)
      } else {
        // Fetch all Pokemon if no type is selected
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
          next: { revalidate: 3600 },
        })
  
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon list")
        }
  
        const data = await response.json()
        pokemon = data.results
      }
  
      // Filter by search term if provided
      if (searchTerm) {
        pokemon = pokemon.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      }
  
      return pokemon.slice(0, 100)
    } catch (error) {
      console.error("Error fetching Pokémon list:", error)
      return []
    }
  }
  
  export async function getPokemonDetails(name: string): Promise<PokemonDetails> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      next: { revalidate: 3600 },
    })
  
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon details")
    }
  
    return response.json()
  }
  