import { useState } from "react"

import Map from "@/components/Map"

import { Input } from "@/components/ui/input"



export default function MapsPage() {
  const [search, setSearch] = useState("")

  const handleSearch = (e: any) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  return (
    <>
      <header className="p-5 absolute top-10 z-40 w-full">
        <form >
          <Input placeholder={"Charles de Gaulle, Juan Bosch..."} onKeyUpCapture={handleSearch} className="bg-white" />
        </form>
      </header>

      <main className="h-full">
        <Map />
      </main >
    </>
  )
}
