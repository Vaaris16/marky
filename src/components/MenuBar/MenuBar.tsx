import { AppName } from "./MenuBarData"
import { Button } from "../Editor/Data"
import getFile from "../Utilities/GetFile"

export default function MenuBar({ setFilePath }: { setFilePath: (path: string) => void }) {
  return (
    <section className="w-full h-1/19 bg-base-bg gap-5 py-2 flex flex-row items-center">
      <h1 className="text-sm text-white font-bold pl-8">{AppName}</h1>
      <hr className="w-0.5 h-3/5 bg-text-secondary" />
      <p className="text-sm text-text-secondary italic font-medium">No File Open</p>

      <div className="ml-auto flex flex-row mr-8 gap-2 text-text-base text-sm">
        {Button.map(({ icon: Icon, text }, index) => (
          <button onClick={async () => {
            if (index === 0) {
              getFile({ setFilePath });
            }
          }} className="bg-base-bg p-1 border-2 border-borders gap-1.5 rounded-lg  flex flex-row justify-center items-center">
            <Icon size={16} />
            <p className="text-sm">{text}</p>
          </button>
        ))}
      </div>
    </section >
  )
}
