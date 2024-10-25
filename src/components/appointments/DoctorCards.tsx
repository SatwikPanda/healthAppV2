import axios from "axios";
import { useEffect, useState } from "react";
import SearchLoading from "./SearchLoading";


axios.defaults.baseURL = 'http://localhost:5000';

const DoctorCards = ({ onDoctorSelect }:{ onDoctorSelect: (doctorId: string) => void }) => {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const handleDoctorSelect = (doctorId: string) => {
        onDoctorSelect(doctorId);
    };

    if(loading) {
        return <SearchLoading />
    }

    return (
        <div className="grid grid-cols-5 gap-4 p-4">
            {doctors.map((doctor) => (
                <div
                    key={doctor.id} // Ensure unique key for each doctor
                    className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => handleDoctorSelect(doctor.id)} // Handle doctor selection
                >
                    <img src={doctor.photo} alt={`${doctor.name}'s photo`} className="w-full h-32 object-cover rounded-md mb-2" />
                    <h3 className="text-lg font-bold">{doctor.name}</h3>
                    <p className="text-sm text-gray-500">{doctor.specialization}</p>
                </div>
            ))}
        </div>
    );
}

export default DoctorCards;