"use client";

import AddCard from "@/components/adminDashboard/AddDoctor";
import { useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import axios from "axios";
import DoctorsTable from "@/components/adminDashboard/DoctorsTable";
import AppointmentsTable from "@/components/adminDashboard/AppointmentsTable";

axios.defaults.baseURL = 'http://localhost:5000';

const AdminDashboard = () => {
    const [cardOpen, setCardOpen] = useState(false);
    const [isDoctors, setIsDoctors] = useState(false);
    const [isAppointments, setIsAppointments] = useState(true);

    return (
        <div className={`min-h-screen w-full bg-black p-10 text-white relative ${cardOpen ? "overflow-hidden" : ""}`}>
            {cardOpen ? <AddCard setCardOpen={setCardOpen} /> : null}
            <div className="w-full flex justify-between items-center ">
                <div className="flex gap-2">
                    <input type="text" name="search" id="" className="border border-neutral-800 rounded-md outline-none bg-black px-2 py-1 text-md"/>
                    <button onClick={() => setCardOpen(true)} className="border border-neutral-800 rounded-md px-2 py-1 flex items-center gap-2 hover:bg-neutral-700 transition">
                        <LuPlusCircle className=""/>
                        <span className="text-sm">Add doctor</span>
                    </button>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => {setIsDoctors(true); setIsAppointments(false)}}
                     className={`px-4 py-2 border border-neutral-800 rounded-sm  ${isDoctors ? "bg-white text-black" : "hover:bg-neutral-800"}`}>Doctors</button>
                    <button onClick={() => {setIsAppointments(true); setIsDoctors(false)}}
                     className={`flex items-center gap-2 px-4 py-2 border border-neutral-800 rounded-sm  ${isAppointments ? "bg-white text-black" : "hover:bg-neutral-800"}`}>
                        <span>Appointments</span>
                    </button>
                </div>
            </div>
            <div className="w-full border border-neutral-800 rounded-md mt-7 p-5">
                {isAppointments ? <AppointmentsTable isAppointments={isAppointments} /> : <DoctorsTable />}
            </div>
        </div>
    );
}
 
export default AdminDashboard;