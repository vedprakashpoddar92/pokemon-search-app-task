"use client"

import type React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"

interface PokemonType {
  name: string
  url: string
}

interface PokemonSearchFormProps {
  types: PokemonType[]
}

export function PokemonSearchForm({ types }: PokemonSearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "")


  const handleSearch = () => {
    startTransition(() => {
      const params = new URLSearchParams()
      if (searchTerm) params.set("search", searchTerm)
      if (selectedType) params.set("type", selectedType)

      router.push(`/?${params.toString()}`)
    })
  }

  const handleClear = () => {
    setSearchTerm("")
    setSelectedType("")
    startTransition(() => {
      router.push("/")
    })
  }

  const hasFilters = searchParams.get("search") || searchParams.get("type")
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="space-y-2">
            <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">Select Type</option>
                {types.map((type) => (
                    <option key={type.name} value={type.name}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</option>
              ))}
            </select>
        </div>

        <div className="space-y-2">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " 
                    placeholder="Search Pokemon by Name"     
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="flex gap-2 items-center justify-start">
          <button onClick={handleSearch} disabled={isPending} className="text-white bg-blue-700 p-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm">
            {isPending ? "Searching..." : "Search"}
          </button>
          {hasFilters && ( <button onClick={handleClear} className="text-[#333] rounded-lg text-sm font-bold">
            Clear Filter
          </button>)}
        </div>
      </div>
    </div>
  )
}
