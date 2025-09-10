import { initialCode, initialStyles } from "@/constants/content";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { SandpackProvider, SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
import customSpTheme from "@/themes/spMidnight";
import MonacoEditor from "./monaco";
import React, { useMemo } from "react";

const Playground: React.FC = () => {
  const files = useMemo(() => {
    return {
      "index.html": initialCode,
      "styles.css": initialStyles,
    };
  }, []);

  return (
    <SandpackProvider
      files={files}
      template="static"
      theme={customSpTheme}
      options={{
        externalResources: ["/styles.css"],
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
      }}>
      <SandpackLayout style={{ border: 0 }}>
        <PanelGroup direction="horizontal" className="h-dvh">
          <Panel maxSize={80} minSize={20} defaultSize={50}>
            <MonacoEditor />
          </Panel>
          <PanelResizeHandle onDoubleClick={() => {}} />
          <Panel defaultSize={50}>
            <SandpackPreview className="h-dvh" showOpenInCodeSandbox={true} showRefreshButton={false} />
          </Panel>
        </PanelGroup>
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default Playground;
