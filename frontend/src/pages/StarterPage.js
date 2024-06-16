import React from 'react';
import { Link } from 'react-router-dom'; 
import cover from '../assets/cover.jpg'; 
import logo from '../assets/logo.png'; 

const StarterPage = () => {
  return (
    <div 
      className="bg-cover bg-center h-screen w-screen text-white flex items-center justify-center"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="text-center">
        <div className="flex flex-col items-center lg:text-[80px] text-[50px] font-bold mb-2">
          <img src={logo} alt="Logo" className="h-24 w-24" />
          <span className='mb-8'>Beta Launch</span>
        </div>
        <Link to="/calculator" className="ml-6 mt-8 px-6 py-3 w-full border border-white hover:border-collapse rounded-xl mr-4 bg-gradient-to-br from-blue-950 to bg-green-600 text-white hover:border-none">Salary Calculator</Link>
      </div>
    </div>
  );
};

export default StarterPage;
