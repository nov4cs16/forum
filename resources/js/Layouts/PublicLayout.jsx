import { Link, usePage } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import { router } from '@inertiajs/react'
import NavLink from '@/Components/NavLink';

function PublicLayout({ children }) {
    const { auth } = usePage().props

    const [menuOpen, setMenuOpen] = useState(false);

    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) &&
            hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-black/50">
            <div className="mt-10 lg:w-[60vw] relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                <div className="relative w-full px-2 sm:px-10">
                    <header className="flex flex-col items-center justify-between">
                        <div className="flex flex-row justify-between gap-[25vw] sm:gap-[45vw] md:gap-[55vw] p-5 lg:justify-center ">
                            <div className="flex items-center space-x-1">
                                <div className="bg-blue-900 text-white font-bold text-3xl p-2 rounded">
                                    SRD
                                </div>
                                <span className="text-2xl text-white font-semibold">forums</span>
                            </div>
                            <div style={{ justifySelf: 'end' }} className="lg:hidden flex items-center">
                                <button onClick={toggleMenu} ref={hamburgerRef} className="text-white focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <nav ref={menuRef} className={`w-[60vw] lg:flex flex-1 justify-end ${menuOpen ? 'menu-open' : 'hidden'} flex-col lg:flex-row lg:items-center lg:justify-center space-y-4 lg:space-y-0 lg:space-x-4`}>

                            <Link
                                href="/"
                                className="border lg:border-none text-center block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Inicio
                            </Link>
                            <Link
                               href="/contact"                                
                                className=" border lg:border-none text-center block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Contacto
                            </Link>
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                  
                                    className="border lg:border-none text-center block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        /* to={route('login')}*/
                                        href="/login"
                                        className="border lg:border-none text-center block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Ingresar
                                    </Link>
                                    <Link
                                        /*to={route('register')}*/
                                        href="/register"
                                        className="border lg:border-none text-center block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>
                    {children}
                    <footer className="py-16 text-center text-sm text-black">
                            <Link
                                href={route('serviceterms')}
                                className="ml-5 text-sm text-white underline hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Términos y Condiciones
                            </Link>
                        </footer>
                </div>
            </div>
        </div>
    )
}

export default PublicLayout