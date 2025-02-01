import { OPTIONS_DATA } from "@/app/data/options_data";
import Option from "./Option";

export interface BiodiversityActionsProps {
  onClickReadMoreOption: (option: string) => void;
  setSelectedOption: (option: string | null) => void;
  selectedOption: string | null;
  selectedRegion: string | null;
}

export default function BiodiversityActions({
  onClickReadMoreOption,
  setSelectedOption,
  selectedOption,
  selectedRegion,
}: BiodiversityActionsProps) {
  return (
    <div className="pointer-events-auto w-full max-w-md mx-auto bg-[#F1EEE0]/95 rounded-lg shadow-xl p-4 space-y-2 overflow-y-auto max-h-[60vh]">
      <h2 className="text-lg font-semibold text-green-800">Biodiversiteitsopties</h2>
      {OPTIONS_DATA.map((option) => (
        <Option
          key={option.title}
          option={option}
          setSelectedOption={setSelectedOption}
          onClickReadMore={() => onClickReadMoreOption(option.title)}
          selectedOption={selectedOption}
          selectedRegion={selectedRegion}
          extended={false}
          backButton={false}
        />
      ))}
    </div>
  );
}
