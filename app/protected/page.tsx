'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProtectedPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`${BASE_URL}/protected`, {
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setMessage(data.message))
      .catch(() => router.push('/login'))
  }, [router])

  const handleLogout = async () => {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
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
