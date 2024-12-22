import React from 'react';
import Upload from '@/components/dashboard/Upload';

type Props = {}

const page = (props: Props) => {
  return (
    <div className='p-5 w-full'>
        <div className='my-3 w-full flex justify-end'>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Upload />
        </div>
    </div>
  )
}

export default page