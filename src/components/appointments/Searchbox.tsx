"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

import { CiSearch } from "react-icons/ci";
import CircularLoader from './SearchLoading';


// Set up a base URL for axios
axios.defaults.baseURL = 'http://localhost:5000';

const SearchBox = ({ onDoctorSelect }: { onDoctorSelect: (doctorId: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to fetch results from the API
  const fetchResults = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/doctors/search`, { params: { q: query } });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results', error);
    } finally {
      setLoading(false);
      setIsDropdownOpen(true);
    }
  };

  // Debounce searchTerm to reduce API calls while typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchResults(searchTerm);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Reset results when searchTerm changes
  useEffect(() => {
    setResults([]);
  }, [searchTerm]);

  const handleDoctorSelect = (doctorId: string) => {
    onDoctorSelect(doctorId);
    setSearchTerm(''); // Clear search term
    setResults([]); // Clear results
    setIsDropdownOpen(false);
  };

  return (
    <div className='w-[60%] relative'>
        <label htmlFor="search">
            <CiSearch className={`absolute top-4 left-4 text-2xl ${isFocused ? 'text-gray-700' : 'text-gray-400'}`}/>
        </label>
        <input
            name='search'
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search doctors..."
            className='px-12 py-4 w-full border rounded-full outline-gray-500 border-gray-400' 
        />
        {loading ? (
            <CircularLoader />
        ) : (
            <ul className={`absolute left-7 ${isDropdownOpen ? 'block' : 'hidden'}`}>
            {results.map((doctor) => (
                <li key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor.id)}
                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-b bg-white'
                >
                    <div className='flex items-center gap-x-4'>
                        <div><img src={doctor.photo} alt="doctor image" className="w-10 h-10 rounded-full" /></div>
                        <div className='flex flex-col'>
                          <span className='text-lg from-neutral-800'>{doctor.name}</span>
                          <span className='text-sm text-neutral-600'>{doctor.specialization}</span>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
        )}
    </div>
  );
};

export default SearchBox;
