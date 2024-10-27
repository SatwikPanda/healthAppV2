"use client";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    photo: string;
    experience: number;
    password: string;
}

const DoctorCard = ({ doctorId, setDoctorCardOpen }:{ doctorId: number, setDoctorCardOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (doctorId) {
            const fetchDoctor = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`/doctors/${doctorId}`);
                    setDoctor(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchDoctor();
        }
    }, [doctorId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (doctor) {
            setDoctor({
                ...doctor,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (doctor) {
            try {
                await axios.put(`/doctors/${doctor.id}`, {
                    name: doctor.name,
                    specialization: doctor.specialization,
                    photo: doctor.photo,
                    experience: doctor.experience,
                });
                alert("Doctor information updated successfully!");
                setDoctorCardOpen(false); // Close modal after updating
            } catch (error) {
                console.log("Error updating doctor information:", error);
            }
        }
    };

    if (loading || !doctor) {
        return <p>Loading...</p>;
    }

    return (
        <div className="w-full h-[100vh] absolute top-0 left-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="border bg-black border-neutral-800 p-7 rounded-lg min-w-fit">
                <form className="flex flex-col min-w-[25rem] gap-4 text-sm" onSubmit={handleSubmit}>
                    <div className="w-full text-center">
                        <h2 className="text-3xl text-white tracking-tight font-semibold">Edit Doctor</h2>
                        <h2 className="text-md text-neutral-400 mb-4 tracking-tight ">Edit the doctor information</h2>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <img src={doctor.photo} alt="doctor photo" className="aspect-square w-[8rem] rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white p-1">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={doctor.name}
                            onChange={handleInputChange}
                            className="p-2 bg-neutral-900 border border-neutral-800 rounded text-white"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white p-1">Specialization:</label>
                        <input
                            type="text"
                            name="specialization"
                            value={doctor.specialization}
                            onChange={handleInputChange}
                            className="p-2 bg-neutral-900 border border-neutral-800 rounded text-white"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white p-1">Experience (years):</label>
                        <input
                            type="number"
                            name="experience"
                            value={doctor.experience}
                            onChange={handleInputChange}
                            className="p-2 bg-neutral-900 border border-neutral-800 rounded text-white"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white p-1">Photo URL:</label>
                        <input
                            type="text"
                            name="photo"
                            value={doctor.photo}
                            onChange={handleInputChange}
                            className="p-2 bg-neutral-900 border border-neutral-800 rounded text-blue-400"
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <button
                            type="button"
                            onClick={() => setDoctorCardOpen(false)}
                            className=" hover:bg-red-700/30 hover:text-red-600 transition py-2 px-4 rounded w-fit h-fit text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-white text-black hover:bg-neutral-300/70 hover:text-black transition py-2 px-4 rounded w-fit h-fit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorCard;
