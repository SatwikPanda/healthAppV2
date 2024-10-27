"use client";
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

const DoctorPage = () => {
    return (
        <div>
            This is the Doctors Login Page
        </div>
    );
}
 
export default DoctorPage;