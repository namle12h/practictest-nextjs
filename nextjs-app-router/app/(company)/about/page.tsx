"use client";

import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
   
    <button type="button" onClick={() => router.push("/")}>
       <h1>About</h1>
      Home
    </button>
  );
}