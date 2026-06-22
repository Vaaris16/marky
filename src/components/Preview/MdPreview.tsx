import { Eye } from "lucide-react";
import { marked } from "marked";
import { useEffect, useState } from "react";
import { NoPreviewBodyText, NoPreviewBodyTextAfterBr, NoPreviewMainText } from "./PreviewData";

export default function MDPreview({ path, value }: { path: string, value: string }) {
  const [html, setHTML] = useState("");
  const [enablePreview, setEnablePreview] = useState(false);

  useEffect(() => {
    async function getRawHTML() {
      const string = await marked.parse(value);

      setHTML(string);
    }

    function setPreview() {
      if (path != "") {
        setEnablePreview(true);
      } else {
        setEnablePreview(false);
      }
    }

    getRawHTML();
    setPreview();
  }, [value, path])

  console.log(enablePreview);

  return (
    <section className="w-1/2 h-full text-white">
      {!enablePreview && <div className="w-full h-full rounded-3xl bg-base-bg gap-2 text-center flex flex-col justify-center items-center">
        <div className="w-17 h-17 bg-icon-bg flex flex-col justify-center items-center rounded-xl">
          <Eye color="var(--color-icon-color)" size={32} />
        </div>

        <p className="text-text-base text-sm">{NoPreviewMainText}</p>
        <p className="text-text-secondary text-xs">{NoPreviewBodyText}<br />{NoPreviewBodyTextAfterBr}</p>

      </div>}
      {enablePreview && <div className="markdown-body w-full h-full p-5 rounded-3xl" dangerouslySetInnerHTML={{ __html: html }}></div>}
    </section>
  )
}
