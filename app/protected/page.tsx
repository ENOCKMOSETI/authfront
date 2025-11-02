'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('http://localhost:8080/protected', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setMessage(data.message))
      .catch(() => router.push('/login'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push('/login');
  }

  return (
    <>
      <h1>{message || 'Loading...'}</h1>
      <button onClick={handleLogout} >logout</button>
    </>
  );
}
