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
import CreateCommentModal from '@/Components/table/modals/CreateCommentModal';
import { Link, Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { router } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout';

export default function Thread({ auth, laravelVersion, phpVersion }) {
    const { props } = usePage();
    const { entityName, data } = props;
    const { title, body, user, comments } = data;

    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const openModal = () =>{
        if (!auth.user) {
            // Redirect to the home page or any other page you want
            router.visit('/login', {
            })
        }else
         setIsModalOpen(true);}
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Head title="Thread">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
          
                        <main className="mt-20 space-y-8">
                            <h1 className="text-4xl font-bold text-center text-white">
                                {title}
                            </h1>
                            <p className="text-center text-white">
                                Posted by {user.name} on {new Date(data.created_at).toLocaleDateString()}
                            </p>
                            <article className="bg-white rounded-lg shadow-md p-6">
                                <div className="prose">
                                    <div className="flex items-center mb-4">
                                        <p className="font-semibold text-gray-800 flex items-center">
                                            <span className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full mr-2">
                                                <span className="material-icons">person</span>
                                            </span>
                                            <span>{user.name}</span>
                                        </p>
                                    </div>
                                    <p className="">
                                        {body}
                                    </p>
                                </div>
                            </article>


                            <section>
                                {comments.length > 2 &&
                                    <div className="mt-8 text-left mb-8">
                                        <button
                                            onClick={openModal}
                                            className="bg-blue-950 text-white px-4 py-2 rounded-md shadow-sm"
                                        >
                                            Responder
                                        </button>
                                    </div>
                                }
                                  <div className="mt-8 text-left mb-8">
                                        <button
                                            onClick={openModal}
                                            className="bg-blue-950 text-white px-4 py-2 rounded-md shadow-sm"
                                        >
                                            Responder
                                        </button>
                                    </div>
                                <h2 className="text-2xl text-white font-semibold mb-4">Comments</h2>
                                <div className="space-y-4">
                                    {comments.map(comment => (
                                        <div key={comment.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
                                            <p className="font-semibold text-gray-800 flex items-center">
                                                <span className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full mr-2">
                                                    <span className="material-icons">person</span>
                                                </span>
                                                <span>{comment.user.name}</span>
                                            </p>
                                            <p className="text-gray-600">
                                                {comment.body}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(comment.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </section>
                        </main>

                        <CreateCommentModal userId={auth.user ? auth.user.id : null} show={isModalOpen} onClose={closeModal} threadId={data.id} />


                
        </>
    );
}


Thread.layout = page => <PublicLayout  children={page} title="Thread" />