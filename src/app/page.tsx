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

const Home: React.FC = () => {
  const [code, setCode] = useState<string>(initialCode);
  const [isLoading, setIsLoading] = useState(true);
  const [activePanel, setActivePanel] = useState<"editor" | "preview">(
    "editor",
  );

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

  const togglePanel = () => {
    setActivePanel((prev) => (prev === "editor" ? "preview" : "editor"));
  };

  // don't render Sandpack until we've checked for shared code
  if (isLoading) {
    return (
      <div className="d-f ai-c jc-c h-dvh c-white">
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
          "https://cdn.jsdelivr.net/npm/@yummacss/runtime@latest/dist/index.iife.js",
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
        <Navbar activePanel={activePanel} onTogglePanel={togglePanel} />
        <SandpackLayout style={{ border: 0, flex: 1 }}>
          {/* Desktop */}
          <div className="d-none md:d-f h-full w-full">
            <PanelGroup direction="horizontal" className="h-full">
              <Panel collapsible maxSize={80} minSize={20} defaultSize={50}>
                <MonacoEditor />
              </Panel>
              <PanelResizeHandle className="p-1" onDoubleClick={() => { }} />
              <Panel collapsible defaultSize={50}>
                <SandpackPreview
                  className="h-full"
                  showOpenInCodeSandbox={false}
                  showRefreshButton={false}
                />
              </Panel>
            </PanelGroup>
          </div>

          {/* Mobile */}
          <div className="d-f md:d-none h-full w-full">
            {activePanel === "editor" ? (
              <div className="w-full h-full">
                <MonacoEditor />
              </div>
            ) : (
              <div className="w-full h-full">
                <SandpackPreview
                  className="h-full"
                  showOpenInCodeSandbox={false}
                  showRefreshButton={false}
                />
              </div>
            )}
          </div>
        </SandpackLayout>
      </div>
    </SandpackProvider>
  );
};

export default Home;
