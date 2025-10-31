import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaChevronDown, FaBars } from 'react-icons/fa';
import { useState } from 'react';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        // Add your search logic here
        console.log('Searching for:', searchQuery);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <Navbar className="border-b-2 border-gray-300 dark:bg-black px-4">
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white ">
            <span className="px-2 py-1.5 rounded-xl" color="">LinkRead</span>
        </Link>
        
        {/* YouTube-style search bar */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:inline">
            <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full px-4 py-2 text-sm border border-gray-300  rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-gray-100 dark:bg-black border border-l-0 border-gray-300 dark:border-gray-300 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <AiOutlineSearch className="w-5 h-5 dark:text-white " />
                </button>
            </form>
        </div>
        <div className="flex items-center gap-4">
        
        {/* Mobile search button */}
        <Button className="w-16 h-12  md:hidden dark:text-white" color="grey" pill >
            <AiOutlineSearch className="w-6 h-6 dark:text-white" />
        </Button>
        
        {/* Desktop Navigation Links - visible on md and above */}
        <div className="hidden lg:flex items-center gap-4" >
            <Link to="/projects" className="text-gray-700 dark:text-white hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white px-4 py-2 rounded-full transition-colors">
                Projects
            </Link>
            <Link to="/dashboard" className="text-gray-700 dark:text-white hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white px-4 py-2 rounded-full transition-colors">
                Dashboard
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-white hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white px-4 py-2 rounded-full transition-colors">
                About
            </Link>
        </div>
        
        {/* Mobile/Tablet Dropdown Menu - visible below md */}
        <div className="lg:hidden">
            <div className="relative">
                <Button 
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 bg-white text-black dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800" 
                    pill
                >
                    <FaBars className="w-4 h-4" />
                </Button>
                
                {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                        <div className="py-2">
                            <Link 
                                to="/projects" 
                                className="block px-4 py-3 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Projects
                            </Link>
                            <Link 
                                to="/dashboard" 
                                className="block px-4 py-3 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/about" 
                                className="block px-4 py-3 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                About
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
        
        <Link to="/signin">
            <Button className="hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black mx-2 bg-white text-black dark:bg-black dark:text-white" pill >
                <ul>Log In</ul>
            </Button>
        </Link>
        </div>
        </Navbar>
    )
}