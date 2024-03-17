import steeringWheel from "@/assets/steering-wheel.png"
import profile from "@/assets/profile.png"
import home from "@/assets/home.png"
import compass from "@/assets/compass.png"
import bus from "@/assets/bus.png"

import { useState, useContext, createContext } from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { Link } from "react-router-dom";

export const NavbarContext = createContext()

export default function Navbar() {

  const [active, setActive] = useState(0)

  return (

    <NavbarContext.Provider value={{ active, setActive }}>
      <div className="flex justify-center w-full">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-10 justify-evenly py-2">
            <NavigationMenuItem className="border-2 border-transparent">
              <Link to="/bus-stops">
                <img src={compass} alt="compass" />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/bus-page">
                <img src={bus} alt="bus" />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/">
                <img src={home} alt="home" />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/drivers-page">
                <img src={steeringWheel} alt="steeringWheel" />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/">
                <img src={profile} alt="profile" />
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </NavbarContext.Provider>
  )
}
