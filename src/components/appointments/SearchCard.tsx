"use client";

import axios from 'axios';
import { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

axios.defaults.baseURL = 'http://localhost:5000';

const SearchCard = ({ doctorid, fetchTigger, onDoctorRemove }: { doctorid: string, fetchTigger: number, onDoctorRemove: (doctorId: string) => void }) => {
    const [doctor, setDoctor] = useState<any>(null); // Initialize as null since you are fetching one doctor
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState(true); // Default visibility is true

    // Fetch doctor when the component mounts or doctorid changes
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                setLoading(true); // Set loading to true when fetching starts
                const response = await axios.get(`/doctors/${doctorid}`);
                setDoctor(response.data);
                setVisible(true);
                setError(null); // Clear any previous errors
            } catch (error) {
                setError('Error fetching doctor');
                console.error('Error fetching doctor', error);
            } finally {
                setLoading(false); // Set loading to false once fetching is done
            }
        };

        if (doctorid) {
            fetchDoctor();
        }
    }, [doctorid, fetchTigger]); // Run this effect whenever doctorid changes


    // Toggle visibility on cross button click
    const handleClick = () => {
        setVisible(false); // Hide the card when cross icon is clicked
        onDoctorRemove("null");
    }

    if (!visible) {
        return null; // If not visible, return nothing (card is hidden)
    }

    return (
        <div key={doctorid} className={`px-2 py-2 absolute top-[-5px] left-[19.2%] bg-white border border-gray-400 rounded-full w-[62%] min-h-[4rem]`}>
            {loading ? (
                <p></p>
            ) : error ? (
                <p></p>
            ) : doctor ? (
                <div className='flex items-center justify-between gap-x-4 w-full'>
                    <div className='flex items-center flex-start gap-x-4'>
                        <img src={doctor.photo} alt="doctor-image" className='rounded-full h-14 border-2 border-black'/>
                        <div>
                            <h1 className="text-lg font-semibold tracking-tighter">{doctor.name}</h1>
                            <p className="text-sm text-gray-500">{doctor.specialization}</p>
                        </div>
                    </div>
                    <RxCross2 
                        className='cursor-pointer text-2xl mr-4 text-gray-400 hover:text-black transition' 
                        onClick={handleClick}
                    />
                </div>
            ) : (
                <p>No doctor found</p>
            )}
        </div>
    );
}

export default SearchCard;
