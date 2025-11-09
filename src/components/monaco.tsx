import {
  SandpackStack,
  useActiveCode,
  useSandpack,
} from "@codesandbox/sandpack-react";
import Editor from "@monaco-editor/react";
import { emmetHTML } from "emmet-monaco-es";
import { useRef } from "react";
import { handleMount } from "@/themes/midnight";
import { setupKeybindings } from "@/utils/keybindings";
import { registerProviders } from "@/utils/providers";
import Navbar from "./navbar";

function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    emmetHTML(monaco);
    registerProviders(monaco);
    setupKeybindings(editor, monaco);

    if (handleMount) {
      handleMount(editor, monaco);
    }
  };

  const getLanguage = (filename: string) => {
    if (filename.endsWith(".css")) return "css";
    if (filename.endsWith(".html")) return "html";

    return "html";
  };

  return (
    <SandpackStack className="h-dvh m-0">
      <Navbar />
      <div className="f-1" style={{ borderTop: "1px solid #31365e" }}>
        <Editor
          defaultValue={code}
          key={sandpack.activeFile}
          language={getLanguage(sandpack.activeFile)}
          onChange={(value) => updateCode(value || "")}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            padding: { top: 8 },
            scrollBeyondLastLine: false,
            wordWrap: "on",
          }}
          theme="midnight"
        />
      </div>
    </SandpackStack>
  );
}

export default MonacoEditor;
