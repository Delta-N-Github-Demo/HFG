import { Bug, Droplet, Fish, Flower, Leaf, Recycle, Trees, TreesIcon } from "lucide-react";
import { getPointColor } from "@/app/data/options_data";

import { cn } from "@/lib/utils";
import { OptionWithPoints } from "../BiodiversityActions";

interface OptionHeaderProps {
  option: OptionWithPoints;
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
  className?: string;
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
};

export default function OptionHeader({ className, option, selectedOption, setSelectedOption }: OptionHeaderProps) {
  const Icon = icons[option.icon as keyof typeof icons] || TreesIcon;

  return (
    <div
      className={cn(`bg-[#315551] text-white rounded-lg p-2 cursor-pointer`, className)}
      onClick={() => setSelectedOption(option.title === selectedOption ? null : option.title)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5" />
          <span className="font-medium">{option.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{option.points}pt</span>
          <div className={`w-3 h-3 rounded-full ${getPointColor(option.points)}`} />
        </div>
      </div>
    </div>
  );
}
