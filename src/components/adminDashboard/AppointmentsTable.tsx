"use client";
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

interface Appointment {
    id: number;
    name: string;
    age: number;
    history?: string;
    problems?: string;
    status: string;
    appointment_time: string;
}

const AppointmentsTable = ({ isAppointments }: { isAppointments: boolean }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    // Separate states for tracking status and appointment times
    const [statuses, setStatuses] = useState<{ [key: number]: string }>({});
    const [appointmentTimes, setAppointmentTimes] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        if (isAppointments) {
            const fetchAppointments = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get('/appointments');
                    setAppointments(response.data);

                    // Initialize statuses and appointment times
                    const initialStatuses = response.data.reduce((acc: any, appointment: Appointment) => {
                        acc[appointment.id] = appointment.status;
                        return acc;
                    }, {});

                    const initialAppointmentTimes = response.data.reduce((acc: any, appointment: Appointment) => {
                        acc[appointment.id] = new Date(appointment.appointment_time).toISOString().slice(0, 16);
                        return acc;
                    }, {});

                    setStatuses(initialStatuses);
                    setAppointmentTimes(initialAppointmentTimes);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
            fetchAppointments();
        }
    }, [isAppointments]);

    const updateAppointment = async (id: number) => {
        try {
            const response = await axios.patch(`/appointments/${id}`, {
                status: statuses[id],
                time_of_appointment: appointmentTimes[id],
            });
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === id ? response.data : appointment
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full overflow-auto">
            {isAppointments && appointments.length > 0 ? (
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-neutral-800">
                            <th className="p-3">Sl no</th>
                            <th className="p-3">Patient Name</th>
                            <th className="p-3">Age</th>
                            <th className="p-3">History</th>
                            <th className="p-3">Problems</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Appointment Time</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment.id} className="border-b border-neutral-800">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{appointment.name}</td>
                                <td className="p-3">{appointment.age}</td>
                                <td className="p-3">{appointment.history || 'N/A'}</td>
                                <td className="p-3">{appointment.problems || 'N/A'}</td>
                                <td className="p-3">
                                    <select
                                        value={statuses[appointment.id]}
                                        onChange={(e) => setStatuses((prev) => ({
                                            ...prev,
                                            [appointment.id]: e.target.value
                                        }))}
                                        className={`bg-neutral-900 border border-neutral-800 p-1 rounded text-white ${statuses[appointment.id] === 'Rejected' ? 'text-red-500' : statuses[appointment.id] === 'Accepted' ? 'text-green-500' : 'text-yellow-500'}`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                                <td className="p-3">
                                    <input
                                        type="datetime-local"
                                        value={appointmentTimes[appointment.id]}
                                        onChange={(e) => setAppointmentTimes((prev) => ({
                                            ...prev,
                                            [appointment.id]: e.target.value
                                        }))}
                                        className={`bg-neutral-900 border border-neutral-800 p-1 rounded text-white`}
                                    />
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => updateAppointment(appointment.id)}
                                        className="text-blue-500 border border-black px-2 py-1 hover:bg-blue-800/50 hover:border-blue-500/50 rounded-sm transition"
                                    >
                                        Save
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-10">No appointments found.</p>
            )}
        </div>
    );
};

export default AppointmentsTable;
