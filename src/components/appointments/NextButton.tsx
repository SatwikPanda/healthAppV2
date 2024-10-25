"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineNavigateNext } from "react-icons/md";

const NextButton = ({ doctorid }: { doctorid: string }) => {

    const Router = useRouter();
    const handleClick = () => {
        if(doctorid === "null"){
            alert("Please select a doctor first");
        } else {
            Router.push(`/appointment/${doctorid}`);
        }
    }

    return (
        <div className="relative">
            <button className="flex items-center bg-white border-2 shadow-sm text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition "
            onClick={handleClick}>
                <span>Next</span>
                <MdOutlineNavigateNext className="text-2xl" />
            </button>
        </div>
    );
}

export default NextButton;