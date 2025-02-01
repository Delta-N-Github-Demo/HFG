import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

interface ExtendedOptionProps {
  long_description: string;
  buy_links?: string[];
  onJoinClick: () => void;
}

const images: { [key: string]: string } = {
  "hornbach.nl": "/logos/hornbach.png",
  "imkershop.nl": "/logos/imkershop.png",
  "vogelhuisjes.nl": "/logos/vogelhuisjes.png",
};

export default function ExtendedOption({ long_description, buy_links, onJoinClick }: ExtendedOptionProps) {
  return (
    <div className="mt-2 text-sm bg-[#F1EEE0] text-black p-4 border border-black rounded-lg shadow-lg">
      <p>{long_description}</p>
      {buy_links && buy_links.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Waar te koop:</h3>
          <div className="flex flex-col gap-2">
            {buy_links.map((link, index) => {
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
      <div className="flex justify-between gap-2 pt-4">
        <Button variant="outline">See other people</Button>
        <button className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors" onClick={onJoinClick}>
          Join the cause
        </button>
      </div>
    </div>
  );
}
