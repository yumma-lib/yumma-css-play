"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  type ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import MobileNavbar from "@/components/mobile-navbar";
import MonacoEditor from "@/components/monaco";
import Navbar from "@/components/navbar";
import Preview from "@/components/preview";
import { initialCode } from "@/constants/code";
import { getCodeFromUrl } from "@/utils/share";

const Home: React.FC = () => {
  const [code, setCode] = useState<string>(initialCode);
  const [isLoading, setIsLoading] = useState(true);

  const editorPanelRef = useRef<ImperativePanelHandle>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const loadSharedCode = () => {
      const sharedCode = getCodeFromUrl();
      if (sharedCode) {
        setCode(sharedCode);
      }
      setIsLoading(false);
    };

    loadSharedCode();
  }, []);

  const handleResetLayout = () => {
    editorPanelRef.current?.resize(50);
  };

  const handleFullPreview = () => {
    editorPanelRef.current?.collapse();
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
      {/* Small screen - mobile navbar only */}
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

      {/* Desktop playground */}
      <div className="d-none h-dvh md:d-b">
        <PanelGroup direction="horizontal" className="h-full">
          <Panel
            ref={editorPanelRef}
            collapsible
            maxSize={80}
            minSize={20}
            defaultSize={50}
          >
            <div className="d-f fd-c h-full">
              <Navbar
                code={code}
                editorRef={editorRef}
                onResetLayout={handleResetLayout}
                onFullPreview={handleFullPreview}
              />
              <div className="o-h f-1">
                <MonacoEditor
                  code={code}
                  onChange={setCode}
                  onMount={(editor) => {
                    editorRef.current = editor;
                  }}
                />
              </div>
            </div>
          </Panel>
          <PanelResizeHandle
            className="p-px"
            style={{
              backgroundColor: "#31365e",
              cursor: "col-resize",
              width: "2px",
            }}
          />
          <Panel collapsible defaultSize={50} minSize={20} maxSize={80}>
            <Preview code={code} />
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
};

export default Home;
