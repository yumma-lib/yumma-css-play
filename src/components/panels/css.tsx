"use client";

import { Button } from "@base-ui/react";
import Editor from "@monaco-editor/react";
import { NavArrowUp } from "iconoir-react";
import { useEffect, useRef, useState } from "react";

interface GeneratedCSSPanelProps {
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  onToggle?: () => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} kB`;
}

export function GeneratedCSSPanel({
  iframeRef,
  onToggle,
}: GeneratedCSSPanelProps) {
  const [css, setCSS] = useState<string>("");
  const observerRef = useRef<MutationObserver | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function extractCSS() {
      try {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;
        const utilStyle = doc.querySelector("style[data-yummacss]");
        const next = utilStyle?.textContent?.trim() ?? "";
        setCSS((prev) => (prev === next ? prev : next));
      } catch {
        // cross-origin guard
      }
    }

    function attachObserver() {
      try {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;

        observerRef.current?.disconnect();
        observerRef.current = new MutationObserver(extractCSS);

        observerRef.current.observe(doc.head, {
          childList: true,
          subtree: true,
          characterData: true,
          characterDataOldValue: false,
        });

        const styleEl = doc.querySelector("style[data-yummacss]");
        if (styleEl) {
          observerRef.current.observe(styleEl, {
            characterData: true,
            childList: true,
            subtree: true,
          });
        }
      } catch {
        // ignore
      }
    }

    intervalRef.current = setInterval(extractCSS, 300);

    const iframe = iframeRef.current;
    const handleLoad = () => {
      attachObserver();
      extractCSS();
    };

    iframe?.addEventListener("load", handleLoad);
    attachObserver();
    extractCSS();

    return () => {
      observerRef.current?.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
      iframe?.removeEventListener("load", handleLoad);
    };
  }, [iframeRef]);

  const byteSize = new TextEncoder().encode(css).length;

  return (
    <div className="d-f fd-c h-100%">
      {/* Header — entire row is the toggle button */}
      <Button
        type="button"
        onClick={onToggle}
        className="d-f ai-c g-2 px-3 w-100% c-p"
        style={{
          backgroundColor: "#151724",
          borderTop: "1px solid #31365e",
          borderBottom: "1px solid #31365e",
          border: "none",
          height: "33px",
          flexShrink: 0,
          cursor: "pointer",
        }}
        title="Collapse panel"
      >
        <NavArrowUp style={{ color: "#6b7194" }} />

        <span
          className="ff-m tt-u ls-4 fw-500 fs-xs"
          style={{ color: "#9ea5cd" }}
        >
          Generated CSS
        </span>

        {css && (
          <span className="ff-m fs-xs" style={{ color: "#464a6e" }}>
            {formatSize(byteSize)}
          </span>
        )}
      </Button>

      {/* Monaco CSS viewer */}
      <div className="o-h f-1">
        {css ? (
          <Editor
            value={css}
            language="css"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              padding: { top: 8 },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              lineNumbers: "on",
              folding: true,
              renderLineHighlight: "none",
              scrollbar: {
                vertical: "auto",
                horizontal: "hidden",
              },
            }}
            theme="eclipsa"
          />
        ) : (
          <div
            className="d-f ai-c jc-c h-100% ff-m"
            style={{ color: "#464a6e" }}
          >
            No CSS generated yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default GeneratedCSSPanel;
