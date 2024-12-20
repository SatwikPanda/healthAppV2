"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { FaAngleLeft } from "react-icons/fa";

axios.defaults.baseURL = 'http://localhost:5000';

const DoctorIdPage = () => {
    const router = useRouter();


    const { doctorid } = useParams();
    const [doctor, setDoctor] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Form state for appointment details
    const [patientName, setPatientName] = useState("");
    const [patientAge, setPatientAge] = useState("");
    const [patientHistory, setPatientHistory] = useState("");
    const [patientProblems, setPatientProblems] = useState("");
    const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

     // State to store the created appointment ID
     const [appointmentId, setAppointmentId] = useState<string | null>(null);

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

    // Handle form submission to create an appointment
    const handleAppointmentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormSubmitting(true);

        try {
            const response = await axios.post("/appointments", {
                doctor_id: doctorid,
                name: patientName,
                age: Number(patientAge),
                history: patientHistory,
                problems: patientProblems,
            });
            setAppointmentId(response.data.id);
            const patientId = response.data.id;
            router.push(`/appointment/${doctorid}/${patientId}`);
            alert(`Appointment created successfully for patient: ${response.data.name}`);
            // Clear form fields after submission
            setPatientName("");
            setPatientAge("");
            setPatientHistory("");
            setPatientProblems("");
        } catch (error) {
            console.error("Error creating appointment:", error);
            alert("Failed to create appointment");
        } finally {
            setFormSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-black items-center relative justify-center p-4 w-full">
            <div onClick={() => router.back()} className="absolute top-4 left-4 cursor-pointer text-white p-2 text-2xl hover:bg-neutral-700/50 rounded-md">
                <FaAngleLeft />
            </div>
            {/* Appointment Form */}
            <form onSubmit={handleAppointmentSubmit} className="w-full max-w-md shadow-[0_4px_200px_rgba(255,255,255,0.1)] mt-6 space-y-4 border border-neutral-800 p-4 rounded-md bg-black text-white">
                <h2 className="text-2xl font-semibold">Book an Appointment</h2>

                <div>
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

                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                        className="w-full border border-neutral-800 bg-black text-white px-2 py-1 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Age</label>
                    <input
                        type="number"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        required
                        className="w-full border border-neutral-800 bg-black text-white px-2 py-1 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Medical History</label>
                    <textarea
                        value={patientHistory}
                        onChange={(e) => setPatientHistory(e.target.value)}
                        className="w-full border border-neutral-800 bg-black text-white px-2 py-1 rounded resize-none h-[10vh]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Problems</label>
                    <textarea
                        value={patientProblems}
                        onChange={(e) => setPatientProblems(e.target.value)}
                        required
                        className="w-full border px-2 border-neutral-800 bg-black text-white py-1 rounded resize-none h-[20vh]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full bg-white text-black py-2 rounded hover:bg-neutral-500 transition"
                >
                    {formSubmitting ? "Submitting..." : "Book Appointment"}
                </button>
            </form>
        </div>
    );
};

export default DoctorIdPage;
