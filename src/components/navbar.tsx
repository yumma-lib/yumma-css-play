"use client";

import { Button } from "@base-ui/react";
import { Check, Copy, LinkSlash } from "iconoir-react";
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
      shareUrl = await createShareUrl(code);
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

  const renderShareIos = () => {
    switch (shareState) {
      case "success":
        return <Check className="w-4 h-4" />;
      case "error":
        return <LinkSlash className="w-4 h-4" />;
      default:
        return <Copy className="w-4 h-4" />;
    }
  };

  const getShareLabel = () => {
    switch (shareState) {
      case "success":
        return "Link copied";
      case "error":
        return "Failed";
      default:
        return "Share code";
    }
  };

  return (
    <div className="d-f ai-c jc-sb px-3 py-2 bg-surface">
      <Image
        className="h-auto"
        height={30}
        width={30}
        src="/logo-dark.svg"
        alt="Yumma CSS Play Logo"
        style={{ imageRendering: "crisp-edges" }}
        priority
      />

      <div className="d-f ai-c g-2">
        {/* Share Button */}
        <Button
          type="button"
          onClick={handleShare}
          className="d-f ai-c g-2 px-4 py-1 bc-border bg-transparent c-accent bw-1 fs-sm tp-c tdu-150 ttf-io h:c-white"
        >
          {renderShareIos()}
          <span>{getShareLabel()}</span>
        </Button>

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
