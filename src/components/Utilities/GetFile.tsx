import { invoke } from "@tauri-apps/api/core";

export default async function getFile({ setFilePath }: { setFilePath: (path: string) => void }) {
  const path = await invoke<string>("get_file");
  setFilePath(path);
}
