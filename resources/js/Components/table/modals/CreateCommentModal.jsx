
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
    
import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

const CreateCommentModal = ({ show, onClose, threadId, userId }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        body: '',
    });

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show]);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('commentt.store', { post_id: threadId,user_id: userId }), {
            onSuccess: () => {
                onClose();
            },
            onError: (error) => {
                console.error('Error creating comment:', error);
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Add a Comment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                            Comment
                        </label>
                        <textarea
                            name="body"
                            id="body"
                            value={data.body}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.body && <div className="text-red-500 mt-2">{errors.body}</div>}
                    </div>
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

export default CreateCommentModal;
