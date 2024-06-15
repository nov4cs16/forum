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

import React, { useState } from 'react';
import DeleteEntityButton from './action_buttons/DeleteEntityButton';
import EditEntityButton from './action_buttons/EditEntityButton';
import Modal from '../Modal';
import EditEntityModal from './modals/EditEntityModal';
import { useFetchEntities } from '@/hooks/useFetchEntities';
import CreateEntityModal from './modals/CreateEntityModal';
import { entityConfig } from '@/config/entities/entitiesConfig';
import { Link } from '@inertiajs/react';

function CustomTable({
    values,
    setValues,
    entityName,
    showActionColumns,
    editEntity,
    deleteEntity,
    createEntity,
    excludedKeys = [],
    headColor= "bg-blue-900",
    showCheckboxes = false // Nueva prop con valor por defecto true
}) {
    const { data } = values

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false)
    const { config } = entityConfig(entityName)
    //const excludeKeys = config.excludeKeys

    const excludeKeys = config && excludedKeys.length === 0 ? config.excludeKeys : excludedKeys;
    const routes = config.inertiaRoutes

    // Obtener las claves del primer objeto en el arreglo para generar las cabeceras, excluyendo las especificadas
    const headers = data.length > 0 && excludeKeys
        ? Object.keys(data[0]).filter(key => !excludeKeys.includes(key))
        // : [];
        : Object.keys(data[0]).filter(key => key != 'type')

    // Función para renderizar valores, manejando objetos y arrays anidados
    const renderValue = (value) => {
        if (Array.isArray(value)) {
            // Si es un array de objetos con una clave 'name', convertir a una lista de nombres
            if (value.length > 0 && typeof value[0] === 'object' && 'name' in value[0]) {
                return value.map(item => item.name).join(', ');
            }
            // Si es un array simple, unir los elementos por comas
            return value.join(', ');
        } else if (typeof value === 'object' && value !== null) {
            // Convertir objetos a JSON string para representarlos
            return JSON.stringify(value);
        }
        // Si es otro tipo de valor, devolverlo tal cual
        return value;
    };

    // Manejar la selección de un checkbox individual
    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // Manejar la selección del checkbox de encabezado (seleccionar/deseleccionar todos)
    const handleSelectAllChange = () => {
        if (selectedIds.length === data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(data.map(value => value.id));
        }
    };

    // Crear una nueva entidad
    const handleCreateEntity = () => {
        // Aquí puedes implementar la lógica para crear una nueva entidad
        setCreateModalOpen(true)
    };

    // Eliminar las entidades seleccionadas
    const handleDeleteSelectedEntities = async () => {
        //  setLoading(true);
        //setError(null);
        try {
            // Iterar sobre cada ID seleccionado y eliminar la entidad correspondiente
            await Promise.all(selectedIds.map(async id => {
                await deleteEntity(id);
            }));
        } catch (error) {
            setError('Failed to delete selected entities');
        } finally {
            //  setLoading(false);
        }
    };

    if (!values) {
        return <div>Loading...</div>; // or any other fallback UI
    }
    return (
        <>
            <div className="flex justify-between mb-4 ">
                {showActionColumns &&
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCreateEntity}
                    >
                        Crear
                    </button>
                }
                {selectedIds.length > 0 && (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleDeleteSelectedEntities}
                    >
                        Eliminar seleccionados
                    </button>
                )}
            </div>
            <div>
                <table className="dark:bg-slate-800 min-w-full bg-white border-blue-900 rounded-lg overflow-hidden shadow-lg">
                    <thead className={`${headColor} border-blue-950`}>
                        <tr>
                            {showCheckboxes && (
                                <th className="py-2 px-4 text-left text-sm font-semibold text-white">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.length === data.length}
                                        onChange={handleSelectAllChange}
                                    />
                                </th>
                            )}
                            {headers.map((header, index) => (
                                <th key={index} className="py-2 px-4 text-left text-sm font-semibold text-white">
                                    {header.charAt(0).toUpperCase() + header.slice(1)}
                                </th>
                            ))}
                            {showActionColumns &&
                                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                                    Acciones
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((value, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-blue-300 hover:bg-blue-200 bg-blue-100">
                                {showCheckboxes && (
                                    <td className="py-3 px-4 text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(value.id)}
                                            onChange={() => handleCheckboxChange(value.id)}
                                        />
                                    </td>
                                )}
                                {headers.map((header, colIndex) => (
                                    <td key={colIndex} className="h-[80px] py-3 px-4 text-blue-950 w-auto lg:max-w-52">
                                        {value.type === "link" ? (
                                            <Link style={{ display: 'block', width: '100%' }} href={route(routes.show, { id: value.id })}>
                                                {renderValue(value[header])}
                                            </Link>
                                        ) : (
                                            renderValue(value[header])
                                        )}
                                    </td>
                                ))}
                                {showActionColumns && (
                                    <td key="actions" className="py-3 px-2 text-gray-700">
                                        <DeleteEntityButton onDelete={deleteEntity} setEntities={setValues} entity={value} entityName={entityName} />
                                        <EditEntityButton entities={data} setSelectedEntity={setSelectedEntity} setIsEditModalOpen={setIsEditModalOpen} setEntities={setValues} entity={value} entityName={entityName} />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showActionColumns &&
                <>
                    <EditEntityModal
                        show={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        initialData={{ ...values, ...selectedEntity }}
                        onSave={editEntity}
                        customInput={[{ name: 'description', type: 'textarea' }]}
                        entityName={entityName}
                    />
                    <CreateEntityModal
                        show={isCreateModalOpen}
                        onClose={() => setCreateModalOpen(false)}
                        onSave={createEntity}
                        entityName={entityName}
                        initialData={values}
                    />
                </>
            }
        </>
    );
    
}
export default CustomTable;


{/*<td key={colIndex} className="py-3 px-4 text-gray-700 w-fit min-w-52">*/}