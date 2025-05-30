"use client"

import Image from "next/image"

interface PokemonDetailsProps {
  pokemon: {
    id: number
    name: string
    height: number
    weight: number
    types: Array<{ type: { name: string } }>
    stats: Array<{ stat: { name: string } }>
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
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  
  return (
    <div className="max-w-5xl mx-auto">
        
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 flex justify-center items-center bg-[#60e2c9]">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                        <Image 
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={pokemon.name}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-200"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-grow bg-[#fcc666]">
                    <p className="text-xl text-gray-800 mb-2 capitalize"><strong>Name:</strong> {pokemon.name}</p>
                    <p className="text-xl text-gray-800 mb-2 capitalize"><strong>Type:</strong>
                    {pokemon.types.map((type) => (
                        <span key={type.type.name} className=" text-lg font-serif font-medium">
                            {type.type.name} 
                        </span>
                    ))}
                    </p>
                    <p className="text-xl text-gray-800 mb-2 capitalize"><strong>Stats:</strong> 
                    {pokemon.stats.map((stat) => (
                        <span key={stat.stat.name} className="text-lg font-serif font-medium">{stat.stat.name.replace("-", " ")} </span>
                    ))}
                    </p>
                    <p className="text-xl text-gray-800 mb-2 capitalize"><strong>Abilities:</strong> 
                    {pokemon.abilities.map((ability) => (
                      <span key={ability.ability.name} className="text-lg font-serif font-medium">
                        {ability.ability.name.replace("-", " ")} {','}
                      </span>
                    ))}
                    </p>
                    <p className="text-xl text-gray-800 mb-2 capitalize"><strong>Some Moves:</strong> 
                    {pokemon?.moves.slice(0, 5).map((move) => (
                      <span key={move.move.name} className="text-lg font-serif font-medium">
                        {move.move.name.replace("-", " ")} {','}
                      </span>
                    ))}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
