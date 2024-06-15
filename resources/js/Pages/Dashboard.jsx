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

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth }) {

    console.log('Dashboard.jsx ', auth)
    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-  xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
    const propiedadesDeseadas = ['id', 'name', 'edad'];

    const usersFiltrados = users.map(user =>
        Object.fromEntries(
            Object.entries(user).filter(([key]) => propiedadesDeseadas.includes(key))
        )
    );

    console.log(usersFiltrados);


    /*
    [
      { id: 1, name: 'sergio', edad: '20' },
      { id: 2, name: 'andrea', edad: '40' },
      { id: 3, name: 'braulio', edad: '50' }
    ]
    Resumen
    Desestructuración: [key] extrae solo la clave del par [clave, valor].
    Object.entries: Convierte el objeto en un array de pares [clave, valor].
    filter: Filtra esos pares para incluir solo las claves deseadas.
    Object.fromEntries: Convierte el array de pares filtrados de nuevo en un objeto.
    Este patrón es muy poderoso para manipular objetos en JavaScript y es ampliamente utilizado para crear 
    versiones reducidas de objetos con solo las propiedades necesarias.*/


    console.log(usersFiltrados);

    useEffect(() => {
        setUsuario(user)
    }, [])


    result = user;
    return (
        <div style={{ backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'col', justifyContent: 'center', width: '100vw', height: '100vh' }}>
            {/*{results.map((name, index) => (
                <div style={{ backgroundColor: 'grey', margin: '5px', padding: '10px' }} key={index}> {name} </div>
            ))}*/}
            {/*  {results.map((r, index) => (
                <div style={{ backgroundColor: 'grey', margin: '5px', padding: '10px' }} key={index}> {r.name} </div>
            ))}*/}
        </div>
    )

    {/*return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );*/}
}
