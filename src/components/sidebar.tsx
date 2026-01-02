"use client";

import { useActiveCode } from "@codesandbox/sandpack-react";
import {
  CheckIcon,
  ExportIcon,
  EyeIcon,
  FileTextIcon,
  HeartStraightBreakIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { initialCode } from "@/constants/code";
import { copyToClipboard, createShareUrl } from "@/utils/share";

type ShareState = "idle" | "loading" | "success" | "error";

interface SidebarProps {
  activePanel: "editor" | "preview";
  onTogglePanel: () => void;
}

const Sidebar = ({ activePanel, onTogglePanel }: SidebarProps) => {
  const [shareState, setShareState] = useState<ShareState>("idle");
  const { code } = useActiveCode();

  const lastSharedCode = useRef<string>("");
  const lastSharedUrl = useRef<string>("");

  const handleShare = async () => {
    // Don't share the initial code
    if (code === initialCode) {
      toast.info("Make some changes first, then share your creation!");
      return;
    }

    setShareState("loading");

    try {
      // If code hasn't changed since last share, reuse the URL
      if (code === lastSharedCode.current && lastSharedUrl.current) {
        const success = await copyToClipboard(lastSharedUrl.current);
        if (success) {
          setShareState("success");
          setTimeout(() => setShareState("idle"), 2000);
          toast.success("Link copied to clipboard!");
        } else {
          setShareState("error");
          setTimeout(() => setShareState("idle"), 2000);
          toast.error("Failed to copy link");
        }
        return;
      }

      const shareUrl = await createShareUrl(code);
      if (shareUrl) {
        lastSharedCode.current = code;
        lastSharedUrl.current = shareUrl;

        const success = await copyToClipboard(shareUrl);
        if (success) {
          setShareState("success");
          setTimeout(() => setShareState("idle"), 2000);
          toast.success("Link copied to clipboard!");
        } else {
          setShareState("error");
          setTimeout(() => setShareState("idle"), 2000);
          toast.error("Failed to copy link");
        }
      } else {
        setShareState("error");
        setTimeout(() => setShareState("idle"), 2000);
        toast.error("Failed to create share link");
      }
    } catch {
      setShareState("error");
      setTimeout(() => setShareState("idle"), 2000);
      toast.error("Something went wrong");
    }
  };

  const renderShareIcon = () => {
    switch (shareState) {
      case "loading":
        return <SpinnerGapIcon size={20} className="animate-spin" />;
      case "success":
        return <CheckIcon size={20} />;
      case "error":
        return <HeartStraightBreakIcon size={20} />;
      default:
        return <ExportIcon size={20} />;
    }
  };

  return (
    <div
      className="d-f fd-c ai-c jc-sb py-3"
      style={{
        backgroundColor: "#1e2039",
        border: "1px solid #31365e",
        width: "48px",
      }}
    >
      {/* Logo at top */}
      <div>
        <Image
          src="/logomark.png"
          alt="Yumma CSS"
          width={28}
          height={28}
          className="h-auto"
        />
      </div>

      {/* Buttons at bottom */}
      <div className="d-f fd-c g-2">
        {/* Mobile toggle - only visible on mobile */}
        <button
          type="button"
          onClick={onTogglePanel}
          className="d-f md:d-none ai-c jc-c p-2 c-silver-2"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          title={
            activePanel === "editor" ? "Switch to Preview" : "Switch to Editor"
          }
        >
          {activePanel === "editor" ? (
            <EyeIcon size={20} />
          ) : (
            <FileTextIcon size={20} />
          )}
        </button>

        {/* Share button */}
        <button
          type="button"
          onClick={handleShare}
          disabled={shareState === "loading"}
          className="d-f ai-c jc-c p-2 c-silver-2"
          style={{
            background: "transparent",
            border: "none",
            cursor: shareState === "loading" ? "wait" : "pointer",
          }}
          title="Share your code"
        >
          {renderShareIcon()}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
