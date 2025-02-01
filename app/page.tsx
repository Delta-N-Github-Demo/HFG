"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { getCoordinates } from "@/app/data/getCoordinates"
import { mockGeoJsonData } from "@/app/data/mockGeoJsonData"
import { Trees, Flower, Leaf, Fish, TreesIcon, Droplet, Bug, Recycle } from "lucide-react"
import { OPTIONS_DATA, calculatePoints, getPointColor } from "@/app/data/options_data"

const CombinedMap = dynamic(() => import("@/components/CombinedMap"), {
  ssr: false,
  loading: () => <p>Kaart laden...</p>,
})

const icons = {
  Home: Trees,
  Flower,
  Leaf,
  Fish,
  Tree: TreesIcon,
  Droplet,
  Bug,
  Recycle,
}

export default function Home() {
  const [postcode, setPostcode] = useState("")
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null)
  const [isPostcodeEntered, setIsPostcodeEntered] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMapLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isPostcodeEntered) {
      const coords = await getCoordinates(postcode)
      if (coords) {
        setCoordinates([coords[0], coords[1]])
        setIsPostcodeEntered(true)
        localStorage.setItem("lastPostcode", postcode)
      } else {
        alert("Ongeldige postcode. Probeer het opnieuw.")
      }
    } else {
      router.push(`/region/${encodeURIComponent(postcode)}`)
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Map container takes full screen */}
      <div className="absolute inset-0 z-0">
        {isMapLoaded && (
          <CombinedMap
            coordinates={coordinates}
            showBiodiversityUsers={isPostcodeEntered}
            geoJsonData={mockGeoJsonData}
            setSelectedRegion={setSelectedRegion}
          />
        )}
      </div>

      {/* Content overlay */}
      <div className="absolute h-full left-1/2 -translate-x-1/2 z-10 flex flex-col justify-between pointer-events-none">
        {/* Top content */}
        <div className="pointer-events-auto">
          <div className="bg-white/95 rounded-lg shadow-lg p-4 max-w-md space-y-2">
            <div className="flex items-center gap-2 text-green-800">
              <Trees className="h-6 w-6" />
              <h1 className="text-lg font-semibold">Bio Enhancer</h1>
            </div>
            <p className="text-gray-700 text-sm">
              Samen kunnen wij de biodiversiteit verbeteren per gemeente. Bekijk wat jij kan en wilt doen om een
              verschil te maken.
            </p>
          </div>
        </div>

        <div className="">

          {/* Options */}
          {selectedRegion !== null && (
            <div className="pointer-events-auto w-full max-w-md mx-auto bg-white/95 rounded-lg shadow-lg p-4 space-y-4 overflow-y-auto max-h-[60vh]">
              <h2 className="text-lg font-semibold text-green-800">Biodiversiteitsopties</h2>
              {OPTIONS_DATA.map((option) => {
                const regionData = mockGeoJsonData.features.find((feature) => feature.properties?.buurtnaam === selectedRegion)
                const points = calculatePoints(regionData!.properties, option.impact_value, option.minimum_effort)
                const Icon = icons[option.icon as keyof typeof icons] || TreesIcon
                return (
                  <div
                    key={option.title}
                    className="bg-[#315551] text-white rounded-lg shadow p-1 cursor-pointer"
                    onClick={() => setSelectedOption(option.title === selectedOption ? null : option.title)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{option.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{points}pt</span>
                        <div className={`w-3 h-3 rounded-full ${getPointColor(points)}`} />
                      </div>
                    </div>
                    {selectedOption === option.title && (
                      <div className="mt-2 text-sm bg-[#F1EEE0] text-black p-2">
                        <p>{option.description}</p>
                        <p className="mt-2 font-semibold">Impact: {option.impact}</p>
                        <div className="flex justify-between gap-2 mt-2">
                          <button className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors">
                            Community
                          </button>
                          <button className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors">
                            Join the cause
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Bottom content */}
          <div className="p-4 pointer-events-auto">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
              <Input
                placeholder="1234 AB"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="flex-grow bg-white/95 shadow-lg border-0"
                required
              />
              <Button type="submit" className="bg-green-800 hover:bg-green-900 text-white shadow-lg whitespace-nowrap">
                {isPostcodeEntered ? "Volgende" : "Jouw postcode"}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

