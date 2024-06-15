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

import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export const useFetchEntities = (entityName) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/${entityName}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [entityName]);

    const createEntity = async (newData) => {
        try {
            const response =  router.post(`/api/${entityName}`, {
                data: newData, // Aquí se pasa directamente newData como datos
            });
            
            if (response && response.ok) {
                const createdData = response.data; // Utiliza response.data para obtener los datos
                setData((prevData) => [...prevData, createdData]);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setError('Failed to create data');
        } finally {
            setLoading(false);
        }
    };

    const createEntity22 = async (newData) => {
        try {
            
            const response = await fetch(`/api/${entityName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const createdData = await response.json();
            setData((prevData) => [...prevData, createdData]);
        } catch (error) {
            setError('Failed to create data');
        } finally {
            setLoading(false);
        }
    };

    const deleteEntity = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/${entityName}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setData((prevData) => prevData.filter(item => item.id !== id));
        } catch (error) {
            setError('Failed to delete data');
        } finally {
            setLoading(false);
        }
    };

    const editEntity = async (data) => {
        setLoading(true);
        setError(null);

        const id = data.id;

        try {
            const response = await fetch(`/api/${entityName}/${id}`, {
                method: 'PUT', // or 'PATCH' depending on your API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedData = await response.json();
            setData((prevData) => prevData.map(item => (item.id === id ? updatedData : item)));
        } catch (error) {
            setError('Failed to edit data');
        } finally {
            setLoading(false);
        }
    };

    return {
        setData,
        data,
        loading,
        error,
        deleteEntity,
        editEntity,
        createEntity
    };
};