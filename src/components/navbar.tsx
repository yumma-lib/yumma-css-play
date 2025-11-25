import { useActiveCode } from "@codesandbox/sandpack-react";
import { CodeIcon, EyeIcon, Share2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { initialCode } from "@/constants/code";
import { copyToClipboard, createShareUrl } from "@/utils/share";

interface NavbarProps {
  isMobile: boolean;
  showingPreview?: boolean;
  onToggleView?: () => void;
}

const Navbar = ({ isMobile, showingPreview, onToggleView }: NavbarProps) => {
  const [copied, setCopied] = useState(false);
  const { code } = useActiveCode();

  const lastSharedCode = useRef<string>("");
  const lastSharedUrl = useRef<string>("");

  const handleShare = async () => {
    // Don't share the initial code - it's the default!
    if (code === initialCode) {
      toast.info("Make some changes first, then share your creation!");
      return;
    }

    // If code hasn't changed since last share, reuse the URL
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
      className="d-f ai-c jc-sb px-4 py-2"
      style={{ backgroundColor: "#1e2039" }}
    >
      {/* Logo */}
      <Image
        className="h-auto"
        height={160}
        width={80}
        src="/logotype.png"
        alt="Yumma CSS Play Logo"
      />

      {/* Action buttons */}
      <div className="d-f ai-c g-2">
        {/* Mobile toggle button */}
        {isMobile && onToggleView && (
          <button
            type="button"
            onClick={onToggleView}
            className="d-f ai-c g-2 px-3 py-2 tc-silver-2 fw-500 fs-sm"
            style={{
              background: "#21243f",
              border: "1px solid #31365e",
            }}
            title={showingPreview ? "Show Code" : "Show Preview"}
          >
            {showingPreview ? (
              <>
                <CodeIcon width={16} height={16} />
                <span className="d-none md:d-ib">Code</span>
              </>
            ) : (
              <>
                <EyeIcon width={16} height={16} />
                <span className="d-none md:d-ib">Preview</span>
              </>
            )}
          </button>
        )}

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
          <Share2Icon width={16} height={16} />
          <span className="d-none md:d-ib">{copied ? "Copied!" : "Share"}</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
