import React from 'react'

type Props = {
    children: string,
    setState?: React.Dispatch<React.SetStateAction<boolean>>,
    state?: boolean,
}

function Button({children, setState, state}: Props) {

  const handleClick = () => {
    if(setState) 
    setState(true);
  }

  return (
    <button className="p-2 rounded text-white bg-indigo-900 hover:bg-indigo-800 focus:bg-white focus:text-indigo-900 transition-colors delay-75 w-full" onClick={() => handleClick()}>{children}</button>
  )
}

export default Button