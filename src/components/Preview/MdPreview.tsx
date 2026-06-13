import { Eye } from "lucide-react";
import { marked } from "marked";
import { useEffect, useState } from "react";

export default function MDPreview({ value }: { value: string }) {
  const [html, setHTML] = useState("");
  const [enablePreview, setEnablePreview] = useState(false);

  useEffect(() => {
    async function getRawHTML() {
      const string = await marked.parse(value);

      setHTML(string);
    }

    function setPreview() {
      if (value != "") {
        setEnablePreview(true);
      } else {
        setEnablePreview(false);
      }
    }

    getRawHTML();
    setPreview();
  }, [value])

  console.log(enablePreview);

  return (
    <section className="w-1/2 h-full text-white">
      {!enablePreview && <div className="w-full h-full rounded-3xl bg-base-bg gap-2 text-center flex flex-col justify-center items-center">
        <div className="w-17 h-17 bg-icon-bg flex flex-col justify-center items-center rounded-xl">
          <Eye color="var(--color-icon-color)" size={32} />
        </div>

        <p className="text-text-base text-sm">Nothing to preview</p>
        <p className="text-text-secondary text-xs">Open a file in the editor to see a<br />live preview here</p>

      </div>}
      {enablePreview && <div className="markdown-body w-full h-full rounded-3xl" dangerouslySetInnerHTML={{ __html: html }}></div>}
    </section>
  )
}
