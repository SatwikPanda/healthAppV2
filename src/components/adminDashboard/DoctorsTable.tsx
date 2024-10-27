"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import { MdDeleteForever } from "react-icons/md";

axios.defaults.baseURL = 'http://localhost:5000';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    photo: string;
    experience: number;
}

const DoctorsTable = ({ isDoctors, setDoctorId, setDoctorCardOpen }:{ isDoctors: boolean, setDoctorId: React.Dispatch<React.SetStateAction<number>>, setDoctorCardOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isDoctors) {
            const fetchAppointments = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get('/doctors');
                    setDoctors(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
            fetchAppointments();
        }
    }, [ isDoctors]);

    const deletedoctor = async (id: number) => {
        try {
            await axios.delete(`/doctors/${id}`);
            setDoctors((prevDoctors) =>
                prevDoctors.filter((doctors) => doctors.id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="w-full flex justify-center overflow-auto">
            {isDoctors && doctors.length > 0 ? (
                <table className="w-full bg-black text-sm text-left">
                    <thead>
                        <tr className=" w-full border-b border-neutral-800">
                            <th className="p-3">Sl <br /> no</th>
                            <th className="p-3">Photo</th>
                            <th className="p-3 w-[50%]">Name</th>
                            <th className="p-3">Specialization</th>
                            <th className="p-3">Experience</th>
                            <th className="p-3 w-[1.5rem]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor, index) => (
                            <tr key={doctor.id} onClick={() => {setDoctorId(doctor.id); setDoctorCardOpen(true)}} className="border-b border-neutral-800 hover:bg-neutral-700/30">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">
                                    <img src={doctor.photo} alt={doctor.name} className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="p-3">{doctor.name}</td>
                                <td className="p-3">{doctor.specialization}</td>
                                <td className="p-3">{doctor.experience} years</td>
                                <td className="p-3 text-center text-2xl">
                                    <button onClick={(e) => {deletedoctor(doctor.id); e.stopPropagation()}} className="p-2 hover:bg-red-500/20 rounded-md">
                                        <MdDeleteForever className="text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No doctors</p>
            )}
        </div>
    );
}
 
export default DoctorsTable;