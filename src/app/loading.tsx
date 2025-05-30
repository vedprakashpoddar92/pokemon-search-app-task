import { LoaderPinwheel } from "lucide-react";

export default function Loading() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Loading Pokemon...</h2>
        </div>
      </div>
    )
}  