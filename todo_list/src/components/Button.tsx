import React from 'react'

type Props = {
    children: string
}

function Button({children}: Props) {
  return (
    <button className="p-2 rounded text-white bg-purple-900 hover:bg-purple-800">{children}</button>
  )
}

export default Button