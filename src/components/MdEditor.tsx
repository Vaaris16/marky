import Editor from "@monaco-editor/react";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

type MDEditorArgs = {
  file_path: string;
};

export default function MDEditor({ file_path }: MDEditorArgs) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    async function loadFile() {
      const value = await invoke<string>("get_file_content", { file: file_path });

      setValue(value);
    }

    loadFile;
  }, [])

  return (
    <section className="h-full w-1/2 rounded-3xl overflow-hidden">
      <Editor
        height="100vh"
        width="50vw"
        language="markdown"
        theme="vs-dark"
        value={value}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          padding: { top: 12, bottom: 5 },
          scrollBeyondLastLine: false,
        }}
      />
    </section>
  );
}
