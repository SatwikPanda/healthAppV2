// app/appointment/[doctorid]/[patientId].tsx

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoIosCheckmarkCircle } from "react-icons/io";

const SuccessPage = () => {
    const { doctorid, patientId } = useParams(); // Get doctorId and patientId from URL parameters
    const [patientDetails, setPatientDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [doctor, setDoctor] = useState<any>(null);


    const Router = useRouter();


    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/appointments/${patientId}`);
                setPatientDetails(response.data);
            } catch (error) {
                console.error("Error fetching patient details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (patientId) {
            fetchPatientDetails();
        }
    }, [patientId]);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/doctors/${doctorid}`);
                setDoctor(response.data);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (doctorid) {
            fetchDoctor();
        }
    }, [doctorid]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full bg-black">
            {loading ? (
                <p>Loading...</p>
            ) : patientDetails ? (
                <div className="w-full max-w-xl mt-6 flex flex-col items-center justify-center space-y-4 border border-neutral-800 shadow-[0_4px_200px_rgba(255,255,255,0.2)] p-4 rounded bg-black text-white">
                    <IoIosCheckmarkCircle className="text-[15rem] text-green-400" />
                    <div className="flex flex-col gap-2 w-[23rem]">
                        <h3 className="p-2 px-3 text-lg text-center bg-neutral-800 rounded-md">{patientDetails.id}</h3>
                        <div className="flex gap-2 w-full">
                            <p className="p-2 px-3 bg-neutral-800 rounded-md text-xl w-full">{patientDetails.name}</p>
                            <p className="p-2 px-3 bg-neutral-800 rounded-md text-xl">{patientDetails.age}</p>
                        </div>
                        <p className="p-2 px-3 bg-red-400/40 rounded-md">{patientDetails.problems}</p>
                        <p className="p-2 px-3 bg-yellow-400/60 rounded-md">{patientDetails.history}</p>
                        <div className="">
                            {loading ? (
                                <p>Loading...</p>
                            ) : doctor ? (
                                <div className="w-full border border-neutral-700 bg-neutral-900 flex items-center px-2 py-2 gap-2 rounded-lg">
                                    <img src={doctor.photo} alt="doctor photo" className="rounded-full border-2 border-black w-[2.5rem]" />
                                    <div>
                                        <h3 className="text-xl tracking-tighter">{doctor.name}</h3>
                                        <p className="text-gray-500 text-sm">{doctor.specialization}, for {doctor.experience} years</p>
                                    </div>
                                </div>
                            ) : (
                                <p>Doctor not found</p>
                            )}
                        </div>
                    </div>
                    <button onClick={() => Router.push("/")} className="bg-green-100 hover:bg-green-300 text-black py-2 px-4 rounded-md w-[23rem] mb-10">
                        Done
                    </button>
                </div>
            ) : (
                <p>No patient details found.</p>
            )}
        </div>
    );
};

export default SuccessPage;
