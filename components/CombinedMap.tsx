"use client"

import { useEffect, useRef, useState } from "react"
import type { GeoJSON } from "geojson"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

export interface CombinedMapProps {
  coordinates: [number, number] | null
  showBiodiversityUsers?: boolean
  geoJsonData?: GeoJSON.FeatureCollection | null
  setSelectedRegion: (region: string | null) => void
}

const generateMockUsers = (lat: number, lng: number) => [
  { id: 1, lat: lat + 0.002, lng: lng + 0.002, name: "User 1" },
  { id: 2, lat: lat - 0.001, lng: lng - 0.001, name: "User 2" },
  { id: 3, lat: lat + 0.001, lng: lng - 0.002, name: "User 3" },
]

export default function CombinedMap({
  coordinates,
  showBiodiversityUsers = false,
  geoJsonData = null,
  setSelectedRegion,
}: CombinedMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([52.132633, 5.291266], 7) // Default to Netherlands center
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (mapRef.current && coordinates) {
      mapRef.current.flyTo(coordinates, 13, {
        duration: 2,
        easeLinearity: 0.25,
      })

      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer)
        }
      })

      const currentLocationIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      L.marker(coordinates, { icon: currentLocationIcon }).addTo(mapRef.current).bindPopup("Jouw locatie")

      if (showBiodiversityUsers) {
        const otherUserIcon = new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })

        const mockUsers = generateMockUsers(coordinates[0], coordinates[1])
        mockUsers.forEach((user) => {
          L.marker([user.lat, user.lng], { icon: otherUserIcon })
            .addTo(mapRef.current!)
            .bindPopup(`${user.name} is hier actief!`)
        })
      }
    }
  }, [coordinates, showBiodiversityUsers])

  useEffect(() => {
    if (!geoJsonData || geoJsonData.features.length === 0) {
      console.error("No GeoJSON data available or empty feature collection")
      setMapError("Geen kaartgegevens beschikbaar.")
      return
    }
    if (mapRef.current && geoJsonData) {
      if (geoJsonLayerRef.current) {
        mapRef.current.removeLayer(geoJsonLayerRef.current)
      }

      try {
        geoJsonLayerRef.current = L.geoJSON(geoJsonData, {
          style: (feature) => {
            const biodiversityLevel = feature?.properties?.P_groen_pu || 0
            return {
              fillColor: `rgb(${255 - biodiversityLevel * 255}, ${biodiversityLevel * 255}, 0)`,
              weight: 2,
              opacity: 1,
              color: "white",
              dashArray: "3",
              fillOpacity: 0.7,
            }
          },
          onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.buurtnaam) {
              const biodiversityLevel = feature.properties.P_groen_pu || 0

              // Update click event to open BiodiversityOptions
              layer.on("click", () => {
                const regionName = feature.properties.buurtnaam
                setSelectedRegion(regionName)
              })

              // Show popup on mouseover
              layer.on("mouseover", (e) => {
                layer
                  .bindPopup(`
                  <b>${feature.properties.buurtnaam}</b><br>
                  Biodiversiteit: ${(biodiversityLevel * 100).toFixed(2)}%<br>
                  Publiek groen: ${(feature.properties.P_groen_pu * 100).toFixed(2)}%<br>
                  Privaat groen: ${(feature.properties.P_groen_pr * 100).toFixed(2)}%
                `)
                  .openPopup()
              })

              // Close popup on mouseout
              layer.on("mouseout", (e) => {
                layer.closePopup()
              })
            }
          },
        }).addTo(mapRef.current)

        if (coordinates) {
          const bounds = geoJsonLayerRef.current.getBounds()
          if (bounds.isValid()) {
            mapRef.current.fitBounds(bounds)
          } else {
            console.error("Invalid bounds for GeoJSON data")
          }
        }
      } catch (error) {
        console.error("Error parsing or rendering GeoJSON data:", error)
        setMapError("Er is een fout opgetreden bij het laden van de kaartgegevens.")
      }
    } else if (mapRef.current && geoJsonLayerRef.current) {
      mapRef.current.removeLayer(geoJsonLayerRef.current)
      geoJsonLayerRef.current = null
    }
  }, [geoJsonData, coordinates])

  if (mapError) {
    return <div className="text-red-500">{mapError}</div>
  }

  return (
    <>
      {mapError && <div className="text-red-500 mb-2">{mapError}</div>}
      <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
    </>
  )
}

