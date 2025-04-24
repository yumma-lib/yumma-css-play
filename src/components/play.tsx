import { defaultCode, defaultStyles } from "../constants/content";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { SandpackProvider, SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
import { useMediaQuery } from "react-responsive";
import customSpTheme from "../themes/spMidnight";
import MonacoEditor from "./monaco";
import React, { useState } from "react";

const Playground: React.FC = () => {
  const isLarge = useMediaQuery({ maxWidth: 1024 });

  return (
    <SandpackProvider
      files={{ "index.html": defaultCode, "styles.css": defaultStyles }}
      template="static"
      theme={customSpTheme}
      options={{ externalResources: ["/styles.css"] }}>
      {isLarge ? (
        <div className="h-dvh d-g pi-c bg-indigo-12">
          <h1 className="ff-c tc-white fs-xl ta-c">We don&apos;t support small screens for now, sorry.</h1>
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
