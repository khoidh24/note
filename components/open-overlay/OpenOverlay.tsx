import { FC } from "react";
import { useOpenEditStore } from "@/hooks/use-open-edit";
import { Eye, EyeClosed } from "lucide-react";

const OpenOverlay: FC = () => {
  const { isOpen, setOpen } = useOpenEditStore();
  return (
    <div
      onClick={() => setOpen(!isOpen)}
      className="fixed top-4 right-4 z-10 cursor-pointer bg-accent p-2 rounded-full"
    >
      {!isOpen ? <Eye /> : <EyeClosed />}
    </div>
  );
};

export default OpenOverlay;
