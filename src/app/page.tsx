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
import { initialCode } from "@/constants/code";
import customSpTheme from "@/themes/spMidnight";
import { getCodeFromUrl } from "@/utils/share";

export default function Home () {
  const [code, setCode] = useState<string>(initialCode);
  const [isLoading, setIsLoading] = useState(true);

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

  // don't render Sandpack until we've checked for shared code
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
        <PanelGroup direction="horizontal" className="h-dvh">
          <Panel maxSize={80} minSize={20} defaultSize={50}>
            <MonacoEditor />
          </Panel>
          <PanelResizeHandle onDoubleClick={() => {}} />
          <Panel defaultSize={50}>
            <SandpackPreview
              className="h-dvh"
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
            />
          </Panel>
        </PanelGroup>
      </SandpackLayout>
    </SandpackProvider>
  );
};
