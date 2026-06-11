import { useState } from "react";
import MDEditor from "./components/MdEditor";
import MDPreview from "./components/MdPreview";
import "github-markdown-css/github-markdown.css";

function App() {
  const [value, setValue] = useState<string>("");

  return (
    <main className="bg-black w-screen h-screen flex flex-row p-5 gap-5">
      <MDEditor value={value} setValue={setValue}></MDEditor>
      <MDPreview value={value}></MDPreview>
    </main>
  )
}

export default App;
