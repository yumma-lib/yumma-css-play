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

export default function Home() {
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
      <div className="d-f fd-c h-dvh">
        {/* Navbar - Always at top, inside SandpackProvider */}
        <Navbar
          isMobile={isMobile}
          showingPreview={showPreview}
          onToggleView={() => setShowPreview(!showPreview)}
        />

        {/* Content Area */}
        <div className="f-1 o-h">
          <SandpackLayout className="b-0 h-full">
            {isMobile ? (
              // Mobile: Single panel with slide animation
              <div className="p-r h-full o-h">
                {/* Editor Panel */}
                <div className="p-a t-0 l-0 w-full h-full">
                  <MonacoEditor />
                </div>
                {/* Preview Panel */}
                <div className="p-a t-0 l-0 w-full h-full">
                  <SandpackPreview
                    showOpenInCodeSandbox={false}
                    showRefreshButton={false}
                  />
                </div>
              </div>
            ) : (
              // Desktop: Side-by-side panels
              <PanelGroup direction="horizontal" style={{ height: "100%" }}>
                <Panel maxSize={80} minSize={20} defaultSize={50}>
                  <MonacoEditor />
                </Panel>
                <PanelResizeHandle onDoubleClick={() => { }} />
                <Panel defaultSize={50}>
                  <SandpackPreview
                    className="h-full"
                    showOpenInCodeSandbox={false}
                    showRefreshButton={false}
                  />
                </Panel>
              </PanelGroup>
            )}
          </SandpackLayout>
        </div>
      </div>
    </SandpackProvider>
  );
}