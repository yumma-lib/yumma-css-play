"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  type ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import MobileNavbar from "@/components/mobile-navbar";
import Navbar from "@/components/navbar";
import GeneratedCSSPanel from "@/components/panels/css";
import MonacoEditor from "@/components/panels/editor";
import Preview from "@/components/panels/preview";
import { initialCode } from "@/constants/code";
import { getCodeFromUrl } from "@/utils/share";

const Home: React.FC = () => {
  const [code, setCode] = useState<string>(initialCode);
  const [isLoading, setIsLoading] = useState(true);
  const [cssPanelOpen, setCssPanelOpen] = useState(false);

  const editorPanelRef = useRef<ImperativePanelHandle>(null);
  const cssPanelRef = useRef<ImperativePanelHandle>(null);
  // biome-ignore lint/suspicious/noExplicitAny: monaco-editor types not installed directly
  const editorRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const sharedCode = getCodeFromUrl();
    if (sharedCode) setCode(sharedCode);
    setIsLoading(false);
  }, []);

  const handleResetLayout = () => editorPanelRef.current?.resize(50);
  const handleFullPreview = () => editorPanelRef.current?.collapse();

  const handleToggleCSSPanel = () => {
    if (cssPanelOpen) {
      cssPanelRef.current?.collapse();
    } else {
      cssPanelRef.current?.expand();
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-f ai-c jc-c h-dvh c-white"
        style={{ backgroundColor: "#1e2039" }}
      >
        <div className="ta-c">
          <div className="fs-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-b md:d-none">
        <MobileNavbar />
        <div
          className="d-f ai-c jc-c p-6 c-white"
          style={{ backgroundColor: "#1e2039", height: "calc(100dvh - 52px)" }}
        >
          <div className="ta-c">
            <div className="mb-2 fs-xl fw-600">Desktop Only</div>
            <p
              className="fs-sm"
              style={{ color: "#bec6f2", maxWidth: "280px" }}
            >
              Yumma CSS Play is designed for desktop browsers. Please visit on a
              larger screen.
            </p>
          </div>
        </div>
      </div>

      <div className="d-none h-dvh md:d-b">
        <PanelGroup direction="horizontal" className="h-100%">
          {/* Left column */}
          <Panel
            ref={editorPanelRef}
            maxSize={80}
            minSize={20}
            defaultSize={50}
          >
            {/*
             * Navbar sits OUTSIDE the vertical PanelGroup so the CSS panel
             * can expand all the way up to the navbar's bottom edge.
             */}
            <div className="d-f fd-c h-100%">
              <Navbar
                code={code}
                editorRef={editorRef}
                onResetLayout={handleResetLayout}
                onFullPreview={handleFullPreview}
              />

              {/* Vertical split: editor on top, CSS panel on bottom */}
              <div className="o-h f-1">
                <PanelGroup direction="vertical" className="h-100%">
                  {/* Editor */}
                  <Panel minSize={0} defaultSize={78}>
                    <MonacoEditor
                      code={code}
                      onChange={setCode}
                      onMount={(editor) => {
                        editorRef.current = editor;
                      }}
                    />
                  </Panel>

                  {/* Vertical resize handle */}
                  <PanelResizeHandle
                    style={{
                      height: "1px",
                      backgroundColor: "#31365e",
                      cursor: "row-resize",
                      flexShrink: 0,
                    }}
                  />

                  {/* CSS panel — collapsible, starts collapsed */}
                  <Panel
                    ref={cssPanelRef}
                    collapsible
                    minSize={10}
                    defaultSize={0}
                    onCollapse={() => setCssPanelOpen(false)}
                    onExpand={() => setCssPanelOpen(true)}
                    style={{ overflow: "hidden" }}
                  >
                    <GeneratedCSSPanel
                      iframeRef={iframeRef}
                      onToggle={handleToggleCSSPanel}
                    />
                  </Panel>
                </PanelGroup>
              </div>

              {/* Collapsed bar — only rendered when panel is fully collapsed */}
              {!cssPanelOpen && (
                <button
                  type="button"
                  onClick={handleToggleCSSPanel}
                  className="d-f ai-c g-2 px-3 w-100% c-p"
                  style={{
                    borderTop: "1px solid #31365e",
                    backgroundColor: "#151724",
                    border: "none",
                    height: "33px",
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                >
                  <CaretDownIcon
                    size={12}
                    weight="bold"
                    style={{ color: "#6b7194" }}
                  />
                  <span
                    className="ff-m tt-u ls-4 fw-500 fs-xs"
                    style={{ color: "#9ea5cd" }}
                  >
                    Generated CSS
                  </span>
                </button>
              )}
            </div>
          </Panel>

          {/* Horizontal resize handle */}
          <PanelResizeHandle
            className="w-px"
            style={{
              backgroundColor: "#31365e",
              cursor: "col-resize",
            }}
          />

          {/* Preview pane */}
          <Panel defaultSize={50} minSize={20} maxSize={80}>
            <Preview ref={iframeRef} code={code} />
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
};

export default Home;
