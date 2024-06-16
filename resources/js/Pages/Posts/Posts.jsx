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
import CreatePostModal from '@/Components/table/modals/CreatePostModal'; // Ensure this path is correct
import { Link, Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { router } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout';

export default function Post({ auth, laravelVersion, phpVersion }) {
    const { props } = usePage();
    const { entityName, subforum_name, ...rest } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    const openModal = () => {
        if (!auth.user) {
            // Redirect to the home page or any other page you want
            router.visit('/login', {
            })
        }
        setIsModalOpen(true);
    }
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const closeModal = () => setIsModalOpen(false);
    const excludedKeys = ['id', 'user_id', 'subforum_id', 'type', 'created_at', 'updated_at']
    const hasData = rest.data && rest.data.length > 0;
    return (
        <>
            <Head title="Welcome" />
            <main className="mt-20">
                <div className="welcome-message max-w-3xl mx-auto text-center mt-8">
                    <h1 className="text-4xl font-bold text-white mb-4">¡Comenta, o crea un tema!</h1>
                    <p className="text-lg text-white">Este es un espacio donde podras crear temas o responder, recorda siempre hacerlo con respeto para mantener un ambiente amigable :) </p>
                </div>
                <div style={{ width: '60vw' }} className="text-left mt-8">
                    <button
                        onClick={openModal}
                        className="bg-blue-900 text-white px-4 py-2 rounded-md shadow-sm"
                    >
                        Create Post
                    </button>
                </div>
                <div className="flex flex-col gap-y-[26px] h-screen mt-6">
                    <div>
                        {hasData ? (
                            <CustomTable
                                values={rest}
                                entityName={entityName}
                                excludedKeys={excludedKeys}
                            />
                        ) : (
                            <p>No hay subforos disponibles.</p>
                        )}
                    </div>
                </div>
            </main>
            {auth.user &&
                <CreatePostModal subforumId={rest.subforum_id} userId={auth.user.id} show={isModalOpen} onClose={closeModal} />
            }
        </>
    );
}

Post.layout = page => <PublicLayout children={page} title="Posts" />