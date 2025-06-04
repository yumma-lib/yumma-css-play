import "../styles/globals.css";
import { emmetHTML } from "emmet-monaco-es";
import { handleMount } from "../themes/midnight";
import { useActiveCode, SandpackStack, FileTabs, useSandpack } from "@codesandbox/sandpack-react";
import { useRef } from "react";
import Editor from "@monaco-editor/react";
import Header from "./header";
import { registerProviders } from "../utils/providers";

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
    <SandpackStack style={{ height: "100dvh", margin: 0 }}>
      <Header />
      <FileTabs style={{ borderTop: "1px solid #31365e" }} />
      <div className="f-1">
        <Editor
          defaultValue={code}
          key={sandpack.activeFile}
          language={getLanguage(sandpack.activeFile)}
          onChange={(value) => updateCode(value || "")}
          onMount={handleEditorDidMount}
          options={{ minimap: { enabled: false } }}
          theme="midnight"
        />
      </div>
    </SandpackStack>
  );
}

export default MonacoEditor;
