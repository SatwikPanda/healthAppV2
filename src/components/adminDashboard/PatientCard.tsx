"use client";
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

const PatientCard = ({ PatientId, setIsPatient }:{ PatientId: string, setIsPatient: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [loading, setLoading] = useState(true);
    const [appointment, setAppointment] = useState({
        doctor_id: '',
        name: '',
        age: 0,
        history: '',
        problems: '',
        status: '',
        appointment_time: ''
    });
    const [doctor, setDoctor] = useState({
        name: '',
        specialization: '',
        photo: '',
        experience: 0
    });

    // Fetch appointment details when the component mounts
    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            try {
                const response = await axios.get(`/appointments/${PatientId}`);
                setAppointment(response.data);  // Set the appointment details
            } catch (error) {
                console.error("Failed to fetch appointment details", error);
                alert("Failed to load appointment details.");
            }
        };

        fetchAppointmentDetails();
    }, [PatientId]);

    // Fetch doctor details when appointment data (specifically doctor_id) is available
    useEffect(() => {
        const fetchDoctorDetails = async () => {
            if (appointment.doctor_id) {  // Ensure doctor_id is available
                try {
                    setLoading(true);
                    const response = await axios.get(`/doctors/${appointment.doctor_id}`);
                    setDoctor(response.data); // Set the doctor details
                } catch (error) {
                    console.error("Failed to fetch doctor details", error);
                    alert("Failed to load doctor details.");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchDoctorDetails();
    }, [appointment.doctor_id]);  // Run only when doctor_id is set

    return (
        <div className="w-full h-full absolute top-0 left-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="border bg-black border-neutral-800 p-7 rounded-lg min-w-fit">
                <form className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tighter">{appointment.name}</h1>
                            <h2 className="text-sm tracking-tight text-neutral-400">Appointment details</h2>
                        </div>
                        <div className="text-4xl flex justify-center items-center font-semibold bg-white aspect-square p-2 rounded-md text-black h-full">
                            <span>{appointment.age}</span>
                        </div>
                    </div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                    <div className="flex gap-2 p-2 border border-neutral-800 rounded-md">
                        <img src={doctor.photo} alt="doctor photo" className="aspect-square w-14 rounded-md"/>
                        <div className="flex flex-col mr-3">
                            <span className="text-2xl font-semibold tracking-tighter">{doctor.name}</span>
                            <span className="text-sm tracking-tight text-neutral-400">{doctor.specialization} for {doctor.experience} years</span>
                        </div>
                    </div>
                    )}
                    <div>
                        <span className="text-sm ml-1">Problems</span>
                        <div className="max-w-[40rem] p-2 border border-neutral-800 rounded-md">
                            <span>{appointment.problems}</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-sm ml-1">History</span>
                        <div className="max-w-[40rem] p-2 border border-neutral-800 rounded-md">
                            <span>{appointment.history}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className={`p-2 border border-neutral-800 rounded-md ${ appointment.status ==='Accepted' ? 'bg-green-500/20 text-green-500' : ( appointment.status === 'Rejected' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500')}`}>{appointment.status}</div>
                        { appointment.appointment_time ? <div className={`p-2 border border-neutral-800 rounded-md`}>{appointment.appointment_time}</div> : null }
                    </div>
                    
                    <div className="flex justify-start">
                        <button onClick={() => setIsPatient(false)} className="py-2 bg-white text-black px-4 hover:bg-neutral-400 rounded-sm transition">
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PatientCard;
