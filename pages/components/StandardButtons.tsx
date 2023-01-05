import { JsxElement } from "typescript";
import ReactNode from 'react'

export function InterfaceButton ({children}: {children: any}) {
    return <button className="p-5 ml-5 bg-[#FFEBB7] rounded-lg text-4xl text-black mt-10 drop-shadow-md shadow-black transition-all hover:scale-110">{children}</button>
}