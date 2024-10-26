"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const AdminAuth = () => {
    const [eye, setEye] = useState(true);
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const adminPassword = "admin@123";

        if (password === adminPassword) {
            router.push("/admin/dashboard");
        } else {
            alert("Incorrect password");
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-[25rem] border border-neutral-800 p-5 rounded bg-black">
                <div>
                    <h1 className="text-4xl text-white tracking-tighter font-semibold">Password</h1>
                    <h2 className="text-sm tracking-tight text-neutral-400">Enter your admin password</h2>
                </div>
                
                <div>
                    <label htmlFor="password" className="ml-1">Password</label>
                    <div className="w-full relative">
                        <input
                            type={eye ? "password" : "text"}
                            placeholder="Enter your admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            className="border bg-black text-white border-neutral-800 p-2 rounded-lg w-full"
                        />
                        <div className="absolute right-2 top-3 text-white text-xl cursor-pointer">
                            {eye ? (
                                <FaRegEye onClick={() => setEye(false)} />
                            ) : (
                                <FaRegEyeSlash onClick={() => setEye(true)} />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!password}
                    className="bg-white text-black p-2 rounded-lg mt-2 w-full hover:bg-neutral-300 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminAuth;
