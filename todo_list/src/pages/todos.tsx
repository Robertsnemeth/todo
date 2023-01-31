import React from 'react';
import Link from 'next/link'

type Props = {}

const todos = (props: Props) => {
  return (
    <main>
        <h1>todos</h1>
        <Link href="/">Home</Link>
    </main>
  )
}

export default todos