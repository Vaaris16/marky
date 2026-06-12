import Editor from "@monaco-editor/react";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { FilePlusCorner, FolderOpen } from "lucide-react";

import "./Data";
import { Button, NoFileBodyText, NoFileBodyTextBreak, NoFileMainText } from "./Data";

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
    <section className="h-full w-1/2 rounded-3xl overflow-hidden bg-base-bg">
      {!enableEditor &&
        <div className="w-full h-full rounded-3xl flex flex-col justify-center items-center gap-3 text-center">
          <div className="w-17 h-17 bg-icon-bg flex flex-col justify-center items-center rounded-xl">
            <FilePlusCorner color="var(--color-icon-color)" size={32} />
          </div>

          <p className="text-text-base text-sm">{NoFileMainText}</p>
          <p className="text-text-secondary text-xs">{NoFileBodyText}<br />{NoFileBodyTextBreak}</p>


          <div className="flex flex-row justify-center items-center gap-2">
            {Button.map(({ text, icon: Icon, onClickFunction }, index) => (

              <button key={index} onClick={onClickFunction} className="w-25 h-10 flex flex-row justify-center items-center gap-2 rounded-xl text-xs bg-editor-button-bg text-editor-button-text">
                <Icon size={16} />
                <p>{text}</p>
              </button>
            ))}
          </div>
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
