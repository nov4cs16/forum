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
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useFetchEntities } from '@/hooks/useFetchEntities';
import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { router } from '@inertiajs/react'


export default function AdminPanel({ auth }) {

    const { props } = usePage();
    const { entityName, ...rest } = props;

    const {
        data,
        setData,
        loading,
        setEntityName,
        // entityName,
        editEntity,
        deleteEntity,
        createEntity
    } = useFetchEntities(entityName);


    useEffect(() => {
        // Check if the user is not an admin, then redirect to another page
        if (!auth.roles.includes('admin')) {
            // Redirect to the home page or any other page you want
            router.visit('/', {
            })
        }
    }, [auth.roles]);

    const handleClick = (e) => {
        setEntityName(e.target.innerText)
    }

    if (loading || !auth.roles.includes('admin')) {
        // Si el usuario es administrador o la página aún está cargando, no renderices nada
        return null;
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin panel</h2>}
        >
            <Head title="Admin panel" />
            <button onClick={handleClick}>users</button>
            <Link
                href={route('admin.panel.subforums')}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
                subforums
            </Link>
            <Link
                href={route('admin.panel.forums')}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
                forums
            </Link>

            <div className="py-12 h-screen">
                <div className="max-w-auto mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <CustomTable
                                values={rest}
                                setValues={setData}
                                showActionColumns={true}
                                entityName={entityName}
                                editEntity={editEntity}
                                deleteEntity={deleteEntity}
                                createEntity={createEntity}
                                showCheckboxes={true}
                            //   excludeKeys={['name']}
                            /*excludeKeys={excludeKeys}*/
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

