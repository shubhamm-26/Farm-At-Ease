import SignupForm from '@/components/SignupForm'
import React from 'react'

const Signup = () => {
  return (
    <div className='flex justify-around h-screen pt-16'>
<div className='w-[50%] flex flex-col justify-center items-start px-10'>
        <h1 className='text-5xl font-bold mb-16 text-primary '>Welcome to Farm at Ease</h1>
        <p className='text-lg mb-6'>
          Our machine learning model helps you predict diseases in fruits and vegetables simply by uploading an image.
          With just a click, you can enhance the health of your produce and ensure quality for your customers.
        </p>
        <p className='text-md text-gray-600 mb-4'>
          <strong>Benefits:</strong>
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li>Quick and accurate disease prediction</li>
          <li>User-friendly interface for easy navigation</li>
          <li>Get insights to improve produce quality</li>
        </ul>
        <p className='text-md text-gray-600'>
          Join us in ensuring healthier fruits and vegetables for everyone!
        </p>
      </div>
        <div className='flex justify-between items-center w-[38%]'>
            <SignupForm />
        </div>
    </div>
  )
}

export default Signup