"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePokemonDetails } from "@/hooks/use-pokemon-details"

interface Pokemon {
  name: string
  url: string
}

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {

  const pokemonId = pokemon.url.split("/").filter(Boolean).pop()
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col">
            <div className="p-6 flex justify-center items-center bg-gray-100">
                <div className="relative w-32 h-32 mx-auto mb-4">
                <Image 
                    src={imageUrl}
                    alt={pokemon.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-200"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 capitalize">{pokemon.name}</h3>
                <div className="mt-auto pt-4 text-blue-500 inline-flex items-center hover:text-blue-700 transition-colors">
                <Link 
                    href={`/pokemon/${pokemon.name}`} 
                >
                Details →
                </Link>
                </div>
            </div>
        </div>
    </Link>
  )
}