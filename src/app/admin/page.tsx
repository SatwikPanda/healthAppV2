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
        <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50">
            <form onSubmit={handleSubmit} className="flex flex-col items-center border-2 p-5 rounded bg-white">
                <h1 className="text-4xl tracking-tighter font-semibold py-2">Enter Admin Password</h1>
                <div className="w-full relative">
                    <input
                        type={eye ? "password" : "text"}
                        placeholder="Enter your admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-neutral-400 p-2 rounded-lg w-full"
                    />
                    <div className="absolute right-2 top-3 text-xl cursor-pointer">
                        {eye ? (
                            <FaRegEye onClick={() => setEye(false)} />
                        ) : (
                            <FaRegEyeSlash onClick={() => setEye(true)} />
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!password}
                    className="bg-black text-white p-2 rounded-lg mt-2 w-full hover:shadow-xl"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminAuth;
