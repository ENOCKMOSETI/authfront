'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8080/protected', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setMessage(data.message))
      .catch(() => router.push('/login'))
  }, [router])

  const handleLogout = async () => {
    const res = await fetch('http://localhost:8080/logout', {
      method: 'DELETE',
      credentials: 'include',
    })
    if (res.ok) {
      router.push('/login');
    } else {
      const error = await res.json();
      alert(error.message || "Failed to logout!")
    }
  }

  return (
    <>
      <h1>{message || 'Loading...'}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
