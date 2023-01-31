import Link from 'next/link';
import firebase from 'firesbase/clientApp';
import { useEffect } from 'react';

export default function Home() {

firebase

  return (
    <>
      <h2 className='text-3xl'>hello world</h2>
      <Link href="/todos">todos</Link>
    </>
  )
}
