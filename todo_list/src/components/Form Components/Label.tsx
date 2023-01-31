import React from 'react'

type Props = {
    htmlFor: string
    children: string
}

function Label({children, htmlFor}: Props) {
  return (
    <label htmlFor={htmlFor} className="text-white">{children}:</label>
  )
}

export default Label