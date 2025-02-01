"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { getCoordinates } from "@/app/data/getCoordinates"
import { mockGeoJsonData } from "@/app/data/mockGeoJsonData"
import { Trees } from "lucide-react"
import { OPTIONS_DATA } from "@/app/data/options_data"
import Options from "@/components/Options"
import SingleOption from "@/components/SingleOption"

const CombinedMap = dynamic(() => import("@/components/CombinedMap"), {
  ssr: false,
  loading: () => <p>Kaart laden...</p>,
})

export default function Home() {
  const [postcode, setPostcode] = useState("")
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null)
  const [isPostcodeEntered, setIsPostcodeEntered] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedSingleOption, setSelectedSingleOption] = useState<string | null>(null)
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
      <div className="absolute h-full w-full z-50 flex flex-col justify-center items-center pointer-events-none">
        <div className="h-full flex flex-col justify-between pointer-events-none max-w-[95%] md:max-w-[75%] lg:max-w-[55%]">

          {/* Top content */}
          <div className="pointer-events-auto">
            <div className="bg-[#F1EEE0]/95 rounded-lg shadow-lg p-4 m-2 max-w-md space-y-2">
              <div className="flex items-center gap-2 text-green-800">
                <Trees className="h-6 w-6" />
                <h1 className="text-lg font-semibold">Flourish</h1>
              </div>
              <p className="text-gray-700 text-sm">
                Samen kunnen wij de biodiversiteit verbeteren per gemeente. Bekijk wat jij kan en wilt doen om een
                verschil te maken.
              </p>
            </div>
          </div>

          <div className="pointer-events-auto">

            {/* Options */}
            {selectedRegion !== null && selectedSingleOption === null && (
              <Options
                onClickReadMoreOption={setSelectedSingleOption}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
                selectedRegion={selectedRegion}
              />
            )}

            {/* Single option */}
            {selectedSingleOption !== null && (
              OPTIONS_DATA.find(option => option.title === selectedSingleOption) && (
                <SingleOption
                  option={OPTIONS_DATA.find(option => option.title === selectedSingleOption)!}
                  setSelectedOption={setSelectedOption}
                  onClickReadMore={() => null}
                  selectedOption={selectedOption}
                  selectedRegion={selectedRegion}
                  extended={true}
                  backButton={true}
                  onBackButtonClick={() => setSelectedSingleOption(null)}
                />
              )
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
    </div>
  )
}

