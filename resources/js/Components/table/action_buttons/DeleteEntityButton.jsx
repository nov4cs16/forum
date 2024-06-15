
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

import React from 'react'

import { useForm } from '@inertiajs/react';
import { entityConfig } from '@/config/entities/entitiesConfig';

function DeleteEntityButton({ onDelete, entity, entityName, setEntities }) {
    const { delete: destroy } = useForm();
    const { config } = entityConfig(entityName);
    const routes = config.inertiaRoutes;

    const handleDeleteEntity = () => {
        const entityId = entity.id;
        //const deleteRoute = route(`${entityName}.destroy`, entityId);

        destroy(route(routes.delete, { id: entity.id }), {
        //destroy(routes.delete, {
            onSuccess: () => {
           /*     if (onDelete) {
                    onDelete(entityId);
                }*/
              //  setEntities(prevEntities => prevEntities.filter(e => e.id !== entityId));
            },
            onError: (error) => {
                console.error('Error deleting entity:', error);
            }
        });
    };

    return (
        <button onClick={handleDeleteEntity}>
            <span className="material-symbols-outlined py-3 px-1 text-red-600">
                delete
            </span>
        </button>
    );
}

export default DeleteEntityButton;
