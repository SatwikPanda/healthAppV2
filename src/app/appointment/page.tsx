"use client";
import axios from "axios";

import { useEffect, useState } from "react";
import Searchbox from "@/components/appointments/Searchbox";
import SearchCard from "@/components/appointments/SearchCard";
import NextButton from "@/components/appointments/NextButton";
import DoctorCards from "@/components/appointments/DoctorCards";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";


axios.defaults.baseURL = 'http://localhost:5000';

const AppointmentsPage = () => {
    const [seletectedDoctor, setSelectedDoctor] = useState("null");
    const [fetchTrigger, setFetchTigger] = useState<number>(0);

    const Router = useRouter();

    const handleDoctorSelect = (doctorid:string) => {
        setSelectedDoctor(doctorid);
        setFetchTigger((prev) => prev + 1);
    }
    
    return (
        <main>
            <div className="flex flex-col justify-center bg-black text-white items-center relative min-h-screen gap-5">
                <div onClick={() => Router.back()} className="absolute top-10 left-10 text-xl p-2 hover:bg-neutral-700/50 rounded-md">
                    <FaAngleLeft />
                </div>
                <h1 className="mt-[15%] mb-[2%] text-6xl font-semibold tracking-tight">Select a Doctor!</h1>
                <div className="w-full box-border flex text-black justify-center relative">
                    <Searchbox onDoctorSelect={handleDoctorSelect}/>
                    {(seletectedDoctor !== "null") ? <SearchCard doctorid={seletectedDoctor} fetchTigger={fetchTrigger} onDoctorRemove={handleDoctorSelect}/> : null}
                </div>
                <div>
                    <DoctorCards onDoctorSelect={handleDoctorSelect} />
                </div>
                <div className="w-[80%] box-border flex justify-end mb-20">
                    <NextButton doctorid={seletectedDoctor} />
                </div>
            </div>
        </main>
    );
}
 
export default AppointmentsPage;