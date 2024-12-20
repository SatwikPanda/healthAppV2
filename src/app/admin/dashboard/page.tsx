"use client";

import AddCard from "@/components/adminDashboard/AddDoctor";
import { useEffect, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import axios from "axios";
import DoctorsTable from "@/components/adminDashboard/DoctorsTable";
import AppointmentsTable from "@/components/adminDashboard/AppointmentsTable";
import PatientCard from "@/components/adminDashboard/PatientCard";
import { FaAngleLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import DoctorCard from "@/components/adminDashboard/DoctorCard";

axios.defaults.baseURL = 'http://localhost:5000';

const AdminDashboard = () => {
    const [cardOpen, setCardOpen] = useState(false);
    const [isDoctors, setIsDoctors] = useState(false);
    const [isAppointments, setIsAppointments] = useState(true);

    const [isPatient, setIsPatient] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);

    const [doctorCardId, setDoctorCardId] = useState<number>(0);
    const [doctorCardOpen, setDoctorCardOpen] = useState(false);

    const router = useRouter();

    const handleSignOut = () => {
        router.back();
    }

    useEffect(() => {
        const preventscroll = () => {
            window.scrollTo(0, 0);
        }

        if (cardOpen || isPatient || doctorCardOpen) {
            window.addEventListener("scroll", preventscroll);
        }
        else {
            window.removeEventListener("scroll", preventscroll);
        }
        return () => window.removeEventListener("scroll", preventscroll);
    },[cardOpen, isPatient, doctorCardOpen])

    return (
        <div className={`min-h-screen w-full bg-black p-10 text-white relative ${cardOpen ? "overflow-hidden" : ""}`}>
            {cardOpen ? <AddCard setCardOpen={setCardOpen} /> : null}
            {isPatient ? <PatientCard PatientId={selectedPatient} setIsPatient={setIsPatient} /> : null }
            {doctorCardOpen ? <DoctorCard doctorId={doctorCardId} setDoctorCardOpen={setDoctorCardOpen} /> : null}
            <div className="w-full flex justify-between items-center ">
                <div className="flex gap-2">
                    <button onClick={handleSignOut} className="px-4 py-2 bg-white text-black border border-neutral-800 rounded-sm flex items-center gap-2 hover:bg-neutral-300">
                        <FaAngleLeft />
                        Sign out
                    </button>
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
                {isAppointments ? <AppointmentsTable isAppointments={isAppointments} setIsPatient={setIsPatient} setSelectedPatient={setSelectedPatient} /> : <DoctorsTable isDoctors={isDoctors} setDoctorId={setDoctorCardId} setDoctorCardOpen={setDoctorCardOpen} />}
            </div>
        </div>
    );
}
 
export default AdminDashboard;