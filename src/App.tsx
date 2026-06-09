import { invoke } from "@tauri-apps/api/core";
import MDEditor from "./components/MdEditor";
import { useEffect, useState } from "react";

function App() {
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    async function GetFile() {
      const path = await invoke<string>("get_file");
      setFile(path);
    }

    GetFile;
  }, [])

  return (
    <main className="bg-black w-screen h-screen flex flex-row p-3 gap-3">
      <MDEditor file_path={file}></MDEditor>
    </main>
  )
}

export default App;
