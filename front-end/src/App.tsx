import MapsPage from "@/pages/MapsPage"
import BusStopsPage from "@/pages/BusStopsPage"
import DriversPage from "@/pages/DriversPage"
import BusPage from "@/pages/BusPage"

import Navbar from "@/components/Navbar"

import { Route, Routes } from "react-router-dom";

export default function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<MapsPage />} />
        <Route path="bus-stops" element={<BusStopsPage />} />
        <Route path="drivers-page" element={<DriversPage />} />
        <Route path="bus-page" element={<BusPage />} />
      </Routes>

      <footer className="absolute w-full bottom-0 bg-white">
        <Navbar />
      </footer>
    </>
  )
}

