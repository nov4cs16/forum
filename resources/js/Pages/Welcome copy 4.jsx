/*
MIT License

Copyright (c) 2020 Tailwind Labs
Copyright (c) Jonathan Reinink <jonathan@reinink.ca>
Copyright (c) Tailwind Labs, Inc.
Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors
Copyright 2013 Andrey Sitnik <andrey@sitnik.ru>
Copyright (c) 2014-present Matt Zabriskie & Collaborators
Copyright (c) Taylor Otwell
Copyright (c) Facebook, Inc. and its affiliates.
Copyright (c) Tighten Co. <hello@tighten.co>
Copyright (c) 2024 Sergio Omar Ruiz Dia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// For the full license, see LICENSE.md in the project root.

import CustomTable from '@/Components/table/CustomTable';
import { Link, Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import './Welcome.css'
import { useEffect, useRef, useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const { props } = usePage();
    const { entityName, ...rest } = props;
    const newsData = { data: [{ novedades: 'Nos encontramos agregando nuevas funcionalidades para que pueda disfrutar al máximo de nuestros foros!' },/*{ "": 'La página ' }*/] }
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
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-black/50 dark:bg-black dark:text-white/50">
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

                            <nav ref={menuRef} className={`lg:flex flex-1 justify-end ${menuOpen ? '' : 'hidden'} flex-col lg:flex-row lg:items-center lg:justify-center`}>
                                <Link
                                    href="/"
                                    className="text-center block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Inicio
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-center block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Contacto
                                </Link>
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="text-center block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            to={route('login')}
                                            className="text-center block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            to={route('register')}
                                            className="text-center block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-20">
                            <div className="welcome-message max-w-3xl mx-auto text-center mt-8">
                                <h1 className="text-4xl font-bold text-white mb-4">¡Bienvenido a SRD Forums!</h1>
                                <p className="text-lg text-white">Un lugar para compartir y conversar de lo que desees :)</p>
                            </div>

                            <div className="flex flex-col gap-y-[26px] h-screen mt-6">
                                <div className="mb-4">
                                    <CustomTable
                                        values={newsData}
                                        entityName={""}
                                        headColor={"bg-gradient-to-r from-orange-700 to-orange-400"}
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Foros</h2>
                                <div>
                                    <CustomTable
                                        values={rest}
                                        entityName={entityName}
                                        excludedKeys={["id", "subforums", "created_at", "updated_at", "type"]}
                                    />
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
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
        </>
    );
}
