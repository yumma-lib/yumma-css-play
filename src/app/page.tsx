"use client";

import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import type React from "react";
import { useMemo } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import MonacoEditor from "@/components/monaco";
import { initialCode } from "@/constants/code";
import customSpTheme from "@/themes/spMidnight";

const Home: React.FC = () => {
  const files = useMemo(() => {
    return {
      "index.html": initialCode,
    };
  }, []);

  return (
    <SandpackProvider
      files={files}
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

export default Home;
