"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle menu click and close the menu
  const handleMenuClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  return (
    <header className="fixed w-full bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/10 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold flex items-center gap-2 group">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-black tracking-wider group-hover:from-purple-500 group-hover:to-cyan-400 transition duration-300">
              NR
            </span>
            <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition duration-300 hidden sm:inline-block">
              | Nazneen Rizvi
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">About</Link>
            <Link href="#skills" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Skills</Link>
            <Link href="#projects" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Projects</Link>
            <Link href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors duration-200 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-slate-900/95 border border-cyan-500/20 rounded-2xl p-4 space-y-3 shadow-xl backdrop-blur-md">
            <Link href="#about" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 py-1" onClick={handleMenuClick}>About</Link>
            <Link href="#skills" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 py-1" onClick={handleMenuClick}>Skills</Link>
            <Link href="#projects" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 py-1" onClick={handleMenuClick}>Projects</Link>
            <Link href="#contact" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 py-1" onClick={handleMenuClick}>Contact</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
