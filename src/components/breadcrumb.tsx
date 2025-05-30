import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbProps {
  pokemonName: string
}

export function Breadcrumb({ pokemonName }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="flex items-center hover:text-indigo-600 transition-colors">
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="capitalize font-medium text-gray-900">{pokemonName}</span>
    </nav>
  )
}