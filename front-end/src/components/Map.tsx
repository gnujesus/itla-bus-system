import GoogleMap from 'google-maps-react-markers'
import { useState, useRef } from "react"
import pin from "@/assets/pin.png"

const Pin = () => (
  <div className="w-40">
    <img src={pin} alt="pin" className="w-10 absolute top-0 mb-20" />
  </div>
);

export default function Map() {

  const [mapReady, setMapReady] = useState(false)
  const mapRef = useRef(null)

  const stopsCoordinates = [
    {
      name: "ITLA",
      lat: 18.45190552332765,
      lng: -69.6630129335274
    },
    {
      name: "Charles de Gaulle",
      lat: 18.54531161393574,
      lng: -69.89740889615892
    },
    {
      name: "Puente Rey Juan Carlos I",
      lat: 18.47006402548439,
      lng: -69.83003399016674
    },
    {
      name: "San Pedro",
      lat: 18.451787234166417,
      lng: -69.29677347702287
    }
  ]

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map
    setMapReady(true)
  }

  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log('This is ->', markerId)

    // inside the map instance you can call any google maps method
    mapRef.current?.setCenter({ lat, lng })
    // ref. https://developers.google.com/maps/documentation/javascript/reference?hl=it
  }

  return (
    <div style={{ height: '200vh', width: '100%' }} className="absolute">
      <GoogleMap
        apiKey="AIzaSyBn2hyJmAdDC7D5JbKweW7rIaqbhWGALJE"
        defaultCenter={{ lat: 18.45190552332765, lng: -69.6630129335274 }}
        defaultZoom={15}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        libraries={[]}
      >
        {

          stopsCoordinates.map((stop) => (
            <Pin
              lat={stop.lat} lng={stop.lng} onClick={onMarkerClick}
            />
          ))
        }
      </GoogleMap>
    </div>
  )

}
