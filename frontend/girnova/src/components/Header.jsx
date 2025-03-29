import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="p-2 bg-blue-600 text-white">
            <nav className="flex justify-between items-center">
            
                <div className="px-4 h-12 w-18 overflow-hidden">
                    <img src="images/Logo.jpeg" className="h-full w-full object-cover scale-200" alt="Logo" />
                </div>

         
                <button 
                    className="lg:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={30} /> : <Menu size={30} />}
                </button>

                {/* Navigation Links */}
                <ul className={`lg:flex lg:space-x-6 text-sm absolute lg:static bg-black lg:bg-transparent w-full items-center lg:w-auto left-0 top-16 transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
                    <li className="py-2 lg:py-0 text-center lg:text-left">
                        <Link to="/" className="">Home</Link>
                    </li>
                    <li className="py-2 lg:py-0 text-center lg:text-left">
                        <Link to="/about" className="">About Us</Link>
                    </li>

                    <li className="py-2 lg:py-0 text-center lg:text-left">
                        <Link to="/contact" className="">Contact Us</Link>
                    </li>
                    <li className="py-2 lg:py-0 text-center lg:text-left">
                        <Link to ="/login"><button className="bg-black text-white px-2 py-2 rounded-lg">Login</button></Link>
                    </li>
                    <li className="py-2 lg:py-0 text-center lg:text-left">
                    <Link to ="/signup"><button className="border border-black px-2 py-2 rounded-lg text-white ">Sign Up</button></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
