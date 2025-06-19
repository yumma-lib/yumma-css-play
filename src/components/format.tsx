import { Sparkles } from "lucide-react";
import { RoundedButton } from "@codesandbox/sandpack-react";

interface FormatButtonProps {
  onFormat?: () => void;
}

const FormatButton = ({ onFormat }: FormatButtonProps) => {
  return (
    <div className="p-a ps-e as-fe">
      <RoundedButton onClick={onFormat} title="Format Document">
        <Sparkles />
      </RoundedButton>
    </div>
  );
};

export default FormatButton;
