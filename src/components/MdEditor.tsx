import Editor from "@monaco-editor/react";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { FilePlusCorner } from "lucide-react";

export default function MDEditor({
  value, setValue
}: { value: string, setValue: (v: string) => void }) {
  const [enableEditor, setEnableEditor] = useState(false);
  const [filePath, setFilePath] = useState("")

  useEffect(() => {
    async function loadFile() {
      if (filePath) {
        const value_file = await invoke<string>("get_file_content", { file: filePath });
        setValue(value_file);
        setEnableEditor(true);
      }
    }

    loadFile();

  }, [filePath])


  const openFileExplorer = async () => {
    const path = await invoke<string>("get_file");
    setFilePath(path);
  }

  function onMount(editor: any, monaco: any) {
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyE, () => {
        invoke("save_file", { filePath: filePath, content: editor.getValue() })
        console.log("filePath after save:", filePath);
        console.log("save")
      }
    )
  }

  return (
    <section className="h-full w-1/2 rounded-3xl overflow-hidden">
      {!enableEditor &&
        <div className="w-full h-full flex flex-col justify-center items-center bg-[#1e1e1e]">
          <button onClick={openFileExplorer} className="w-30 h-30 rounded-3xl bg-[#2b2b2b] flex flex-col justify-center items-center">
            <FilePlusCorner color="white" size={64} />
          </button>
        </div>
      }

      {enableEditor &&
        <Editor
          height="100vh"
          width="50vw"
          language="markdown"
          theme="vs-dark"
          value={value}
          onChange={(new_value) => setValue(new_value ?? "")}
          onMount={onMount}
          options={{
            wordWrap: "on",
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
            padding: { top: 12, bottom: 5 },
            scrollBeyondLastLine: false,
          }}
        />
      }
    </section>
  );
}
