"use client";
import AnimatedCard from "@/components/landingPage/IdealAnimation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const Router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white p-3">
      <span className="text-4xl tracking-tight mb-5 font-bold text-center">
        <span>Welcome </span>
        <span className="text-green-400">User!</span>
      </span>
      <div className="flex">
        <div onClick={() => Router.push("/appointment")}>  
          <AnimatedCard initialScale={1} hoverScale={1.1} tapScale={0.95} icon={1} text="Appointments" />
        </div>
        <div onClick={() => Router.push("/admin")}>
          <AnimatedCard initialScale={1} hoverScale={1.1} tapScale={0.95} icon={3} text="Doctor" />
        </div>
      </div>
    </div>
  );
}
