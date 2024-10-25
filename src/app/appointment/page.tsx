"use client";
import axios from "axios";

import { useEffect, useState } from "react";
import Searchbox from "@/components/appointments/Searchbox";
import SearchCard from "@/components/appointments/SearchCard";
import NextButton from "@/components/appointments/NextButton";
import DoctorCards from "@/components/appointments/DoctorCards";


axios.defaults.baseURL = 'http://localhost:5000';

const AppointmentsPage = () => {
    const [seletectedDoctor, setSelectedDoctor] = useState("null");
    const [fetchTrigger, setFetchTigger] = useState<number>(0);

    const handleDoctorSelect = (doctorid:string) => {
        setSelectedDoctor(doctorid);
        setFetchTigger((prev) => prev + 1);
    }
    
    return (
        <main>
            <div className="flex flex-col justify-center items-center min-h-screen gap-20">
                <h1 className="mt-20 text-2xl tracking-tighter">This is the Doctors Selection page</h1>
                <div className="w-full box-border flex justify-center relative">
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