import Link from 'next/link';
import { db, auth } from 'firesbase/clientApp';
import { useEffect } from 'react';
import Login from '@/components/Login';

export default function Home() {

  return (
    <>
      <h2 className='text-3xl text-red-400'>hello world</h2>
      <Login/>
      <Link href="/todos">todos</Link>
    </>
  )
}
