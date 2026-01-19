"use client";

import { CheckIcon, LinkBreakIcon, ShareIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import ShortcutsDialog from "@/components/shortcuts-dialog";
import { initialCode } from "@/constants/code";
import { copyToClipboard, createShareUrl } from "@/utils/share";

type ShareState = "idle" | "success" | "error";

interface NavbarProps {
  code: string;
  editorRef: React.RefObject<any>;
  onResetLayout: () => void;
  onFullPreview: () => void;
}

const Navbar = ({
  code,
  editorRef,
  onResetLayout,
  onFullPreview,
}: NavbarProps) => {
  const [shareState, setShareState] = useState<ShareState>("idle");

  const lastSharedCode = useRef<string>("");
  const lastSharedUrl = useRef<string>("");

  const handleShare = async () => {
    let shareUrl: string;

    if (code === initialCode) {
      shareUrl = window.location.origin;
    } else if (code === lastSharedCode.current && lastSharedUrl.current) {
      shareUrl = lastSharedUrl.current;
    } else {
      shareUrl = createShareUrl(code);
      lastSharedCode.current = code;
      lastSharedUrl.current = shareUrl;
    }

    const success = await copyToClipboard(shareUrl);
    if (success) {
      setShareState("success");
      setTimeout(() => setShareState("idle"), 2000);
    } else {
      setShareState("error");
      setTimeout(() => setShareState("idle"), 2000);
    }
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.trigger(
        "keyboard",
        "editor.action.formatDocument",
        null,
      );
    }
  };

  const handleCommandPalette = () => {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.action.quickCommand", null);
    }
  };

  const renderShareIcon = () => {
    switch (shareState) {
      case "success":
        return <CheckIcon className="d-4" weight="bold" />;
      case "error":
        return <LinkBreakIcon className="d-4" weight="bold" />;
      default:
        return <ShareIcon className="d-4" weight="bold" />;
    }
  };

  const getShareLabel = () => {
    switch (shareState) {
      case "success":
        return "Copied!";
      case "error":
        return "Failed";
      default:
        return "Share";
    }
  };

  return (
    <div
      className="d-f ai-c jc-sb px-3 py-2"
      style={{ backgroundColor: "#1e2039" }}
    >
      <Image
        className="h-auto"
        height={200}
        width={140}
        src="/logotype.png"
        alt="Yumma CSS Play Logo"
        style={{ imageRendering: "crisp-edges" }}
        priority
      />

      <div className="d-f ai-c g-2">
        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="d-f ai-c g-2 px-3 py-1 c-white fs-sm"
          style={{
            background: "transparent",
            border: "1px solid #31365e",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {renderShareIcon()}
          <span>{getShareLabel()}</span>
        </button>

        {/* Shortcuts Dialog */}
        <ShortcutsDialog
          onShare={handleShare}
          onResetLayout={onResetLayout}
          onFullPreview={onFullPreview}
          onFormat={handleFormat}
          onCommandPalette={handleCommandPalette}
        />
      </div>
    </div>
  );
};

export default Navbar;
