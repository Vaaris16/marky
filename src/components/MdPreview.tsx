import { marked } from "marked";
import { useEffect, useState } from "react";

export default function MDPreview({ value }: { value: string }) {
  const [html, setHTML] = useState("");

  useEffect(() => {
    async function getRawHTML() {
      const string = await marked.parse(value);

      setHTML(string);
    }

    getRawHTML();
  }, [value])


  return (
    <section className="markdown-body w-1/2 h-full p-3 rounded-3xl text-white"
      dangerouslySetInnerHTML={{ __html: html }}>
    </section>
  )
}
