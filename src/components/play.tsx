import { defaultCode, defaultStyles } from "../constants/content";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { SandpackProvider, SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
import { useMediaQuery } from "react-responsive";
import customSpTheme from "../themes/spMidnight";
import MonacoEditor from "./monaco";
import React from "react";

const Playground: React.FC = () => {
  const isLarge = useMediaQuery({ maxWidth: 1024 });

  return (
    <SandpackProvider
      files={{ "index.html": defaultCode, "styles.css": defaultStyles }}
      template="static"
      theme={customSpTheme}
      options={{ externalResources: ["/styles.css"] }}>
      {isLarge ? (
        <div className="bg-indigo-12 d-g h-dvh pi-c">
          <h1 className="ff-c fs-xl ta-c tc-white">Sorry, but we don&apos;t support your screen size for now.</h1>
        </div>
      ) : (
        <SandpackLayout>
          <PanelGroup direction="horizontal" style={{ height: "100dvh" }}>
            <Panel maxSize={80} minSize={20} defaultSize={50}>
              <MonacoEditor />
            </Panel>
            <PanelResizeHandle />
            <Panel>
              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                style={{ height: "100dvh" }}
                title="Preview"
              />
            </Panel>
          </PanelGroup>
        </SandpackLayout>
      )}
    </SandpackProvider>
  );
};

export default Playground;
