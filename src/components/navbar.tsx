import { useActiveCode } from "@codesandbox/sandpack-react";
import { EyeIcon, FileTextIcon, ShareIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { initialCode } from "@/constants/code";
import { copyToClipboard, createShareUrl } from "@/utils/share";

interface NavbarProps {
  activePanel: "editor" | "preview";
  onTogglePanel: () => void;
}

const Navbar = ({ activePanel, onTogglePanel }: NavbarProps) => {
  const [copied, setCopied] = useState(false);
  const { code } = useActiveCode();

  const lastSharedCode = useRef<string>("");
  const lastSharedUrl = useRef<string>("");

  const handleShare = async () => {
    // don't share the initial code - it's the default!
    if (code === initialCode) {
      toast.info("Make some changes first, then share your creation!");
      return;
    }

    // if code hasn't changed since last share, reuse the URL
    if (code === lastSharedCode.current && lastSharedUrl.current) {
      const success = await copyToClipboard(lastSharedUrl.current);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Link copied to clipboard!");
      }
      return;
    }

    const shareUrl = await createShareUrl(code);
    if (shareUrl) {
      lastSharedCode.current = code;
      lastSharedUrl.current = shareUrl;

      const success = await copyToClipboard(shareUrl);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Link copied to clipboard!");
      } else {
        toast.error("Failed to copy link");
      }
    } else {
      toast.error("Failed to create share link");
    }
  };

  return (
    <div
      className="d-f ai-c jc-sb px-8 py-2"
      style={{ backgroundColor: "#1e2039" }}
    >
      <Image
        className="h-auto"
        height={200}
        width={120}
        src="/logotype.png"
        alt="Yumma CSS Play Logo"
      />

      <div className="d-f ai-c g-2">
        {/* Toggle button - only visible on mobile */}
        <button
          type="button"
          onClick={onTogglePanel}
          className="d-f md:d-none ai-c g-2 px-3 py-2 tc-silver-2 fw-500 fs-sm"
          style={{
            background: "#21243f",
            border: "1px solid #31365e",
          }}
          title={
            activePanel === "editor" ? "Switch to Preview" : "Switch to Editor"
          }
        >
          {activePanel === "editor" ? (
            <EyeIcon className="d-4" />
          ) : (
            <FileTextIcon className="d-4" />
          )}
        </button>

        {/* Share button */}
        <button
          type="button"
          onClick={handleShare}
          className="d-f ai-c g-2 px-3 py-2 tc-silver-2 fw-500 fs-sm"
          style={{
            background: "#21243f",
            border: "1px solid #31365e",
          }}
          title="Copy share link to clipboard"
        >
          <ShareIcon className="d-4" />
          <span className="d-none md:d-ib">{copied ? "Copied!" : "Share"}</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
