import React from 'react'

type Props = {
    children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className='h-full w-full flex flex-col items-center'>
        {children}
    </div>
  )
}

export default layout