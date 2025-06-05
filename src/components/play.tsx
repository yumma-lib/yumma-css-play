import { defaultCode, defaultStyles } from "../constants/content";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { SandpackProvider, SandpackLayout, SandpackPreview, SandpackFileExplorer } from "@codesandbox/sandpack-react";
import { useMediaQuery } from "react-responsive";
import customSpTheme from "../themes/spMidnight";
import MonacoEditor from "./monaco";
import React, { useMemo } from "react";

const Playground: React.FC = () => {
  const isLarge = useMediaQuery({ maxWidth: 1024 });

  const files = useMemo(() => {
    return {
      "index.html": defaultCode,
      "styles.css": defaultStyles,
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
      {isLarge ? (
        <div className="bg-indigo-12 d-g h-dvh pi-c">
          <h1 className="ff-c fs-3xl ta-c tc-white">
            Sorry, Yumma CSS Play does not support the screen size of your device.
          </h1>
        </div>
      ) : (
        <SandpackLayout>
          <PanelGroup direction="horizontal" className="h-dvh">
            <Panel maxSize={80} minSize={20} defaultSize={50}>
              <MonacoEditor />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={50}>
              <SandpackPreview className="h-dvh" showOpenInCodeSandbox={false} showRefreshButton={false} />
            </Panel>
          </PanelGroup>
        </SandpackLayout>
      )}
    </SandpackProvider>
  );
};

export default Playground;
