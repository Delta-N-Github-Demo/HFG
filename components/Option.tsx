import { OPTIONS_DATA } from "@/app/data/options_data";

import { ArrowLeft } from "lucide-react";
import OptionHeader from "./SingleOption/OptionHeader";
import ExtendedOption from "./SingleOption/ExtendedOption";
import JoinForm from "./SingleOption/JoinForm";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { OptionWithPoints } from "./BiodiversityActions";

export interface OptionProps {
  option: OptionWithPoints;
  setSelectedOption: (option: string | null) => void;
  onClickReadMore: () => void;
  selectedOption: string | null;
  extended: boolean;
  backButton: boolean;
  onBackButtonClick?: () => void;
}

export default function Option({
  option,
  setSelectedOption,
  onClickReadMore,
  selectedOption,
  extended,
  backButton,
  onBackButtonClick,
}: OptionProps) {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const active = selectedOption === option.title;

  const handleSubmitAction = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    setShowJoinForm(false);
  };

  return (
    <div key={option.title} onClick={() => !extended && setSelectedOption(option.title === selectedOption ? null : option.title)}>
      <div
        className={cn("bg-[#315551] rounded-lg text-white flex items-center gap-1", {
          "shadow-lg": active,
        })}
      >
        {backButton && <ArrowLeft className="ml-2 h-6 w-6" onClick={onBackButtonClick} />}
        <OptionHeader className="flex-1" option={option} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </div>
      {active && !extended && (
        <div className="text-sm bg-[#F1EEE0] text-black p-2 border border-black rounded space-y-4 mt-1">
          <p>{option.description}</p>
          <p className="font-semibold">Impact: {option.impact}</p>
          <div className="flex justify-between gap-2">
            <button className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors">Community</button>
            <button className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors" onClick={onClickReadMore}>
              Read more
            </button>
          </div>
        </div>
      )}
      {extended &&
        (showJoinForm ? (
          <JoinForm onSubmit={handleSubmitAction} onBack={() => setShowJoinForm(false)} points={option.points} />
        ) : (
          <ExtendedOption
            long_description={option.long_description}
            buy_links={option.buy_links}
            onJoinClick={() => setShowJoinForm(true)}
          />
        ))}
    </div>
  );
}
