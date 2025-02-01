import { ArrowLeft, Bug, Droplet, ExternalLink, Fish, Flower, Leaf, Recycle, Trees, TreesIcon } from "lucide-react";
import { OPTIONS_DATA, calculatePoints, getPointColor } from "@/app/data/options_data";

import { Input } from "./ui/input";
import { mockGeoJsonData } from "@/app/data/mockGeoJsonData";
import { useState } from "react";

export interface SingleOptionProps {
  option: (typeof OPTIONS_DATA)[number];
  setSelectedOption: (option: string | null) => void;
  onClickReadMore: () => void;
  selectedOption: string | null;
  selectedRegion: string | null;
  extended: boolean;
  backButton: boolean;
  onBackButtonClick?: () => void;
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

const images: { [key: string]: string } = {
  "hornbach.nl": "/logos/hornbach.png",
  "imkershop.nl": "/logos/imkershop.png",
  "vogelhuisjes.nl": "/logos/vogelhuisjes.png",
};

export default function SingleOption({
  option,
  setSelectedOption,
  onClickReadMore,
  selectedOption,
  selectedRegion,
  extended,
  backButton,
  onBackButtonClick,
}: SingleOptionProps) {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const regionData = mockGeoJsonData.features.find((feature) => feature.properties?.buurtnaam === selectedRegion);
  const points = calculatePoints(regionData!.properties, option);
  const Icon = icons[option.icon as keyof typeof icons] || TreesIcon;

  const handleSubmitAction = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    setShowJoinForm(false);
  };

  return (
    <>
      <div
        key={option.title}
        className="bg-[#315551] text-white rounded-lg shadow p-1 cursor-auto"
        onClick={() => !extended && setSelectedOption(option.title === selectedOption ? null : option.title)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {backButton && <ArrowLeft className="h-5 w-5 mr-2 cursor-pointer" onClick={onBackButtonClick} />}
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
              <button className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors">Community</button>
              <button className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors" onClick={onClickReadMore}>
                Read more
              </button>
            </div>
          </div>
        )}
        {extended && (
          <div className="mt-2 text-sm bg-[#F1EEE0] text-black p-2">
            {!showJoinForm ? (
              <>
                <p>{option.long_description}</p>
                {option.buy_links && option.buy_links.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Waar te koop:</h3>
                    <div className="flex flex-col gap-2">
                      {option.buy_links.map((link, index) => {
                        const domain = new URL(link).hostname.replace("www.", "");
                        const logo = images[domain];
                        return (
                          <div key={index} className="flex justify-between flex-row">
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="min-w-[66%] cursor-pointer flex items-center gap-2 bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors"
                            >
                              {logo && <img src={logo} alt={domain} className="h-6 pr-4" />}
                              <span className="text-sm">{domain}</span>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                            <div className="flex items-center justify-center">
                              <span className="text-sm">{index === 0 && "5,- korting met 1000 punten!"}</span>
                              <span className="text-sm">{index === 1 && "15% korting met 3000 punten!"}</span>
                              <span className="text-sm">{index === 2 && "10% korting met 2000 punten!"}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="flex justify-between m-2">
                  <button className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors">
                    See other people
                  </button>
                  <button
                    className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowJoinForm(true);
                    }}
                  >
                    Join the cause
                  </button>
                </div>
              </>
            ) : (
              <div>
                <h3 className="font-semibold text-xl mb-2">Submit your action to show the impact</h3>
                <p className="mb-2">Share with use what you have done and we will show what the impact is.</p>
                <form onSubmit={handleSubmitAction} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select your image from device</label>
                    <Input type="file" accept="image/*" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select receipt from device</label>
                    <Input type="file" accept="image/*" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your name</label>
                    <Input type="text" placeholder="Your name" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Postcode</label>
                    <Input type="text" placeholder="1234 AB" className="bg-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="checkbox" className="w-4 h-4" id="share-socials" />
                    <label htmlFor="share-socials" className="text-sm">
                      Share your action on socials
                    </label>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors"
                      onClick={() => setShowJoinForm(false)}
                    >
                      Go back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors flex items-center gap-2"
                    >
                      Get your points
                      <span className="text-yellow-300">★</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
