import { mockGeoJsonData } from "@/app/data/mockGeoJsonData"
import { Trees, Flower, Leaf, Fish, TreesIcon, Droplet, Bug, Recycle, ExternalLink } from "lucide-react"
import { OPTIONS_DATA, calculatePoints, getPointColor } from "@/app/data/options_data"

export interface SingleOptionProps {
  option: typeof OPTIONS_DATA[number]
  setSelectedOption: (option: string | null) => void
  onClickReadMore: () => void
  selectedOption: string | null
  selectedRegion: string | null
  extended: boolean
}

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

export default function SingleOption({
  option,
  setSelectedOption,
  onClickReadMore,
  selectedOption,
  selectedRegion,
  extended
}: SingleOptionProps) {
  const regionData = mockGeoJsonData.features.find((feature) => feature.properties?.buurtnaam === selectedRegion)
  const points = calculatePoints(regionData!.properties, option)
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
            <button className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors" onClick={onClickReadMore}>
              Read more
            </button>
          </div>
        </div>
      )}
      {extended && (
        <div className="mt-2 text-sm bg-[#F1EEE0] text-black p-2">
          <p>{option.long_description}</p>
          {option.buy_links && option.buy_links.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Waar te koop:</h3>
              <div className="flex flex-col gap-2">
                {option.buy_links.map((link, index) => {
                  const domain = new URL(link).hostname.replace('www.', '')
                  return (
                    <a 
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors"
                    >
                      <span className="text-sm">{domain}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
