import { handleMount } from "../themes/midnight";
import { useActiveCode, SandpackStack, FileTabs, useSandpack } from "@codesandbox/sandpack-react";
import Editor from "@monaco-editor/react";
import Logotype from "./logotype";

import "../styles/globals.css";

function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  return (
    <SandpackStack style={{ height: "100dvh", margin: 0 }}>
      <Logotype />
      <FileTabs style={{ borderTop: "1px solid #31365e" }} />
      <div className="f-1">
        <Editor
          defaultValue={code}
          onMount={handleMount}
          key={sandpack.activeFile}
          onChange={(value) => updateCode(value || "")}
          options={{ minimap: { enabled: false } }}
          theme="midnight"
          language="html"
        />
      </div>
    </SandpackStack>
  );
}

export default MonacoEditor;
