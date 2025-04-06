"use client"

import { signOutHelper } from "@/lib/actions";
import { sendPDF } from "@/lib/actions";
import DynamicBox from "@/app/components/dynamic-box"
import Navbar from "../components/navbar";

import { useActionState, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { newUser } from '@/lib/actions';
export default function Dashboard() {
    const [syllabi, setSyllabi] = useState([""])
    const isInitialRender = useRef(true); // Tracks the initial render
    
    const [state, formAction, isPending] = useActionState(
        sendPDF,
        undefined,
    );
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false; return;
        }
        setSyllabi((prev) => [...prev, state ?? ""])
    }, [state])

    const formRef = useRef(null);

    
    return (
        <div>
            <Navbar />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            <form ref={formRef} action={formAction}>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer outline-gray-50 :hover:bg-gray-800 :bg-gray-700 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 ">PDF Only (MAX. 800x400px)</p>
                        
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" name="dropzone-file"/>
                    <input type="text" placeholder="Add Username here..." name="username" id="studentid" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" />
                </label>
                <button className="border-white bg-[#047ac0] text-white text-center font-bold px-4 py-2 mt-2 w-full mx-auto block rounded hover:bg-blue-600 transition border-2 ">Upload</button>
            </form>
            {
                syllabi.map((val, index) => ( val.length > 0 ?
                    <DynamicBox item={val} index={index} key={index}/> : ""
                ))
            }
            </div>



        </div>
    );
}