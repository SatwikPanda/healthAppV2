// app/appointment/[doctorid]/[patientId].tsx

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const SuccessPage = () => {
    const { patientId } = useParams(); // Get patientId from URL parameters
    const [patientDetails, setPatientDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <div className="min-h-screen flex flex-col items-center p-4 w-full bg-yellow-100">
            <h2 className="text-2xl font-semibold mt-6">Appointment Confirmation</h2>
            {loading ? (
                <p>Loading...</p>
            ) : patientDetails ? (
                <div className="w-full max-w-xl mt-6 space-y-4 border p-4 rounded shadow-lg bg-white">
                    <h3 className="text-xl">Patient ID: {patientDetails.id}</h3>
                    <p><strong>Name:</strong> {patientDetails.name}</p>
                    <p><strong>Age:</strong> {patientDetails.age}</p>
                    <p><strong>Medical History:</strong> {patientDetails.history}</p>
                    <p><strong>Problems:</strong> {patientDetails.problems}</p>
                    <p><strong>Doctor ID:</strong> {patientDetails.doctor_id}</p>
                </div>
            ) : (
                <p>No patient details found.</p>
            )}
        </div>
    );
};

export default SuccessPage;
