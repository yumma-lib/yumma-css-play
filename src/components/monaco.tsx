import { handleMount } from "../themes/midnight";
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  SandpackFileExplorer,
  RoundedButton,
  useSandpack,
} from "@codesandbox/sandpack-react";
import Editor from "@monaco-editor/react";

function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  return (
    <SandpackStack style={{ height: "calc(100dvh - 4rem)", margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1 }}>
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
