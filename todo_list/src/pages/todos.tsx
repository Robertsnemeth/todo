import React from 'react';
import Link from 'next/link'
import { useAuth } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';

type Props = {}

const todos = (props: Props) => {

  const { logout } = useAuth();

  const router = useRouter();


  //TODO fix logout functionality
  async function handleLogout() {
    await logout
    router.push("/")
  }

  return (
    <main className="flex flex-col gap-2 items-center justify-center min-w-screen min-h-screen">
        <h1 className="text-indigo-800 text-3xl">todos</h1>
        <Link href="/" className="p-2 rounded text-white bg-indigo-900 hover:bg-indigo-800 focus:bg-white focus:text-indigo-900 transition-colors delay-100">Home</Link>
        <button className="p-2 rounded text-white bg-indigo-900 hover:bg-indigo-800 focus:bg-white focus:text-indigo-900 transition-colors delay-100" onClick={() => handleLogout()}>Logout</button>
    </main>
  )
}

export default todos