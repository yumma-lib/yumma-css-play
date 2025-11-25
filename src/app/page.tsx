"use client";

import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import MonacoEditor from "@/components/monaco";
import Navbar from "@/components/navbar";
import { initialCode } from "@/constants/code";
import customSpTheme from "@/themes/spMidnight";
import { getCodeFromUrl } from "@/utils/share";

export default function Home {
  const [code, setCode] = useState<string>(initialCode);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load shared code from URL on mount
  useEffect(() => {
    const loadSharedCode = async () => {
      const sharedCode = await getCodeFromUrl();
      if (sharedCode) {
        setCode(sharedCode);
      }
      setIsLoading(false);
    };

    loadSharedCode();
  }, []);

  // Don't render Sandpack until we've checked for shared code
  if (isLoading) {
    return (
      <div className="d-f ai-c jc-c h-dvh tc-white">
        <div className="ta-c">
          <div className="fs-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <SandpackProvider
      files={{
        "index.html": code,
      }}
      template="static"
      theme={customSpTheme}
      options={{
        externalResources: [
          "https://cdn.jsdelivr.net/npm/@yummacss/runtime@0.1.0/dist/index.iife.js",
        ],
        minimap: { enabled: false },
        ...({
          emmet: {
            enabled: true,
            triggerExpansionOnTab: true,
            showAbbreviationSuggestions: true,
            showExpandedAbbreviation: "always",
            showSuggestionsAsSnippets: true,
            preferences: {},
            showExcluded: true,
            syntaxProfiles: {},
            variables: {},
          },
        } as any),
      }}
    >
      <SandpackLayout style={{ border: 0 }}>
        {isMobile ? (
          // Mobile: Single panel with toggle
          <div className="d-f fd-c h-dvh">
            <Navbar
              isMobile={isMobile}
              showingPreview={showPreview}
              onToggleView={() => setShowPreview(!showPreview)}
            />
            <div className="f-1 p-r o-h">
              {/* Editor */}
              <div
                className="p-a t-0 l-0 w-full h-full"
                style={{
                  transform: showPreview ? "translateX(-100%)" : "translateX(0)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <MonacoEditor />
              </div>
              {/* Preview */}
              <div
                className="p-a t-0 l-0 w-full h-full"
                style={{
                  transform: showPreview ? "translateX(0)" : "translateX(100%)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <SandpackPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton={false}
                />
              </div>
            </div>
          </div>
        ) : (
          // Desktop: Side-by-side panels
          <div className="d-f fd-c h-dvh">
            <Navbar isMobile={false} />
            <div className="f-1">
              <PanelGroup direction="horizontal">
                <Panel maxSize={80} minSize={20} defaultSize={50}>
                  <MonacoEditor />
                </Panel>
                <PanelResizeHandle onDoubleClick={() => {}} />
                <Panel defaultSize={50}>
                  <SandpackPreview
                    className="h-full"
                    showOpenInCodeSandbox={false}
                    showRefreshButton={false}
                  />
                </Panel>
              </PanelGroup>
            </div>
          </div>
        )}
      </SandpackLayout>
    </SandpackProvider>
  );
};
