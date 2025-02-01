import { calculatePoints, OPTIONS_DATA } from "@/app/data/options_data";
import Option from "./Option";
import { mockGeoJsonData } from "@/app/data/mockGeoJsonData";
import { useMemo } from "react";

export interface BiodiversityActionsProps {
  onClickReadMoreOption: (option: string) => void;
  setSelectedOption: (option: string | null) => void;
  selectedOption: string | null;
  selectedRegion: string | null;
}

export type OptionWithPoints = (typeof OPTIONS_DATA)[number] & { points: number };

export default function BiodiversityActions({
  onClickReadMoreOption,
  setSelectedOption,
  selectedOption,
  selectedRegion,
}: BiodiversityActionsProps) {
  // Sort options by point value
  const regionData = mockGeoJsonData.features.find((feature) => feature.properties?.buurtnaam === selectedRegion);
  const optionsWithPoints = useMemo(
    () => OPTIONS_DATA.map((option) => ({ ...option, points: calculatePoints(regionData!.properties, option) })) as OptionWithPoints[],
    [regionData]
  );
  const sortedOptions = useMemo(() => optionsWithPoints.toSorted((a, b) => b.points - a.points), [optionsWithPoints]);

  return (
    <div className="pointer-events-auto w-full max-w-md mx-auto bg-[#F1EEE0]/95 rounded-lg shadow-xl p-4 space-y-2 overflow-y-auto max-h-[60vh]">
      <h2 className="text-lg font-semibold text-green-800">Biodiversiteitsopties</h2>
      {sortedOptions.map((option) => (
        <Option
          key={option.title}
          option={option}
          setSelectedOption={setSelectedOption}
          onClickReadMore={() => onClickReadMoreOption(option.title)}
          selectedOption={selectedOption}
          extended={false}
          backButton={false}
        />
      ))}
    </div>
  );
}
