"use client";

import Editor from "@monaco-editor/react";
import { emmetHTML } from "emmet-monaco-es";
import { useRef } from "react";
import { handleMount } from "@/themes/eclipsa";
import { registerProviders } from "@/utils/providers";

let providersRegistered = false;

interface MonacoEditorProps {
  code: string;
  onChange: (code: string) => void;
  onMount?: (editor: any) => void;
}

function MonacoEditor({ code, onChange, onMount }: MonacoEditorProps) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    if (!providersRegistered) {
      emmetHTML(monaco);
      registerProviders(monaco, editor);
      providersRegistered = true;
    }

    if (handleMount) {
      handleMount(editor, monaco);
    }

    if (onMount) {
      onMount(editor);
    }
  };

  return (
    <div className="h-full" style={{ borderTop: "1px solid #31365e" }}>
      <Editor
        value={code}
        language="html"
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          padding: { top: 8 },
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
        theme="eclipsa"
      />
    </div>
  );
}

export default MonacoEditor;
