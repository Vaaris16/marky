import { useState } from "react";
import MDEditor from "./components/Editor/MdEditor";
import MDPreview from "./components/Preview/MdPreview";
import "github-markdown-css/github-markdown.css";
import MenuBar from "./components/MenuBar/MenuBar";

function App() {
  const [value, setValue] = useState<string>("");
  const [path, setPath] = useState<string>("");

  return (
    <main className="bg-black w-screen h-screen flex flex-col">
      <MenuBar setFilePath={setPath}></MenuBar>
      <div className="w-full h-full p-3 gap-3 flex flex-row justify-center items-center">
        <MDEditor filePath={path} setFilePath={setPath} value={value} setValue={setValue}></MDEditor>
        <MDPreview value={value} path={path}></MDPreview>
      </div>
    </main>
  )
}

export default App;
