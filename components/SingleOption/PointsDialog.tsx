import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Award } from "lucide-react";

interface PointsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  onCheckPost: () => void;
}

export default function PointsDialog({ isOpen, onClose, points, onCheckPost }: PointsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="sr-only">
        <DialogTitle>Points received</DialogTitle>
      </div>
      <DialogContent className="bg-[#F1EEE0] p-6 rounded-lg border border-black shadow-lg max-w-sm mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-[#315551] rounded-full p-4">
            <Award className="h-8 w-8 text-yellow-300" />
          </div>
          <h2 className="text-xl font-semibold">Great job!</h2>
          <p>You have received {points} pt's.</p>
          <div className="flex gap-2 w-full pt-4">
            <button onClick={onClose} className="flex-1 bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors">
              Go back
            </button>
            <button onClick={onCheckPost} className="flex-1 bg-[#315551] text-white px-4 py-2 rounded hover:bg-[#264440] transition-colors">
              Check your post
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
