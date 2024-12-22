import React from 'react'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Clarity AI | Sign In",
  description: "Sign in to Clarity AI",
};

type Props = {
    children: React.ReactNode
}

const layout = (props: Props) => {
  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <div className='flex justify-between w-full p-5'>
        <h1 className='text-4xl font-bold'>Clarity AI</h1>
      </div>
        <div className='h-full flex flex-col justify-center'>{props.children}</div>
    </div>
  )
}

export default layout