
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

import Modal from '@/Components/Modal';
import { entityConfig } from '@/config/entities/entitiesConfig';
import React, {  useEffect } from 'react';

import {  useForm } from '@inertiajs/react';




const CreateEntityModal = ({ show, onClose, initialData, entityName }) => {
    const { config } = entityConfig(entityName);
    const customInput = config.customInputs;
    const emptyEntity = config.emptyEntity;
    const routes = config.inertiaRoutes;

    const { data, setData, post, processing, errors } = useForm({
        emptyEntity
    });

    useEffect(() => {
        setData(emptyEntity);
    }, [initialData]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       // post(route(`/api/${entityName}`), {
        
        post(route(routes.post), {
            onSuccess: () => {
                onClose();
            },
            onError: (error) => {
                console.error('Error creating entity:', error);
            }
        });
    };

    const renderInput = (key, value) => {

        const customField = customInput.find(input => input.name === key);

        if (customField) {
            if (customField.type === 'textarea') {
                return (
                    <textarea
                        name={key}
                        id={key}
                        value={value}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                );
            }
            if (customField.type === 'select') {

                return (
                    <select
                        name={key}
                        id={key}
                        value={value} // This is where the warning is likely originating from
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>Select an option</option>
                        {initialData[customField.options].map(option => (
                            <option key={option[customField.id]} value={option[customField.id]}>
                                {option[customField.key]}
                            </option>
                        ))}
                    </select>
                );
            }
        }

        if (Array.isArray(value)) {
            return (
                <input
                    type="text"
                    name={key}
                    id={key}
                    value={value.join(', ')}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            );
        } else if (typeof value === 'object' && value !== null) {
            return (
                <textarea
                    name={key}
                    id={key}
                    value={JSON.stringify(value, null, 2)}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            );
        } else {
            return (
                <input
                    type="text"
                    name={key}
                    id={key}
                    value={value}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            );
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Create Entity</h2>
                <form onSubmit={handleSubmit}>
                    {Object.keys(data).map((key) => {
                        const customField = customInput.find(input => input.name === key);
                        if (customField && customField.type === 'exclude') {
                            return null; // No renderizar nada si el tipo es "exclude"
                        }
                        return (
                            <div key={key} className="mb-4">
                                <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                                {renderInput(key, data[key])}
                            </div>
                        );
                    })}

                    {errors.general && <div className="text-red-500 mt-2">{errors.general}</div>}

                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CreateEntityModal;






/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DynamicForm = ({ properties, onSubmit }) => {
  const initialState = {};
  properties.forEach(property => {
    initialState[property.name] = '';
  });

  const [formData, setFormData] = useState(initialState);
  const [selectOptions, setSelectOptions] = useState({});

  useEffect(() => {
    // Realizar llamadas a la API para obtener datos para campos select, si es necesario
    properties.forEach(property => {
      if (property.type === 'select' && property.apiEndpoint) {
        axios.get(property.apiEndpoint)
          .then(response => {
            setSelectOptions(prevOptions => ({
              ...prevOptions,
              [property.name]: response.data
            }));
          })
          .catch(error => {
            console.error(`Error fetching data for ${property.name} field:`, error);
          });
      }
    });
  }, [properties]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {properties.map(property => (
        <div key={property.name}>
          <label>
            {property.label}:
            {property.type === 'select' ? (
              <select name={property.name} value={formData[property.name]} onChange={handleChange}>
                <option value="">Select {property.label}</option>
                {selectOptions[property.name] && selectOptions[property.name].map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            ) : (
              <input type={property.type} name={property.name} value={formData[property.name]} onChange={handleChange} />
            )}
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
*/