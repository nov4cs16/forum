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
import './Subforum.css'
import { useState } from 'react';

export default function Subforum({ auth, laravelVersion, phpVersion }) {
    const { props } = usePage();
    const { entityName, forum_name, ...rest } = props;
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const hasData = rest.data && rest.data.length > 0;
    return (
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-black/50 dark:bg-black dark:text-white/50">
                {/* <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />*/}

                <div className="lg:w-[60vw] relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full px-10">
                        <header className="flex flex-col items-center justify-between">
                            <div style={{}} className="flex flex-row justify-between gap-[120px] p-5 lg:justify-center ">
                                <div className="flex items-center space-x-1">
                                    <div className="bg-blue-900 text-white font-bold text-3xl p-2 rounded">
                                        SRD
                                    </div>
                                    <span className="text-2xl text-white font-semibold">forums</span>
                                </div>
                                <div style={{ justifySelf: 'end' }} className="lg:hidden flex items-center">
                                    {/* Icono de hamburguesa para mostrar/ocultar el menú */}
                                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <nav className={`lg:flex flex-1 justify-end ${menuOpen ? '' : 'hidden'} flex-col lg:flex-row lg:items-center lg:justify-center`}>
                                <Link
                                    to={route('home')}
                                    className="block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Inicio
                                </Link>
                                <Link
                                    to={route('dashboard')}
                                    className="block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Forums
                                </Link>
                                {auth.user ? (
                                    <Link
                                        to={route('dashboard')}
                                        className="block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            to={route('login')}
                                            className="block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            to={route('register')}
                                            className="block lg:inline-block lg:mt-0 text-white rounded-md px-3 py-2 text-sm lg:text-base ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <div className='mb-10'>
                                <h2 className="text-2xl font-bold text-white w-full rounded-md p-2" style={{width:"60vw"}}>{forum_name}</h2>
                            </div>
                            <div className="">
                                <div className="" style={{width:"60vw"}}>
                                    {hasData ? (
                                        <CustomTable
                                            values={rest}
                                            entityName={entityName}
                                            excludedKeys={["id", "forum_id","subforums", "created_at", "updated_at", "type"]}
                                        />
                                    ) : (
                                        <p>No hay subforos disponibles.</p>
                                    )}
                                </div>

                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70" style={{marginTop:'150px'}} >
                            <Link
                                style={{ marginLeft: '5px', fontSize: '15px' }}
                                href={route('serviceterms')}
                                className="underline text-sm text-white hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
