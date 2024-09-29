"use client";

import React, { useState,useEffect } from 'react';
import Logo from '../assets/logo.svg'
import Image from 'next/image';
import Link from 'next/link';
import NavCard from './NavCard';
import Apple from '../assets/Apple.jpg';
import Peach from '../assets/Peach.jpg';
import Grapes from '../assets/Grapes.jpg';
import Corn from '../assets/Corn.jpg';
import Pepper from '../assets/Pepper.jpg';
import Tomato from '../assets/Tomato.jpg';
import Potato from '../assets/Potato.jpg';
import { useRouter } from 'next/navigation';


const fruits = [
    {
        name: 'Apple',
        description:'Predict Deseased for Apple',
        image: Apple
    },
    {
        name:'Peach',
        description:'Predict Deseased for Peach',
        image:Peach
    },
    {
        name:'Grapes',
        description:'Predict Deseased for Grapes',
        image:Grapes
    }
];

const vegetables = [
    {
        name: 'Corn',
        description:'Predict Deseased for Corn',
        image: Corn
    },
    {
        name:'Pepper',
        description:'Predict Deseased for Pepper',
        image:Pepper
    },
    {
        name:'Tomato',
        description:'Predict Deseased for Tomato',
        image:Tomato
    },
    {
        name:'Potato',
        description:'Predict Deseased for Potato',
        image:Potato
    }
];

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const router = useRouter();
  const[logedIn,setLogedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogedIn(true);
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem('token');
    setLogedIn(false);
    router.push('/');
  };

  return (
    <nav 
    className="absolute z-10 w-full" 
    onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="flex items-center justify-between p-4 bg-primary text-white">
        <Link 
        className="flex items-center space-x-2"
        href="/"
        >
            <Image src={Logo} alt="Logo" width={30} height={30} />
          <span className="text-2xl font-bold">Farm At Ease</span>
        </Link>
        
        <div className="flex items-center space-x-4 font-bold text-lg">
          <Link
            className="relative"
            onMouseEnter={() => setHoveredItem('fruits')}
            href="/fruits"
          >
            <button className={`flex items-center text-white hover:text-secondary `}>
              Fruits 
            </button>
          </Link>
          <Link
            className="relative"
            onMouseEnter={() => setHoveredItem('vegetables')}
            href="/vegetables"
          >
            <button className="flex items-center text-white hover:text-secondary">
              Vegetables
            </button>
          </Link>
        </div>
        
        
          {logedIn ? (
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 bg-white text-primary rounded-lg text-md hover:bg-secondary hover:text-white" onClick={Logout}>Logout</button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
            <Link className="px-2 py-1 bg-white text-primary rounded-lg text-md hover:bg-secondary hover:text-white"
            href="/auth/login"
          >Login</Link>
          <Link className="px-2 py-1 bg-white text-primary rounded-lg text-md hover:bg-secondary hover:text-white"
            href="/auth/signup" 
          >Sign Up</Link>
          </div>
          )}
        
      </div>
      
      {hoveredItem && (
        <div className="absolute left-0 right-0 p-4 bg-white shadow-md">
          <div className="flex justify-center space-x-4">
            {(hoveredItem === 'fruits' ? fruits : vegetables).map((item) => (
              <Link 
              key={item} 
              className="px-3 py-1"
                href={`/${hoveredItem.toLowerCase()}/${item.name.toLowerCase()}`}
              >
                <NavCard product={item} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;