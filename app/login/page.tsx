'use client';

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
       },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      router.push('/protected');
    } else {
      const error = await res.json();
      alert(error.message || "Failed to login!!")
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
