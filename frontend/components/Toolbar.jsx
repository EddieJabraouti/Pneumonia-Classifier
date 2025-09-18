import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

const Toolbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => { 
        setIsMobileMenuOpen(!isMobileMenuOpen); 
    };

  return (
    <header className="bg-white text-black border-b border-gray-800 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center md:hidden">
        <img src=''/>
            <h2 className="text-base font-semibold tracking-tight">
                <span className="text-base">
                    Clarity
                </span>
            </h2>
            <button className="text-black" onClick={toggleMobileMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox='0 0 24 24' stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    <nav className="flex-1 flex justify-center">
        <ul className="flex space-x-6 test-sm font-medium">
            <li>
                <Link to="/" className="underline hover:text-gray-400 transition">Home</Link>
            </li>
            <li>
                <Link to="/About" className="underline hover:text-gray-400 transition">About</Link>
            </li>
            <li>
                <Link to="/Technology" className="underline hover:text-gray-400 transition">Technology</Link>
            </li>
            <li>
                <Link to="/Model" className="underline hover:text-gray-400 transition">Model</Link>
            </li>
        </ul>
    </nav>
    </div>
    </header>
  )
}

export default Toolbar