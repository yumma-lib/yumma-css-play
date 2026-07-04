"use client";

import { Button } from "@base-ui/react";
import { Dialog } from "@base-ui/react/dialog";
import { YummaCSS } from "@react-symbols/icons";
import { InfoCircle, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiGithub, SiX, SiYoutube } from "react-icons/si";

interface ShortcutsDialogProps {
  onShare: () => void;
  onResetLayout: () => void;
  onFullPreview: () => void;
  onFormat: () => void;
  onCommandPalette: () => void;
}

const SHORTCUTS = [
  { key: "S", label: "Share code", action: "share" },
  { key: "R", label: "Reset layout", action: "reset" },
  { key: "P", label: "Preview mode", action: "preview" },
  { key: "F", label: "Format code", action: "format" },
  { key: "F1", label: "Command Palette", action: "palette" },
] as const;

const ShortcutsDialog = ({
  onShare,
  onResetLayout,
  onFullPreview,
  onFormat,
  onCommandPalette,
}: ShortcutsDialogProps) => {
  const [open, setOpen] = useState(false);

  const executeAction = (action: string) => {
    setOpen(false);
    setTimeout(() => {
      switch (action) {
        case "share":
          onShare();
          break;
        case "reset":
          onResetLayout();
          break;
        case "preview":
          onFullPreview();
          break;
        case "format":
          onFormat();
          break;
        case "palette":
          onCommandPalette();
          break;
      }
    }, 100);
  };

  // handle keyboard shortcuts when dialog is closed and editor is not focused
  useEffect(() => {
    if (open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isEditorFocused = activeElement?.closest(".monaco-editor") !== null;
      const isInputFocused =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA";

      if (isEditorFocused || isInputFocused) return;

      const key = e.key.toUpperCase();

      if (key === "F1") {
        e.preventDefault();
        onCommandPalette();
        return;
      }

      const matchingShortcut = SHORTCUTS.find((s) => s.key === key);
      if (matchingShortcut) {
        e.preventDefault();
        switch (matchingShortcut.action) {
          case "share":
            onShare();
            break;
          case "reset":
            onResetLayout();
            break;
          case "preview":
            onFullPreview();
            break;
          case "format":
            onFormat();
            break;
          case "palette":
            onCommandPalette();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onShare, onResetLayout, onFullPreview, onFormat, onCommandPalette]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="d-f ai-c g-2 px-3 py-1 bc-border bg-transparent c-accent bw-1 fs-sm tp-c tdu-150 ttf-io us-none h:c-white fv:oo-2" />
        }
      >
        <InfoCircle className="w-4 h-4" />
        <span>About</span>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              }
              className="p-f i-0 bg-page/90 bf-b-xs"
            />
            <div className="d-f p-f i-0 ai-c jc-c">
              <Dialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                }
                className="o-h p-r bc-border bg-surface bw-1"
                style={{ width: "min(700px, 90vw)", maxHeight: "80vh" }}
              >
                <Dialog.Close
                  render={
                    <Button className="d-f p-a t-3 r-3 ai-c jc-c w-7 h-7 p-0 bc-border bg-transparent c-accent bw-1 tp-c tdu-150 ttf-io zi-10 h:c-white fv:oo-2" />
                  }
                >
                  <Xmark className="w-4 h-4" />
                </Dialog.Close>

                <div className="d-f min-h-100">
                  <div className="f-1 p-6 bc-border brw-1">
                    <h2 className="mb-4 c-white fs-lg fw-600">About</h2>
                    <p className="mb-4 c-accent fs-sm lh-5">
                      Yumma CSS Play is an advanced playground for experimenting
                      with Yumma CSS utility classes in real-time.
                    </p>
                    <p className="mb-4 c-accent fs-sm lh-5">
                      It catches utility conflicts, shows hover information when
                      hovering a utility class, and provides intelligent
                      completions as you type.
                    </p>

                    <h3 className="mb-3 mt-6 c-white fs-md fw-600">
                      Documentation
                    </h3>
                    <p className="c-accent fs-sm lh-5">
                      Visit{" "}
                      <a
                        href="https://yummacss.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="c-white tdl-u"
                      >
                        yummacss.com
                      </a>{" "}
                      for documentation and examples.
                    </p>
                  </div>

                  <div className="f-1 p-6">
                    <h2 className="mb-4 c-white fs-lg fw-600">Shortcuts</h2>
                    <div className="d-f fd-c g-1">
                      {SHORTCUTS.map((shortcut) => (
                        <Button
                          key={shortcut.key}
                          type="button"
                          onClick={() => executeAction(shortcut.action)}
                          className="d-f ai-c jc-sb px-3 py-2 bg-transparent c-accent bw-0 ta-l tp-c tdu-100 h:bg-page"
                        >
                          <span className="fs-sm">{shortcut.label}</span>
                          <kbd className="px-2 py-1 min-w-6 bc-border bg-surface-dim c-accent bw-1 fs-xs ff-m ta-c">
                            {shortcut.key}
                          </kbd>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="d-f ai-c jc-sb px-6 py-3 bc-border btw-1">
                  <div className="d-f ai-c g-2">
                    <YummaCSS width={16} height={16} />
                    <span className="c-muted fs-xs">Built with Yumma CSS</span>
                  </div>
                  <div className="d-f ai-c g-3">
                    <Link
                      href="https://github.com/yummacss/play"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-accent"
                      aria-label="GitHub"
                    >
                      <SiGithub size={16} />
                    </Link>
                    <Link
                      href="https://x.com/yummacss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-accent"
                      aria-label="X (Twitter)"
                    >
                      <SiX size={16} />
                    </Link>
                    <Link
                      href="https://www.youtube.com/@yummacss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-accent"
                      aria-label="YouTube"
                    >
                      <SiYoutube size={16} />
                    </Link>
                  </div>
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default ShortcutsDialog;
