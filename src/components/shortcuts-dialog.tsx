"use client";

import { Button } from "@base-ui/react";
import { Dialog } from "@base-ui/react/dialog";
import { InfoIcon, XIcon } from "@phosphor-icons/react";
import { YummaCSS } from "@react-symbols/icons";
import { useEffect, useState } from "react";
import { SiGithub, SiLinkedin, SiX, SiYoutube } from "react-icons/si";

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
    // only listen when dialog is closed
    if (open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // don't trigger shortcuts if user is typing in the editor or any input
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
        className="d-f ai-c g-2 px-3 py-1 c-white fs-sm"
        style={{
          background: "transparent",
          border: "1px solid #31365e",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        <InfoIcon className="w-4 h-4" weight="bold" />
        <span>About</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop
          className="dialog-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(30, 32, 57, 0.9)",
            backdropFilter: "blur(4px)",
            opacity: 1,
            transition: "opacity 150ms ease-out",
          }}
        />
        <Dialog.Popup
          className="dialog-popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#1e2039",
            border: "1px solid #31365e",
            borderRadius: "12px",
            width: "min(700px, 90vw)",
            maxHeight: "80vh",
            overflow: "hidden",
            opacity: 1,
            transition: "opacity 150ms ease-out, transform 150ms ease-out",
          }}
        >
          {/* Close button */}
          <Dialog.Close
            className="d-f ai-c jc-c"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "28px",
              height: "28px",
              background: "transparent",
              border: "1px solid #31365e",
              borderRadius: "6px",
              color: "#bec6f2",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <XIcon className="w-4 h-4" weight="bold" />
          </Dialog.Close>

          {/* Two column layout */}
          <div className="d-f" style={{ minHeight: "400px" }}>
            {/* Left column - About */}
            <div
              className="f-1 p-6"
              style={{ borderRight: "1px solid #31365e" }}
            >
              <h2 className="mb-4 fs-lg fw-600" style={{ color: "#fff" }}>
                About
              </h2>
              <p className="mb-4 fs-sm lh-5" style={{ color: "#bec6f2" }}>
                Yumma CSS Play is an advanced playground for experimenting with
                Yumma CSS utility classes in real-time.
              </p>
              <p className="mb-4 fs-sm lh-5" style={{ color: "#bec6f2" }}>
                It catches utility conflicts, shows hover information when
                hovering a utility class, and provides intelligent completions
                as you type.
              </p>

              <h3 className="mb-3 mt-6 fs-md fw-600" style={{ color: "#fff" }}>
                Documentation
              </h3>
              <p className="fs-sm lh-5" style={{ color: "#bec6f2" }}>
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

            {/* Right column - Shortcuts */}
            <div className="f-1 p-6">
              <h2 className="mb-4 c-white fs-lg fw-600">Shortcuts</h2>
              <div className="d-f fd-c g-1">
                {SHORTCUTS.map((shortcut) => (
                  <Button
                    key={shortcut.key}
                    type="button"
                    onClick={() => executeAction(shortcut.action)}
                    className="d-f ai-c jc-sb px-3 py-2 br-sm bg-transparent ta-l c-p"
                    style={{
                      border: "none",
                      color: "#bec6f2",
                      transition: "background-color 100ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#151724";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <span className="fs-sm">{shortcut.label}</span>
                    <kbd
                      className="px-2 py-1 min-w-6 br-sm fs-xs ff-m ta-c"
                      style={{
                        backgroundColor: "#21243f",
                        border: "1px solid #31365e",
                        color: "#bec6f2",
                      }}
                    >
                      {shortcut.key}
                    </kbd>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="d-f ai-c jc-sb px-6 py-3"
            style={{ borderTop: "1px solid #31365e" }}
          >
            <div className="d-f ai-c g-2">
              <YummaCSS width={16} height={16} />
              <span className="fs-xs" style={{ color: "#6b7194" }}>
                Built with Yumma CSS
              </span>
            </div>
            <div className="d-f ai-c g-3">
              <a
                href="https://github.com/yummacss/play"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <SiGithub size={16} />
              </a>
              <a
                href="https://x.com/yummacss"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="X (Twitter)"
              >
                <SiX size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/yumma-css"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <SiLinkedin size={16} />
              </a>
              <a
                href="https://www.youtube.com/@yummacss"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube"
              >
                <SiYoutube size={16} />
              </a>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>

      <style jsx global>{`
        .dialog-backdrop[data-starting-style],
        .dialog-backdrop[data-ending-style] {
          opacity: 0 !important;
        }

        .dialog-popup[data-starting-style] {
          opacity: 0 !important;
          transform: translate(-50%, -50%) scale(0.95) !important;
        }

        .dialog-popup[data-ending-style] {
          opacity: 0 !important;
          transform: translate(-50%, -50%) scale(0.95) !important;
        }

        .social-link {
          color: #6b7194;
          transition: color 200ms ease;
        }

        .social-link:hover {
          color: #bec6f2;
        }
      `}</style>
    </Dialog.Root>
  );
};

export default ShortcutsDialog;
