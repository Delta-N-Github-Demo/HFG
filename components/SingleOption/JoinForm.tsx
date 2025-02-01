import { Input } from "../ui/input";

interface JoinFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function JoinForm({ onSubmit, onBack }: JoinFormProps) {
  return (
    <div className="mt-2 text-sm bg-[#F1EEE0] text-black p-4 border border-black rounded-lg shadow-lg">
      <h3 className="font-semibold text-xl mb-2">Submit your action to show the impact</h3>
      <p className="mb-2">Share with use what you have done and we will show what the impact is.</p>
      <form onSubmit={onSubmit} className="space-y-4">
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
          <button type="button" className="bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors" onClick={onBack}>
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
  );
}
