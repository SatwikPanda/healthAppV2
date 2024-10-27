import { useState } from "react";
import axios from "axios";
import Placeholder from "./Placeholder";

axios.defaults.baseURL = 'http://localhost:5000';

const AddCard = ({ setCardOpen }: { setCardOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [photo, setPhoto] = useState(''); 
    const [experience, setExperience] = useState(0);
    const [image, setImage] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name && specialization && photo && experience) {
            try {
                const response = await axios.post('/doctors', [{
                    name: name,
                    specialization: specialization,
                    photo: photo,
                    experience: experience
                }]);
                console.log(response);
                setCardOpen(false);
            } catch (error) {
                console.error(error);
                alert('Failed to add doctor');
            }
        } else {
            alert('Please fill in all the fields');
        }
    }

    return(
        <div className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="border bg-black border-neutral-800 p-5 rounded-lg min-w-[25rem]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tighter">Add a Doctor</h1>
                        <h2 className="text-sm tracking-tight text-neutral-400">Register a doctor into the system</h2>
                    </div>

                    <div className="w-full flex text-center justfiy-center">
                        {image ? (
                            <img src={photo} alt="Doctor" onLoad={() => setImage(true)} onError={() => setImage(false)} className="w-[8rem] aspect-square object-cover rounded-full" />
                        ) : (
                            <Placeholder />
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="name" className="ml-1">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="" className="rounded-sm bg-black text-white outline-none border border-neutral-800 px-2 py-1" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Specialization" className="ml-1">Specialization</label>
                        <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} name="Specialization" id="" className="rounded-sm bg-black text-white outline-none border border-neutral-800 px-2 py-1" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Photo" className="ml-1">Photo URL</label>
                        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} name="Photo" id="" className="rounded-sm bg-black text-blue-300 outline-none border border-neutral-800 px-2 py-1" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Experience" className="ml-1">Experience</label>
                        <input type="number" value={experience} onChange={(e) => setExperience(parseInt(e.target.value))} name="Experience" id="" className="rounded-sm bg-black text-white outline-none border border-neutral-800 px-2 py-1" />
                    </div>
                    <div className="flex justify-between">
                        <button onClick={() => setCardOpen(false)} className="py-2 px-4 hover:bg-neutral-800 rounded-sm transition">
                            Cancel
                        </button>
                        <button type="submit" className="py-2 px-4 bg-white text-black hover:bg-neutral-400 rounded-sm transition">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCard;