import { useState } from "react";


const AddCard = ({ setCardOpen }: { setCardOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [inFocus, setInFocus] = useState(false);

    return(
        <div className="w-full h-full absolute top-0 left-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="border border-neutral-800 p-5 rounded-lg min-w-[25rem]">
                <form className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tighter">Add a Doctor</h1>
                        <h2 className="text-sm tracking-tight text-neutral-400">Register a doctor into the system</h2>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="ml-1">Name</label>
                        <input type="text" name="name" id="" className="rounded-sm bg-black text-white outline-none border border-neutral-800 px-2 py-1" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Specialization" className="ml-1">Specialization</label>
                        <input type="text" name="Specialization" id="" className="rounded-sm bg-black text-white outline-none border border-neutral-800 px-2 py-1" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Photo" className="ml-1">Photo URL</label>
                        <input type="text" name="Photo" id="" className="rounded-sm bg-black text-blue-300 outline-none border border-neutral-800 px-2 py-1" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Experience" className="ml-1">Experience</label>
                        <input type="number" name="Experience" id="" className="rounded-sm bg-black text-white outline-none border border-neutral-800 px-2 py-1" />
                    </div>
                    <div className="flex justify-between">
                        <button onClick={() => setCardOpen(false)} className="py-2 px-4 hover:bg-neutral-800 rounded-sm transition">
                            Cancel
                        </button>
                        <button className="py-2 px-4 bg-white text-black hover:bg-neutral-400 rounded-sm transition">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCard;