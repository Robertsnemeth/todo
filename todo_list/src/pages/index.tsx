import Link from 'next/link';
import { db, auth } from 'firesbase/clientApp';
import { useEffect } from 'react';
import Login from '@/components/Login';
import { useAuth } from '@/contexts/UserContext';

export default function Home() {

  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <main className="flex flex-col gap-2 items-center justify-center min-w-screen min-h-screen">
      <h2 className='text-3xl text-indigo-800'>TODO LIST</h2>
      <Login/>
      {currentUser && <Link href="/todos">todos</Link>}
    </main>
  )
}
