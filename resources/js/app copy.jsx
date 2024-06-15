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

import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import PublicLayout from './Layouts/PublicLayout';

const appName = import.meta.env.VITE_APP_NAME || 'SRDforums';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        if (name == 'AdminPanel')
            return resolvePageComponent(`./Pages/Admin/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        if (name == 'Subforum')
            return resolvePageComponent(`./Pages/Subforum/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        if (name == 'Posts')
            return resolvePageComponent(`./Pages/Posts/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        if (name == 'Thread')
            return resolvePageComponent(`./Pages/Thread/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        if (name == 'ServiceTerms')
            return resolvePageComponent(`./Pages/Legal/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        if (name == 'Contact')
            return resolvePageComponent(`./Pages/Contact/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        return resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
    }
    ,
    setup({ el, App, props }) {
        const root = createRoot(el);
        //console.log('props ',props.initialPage.props.auth)
        root.render(
        //    <LayoutTest>
        <PublicLayout auth={props.initialPage.props.auth}>
                <App {...props} />
                </PublicLayout>
          //  </LayoutTest>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

/*
En Tests.jsx tengo CLOJURE 

OJOOOOOOOOOOOOOOOOOOO NO OLVIDAR QUE AL CREAR UNA SUBCARPETA EN PAJES LA DEBO AGREGAR ACA
   resolve: (name) => {        
        if (name == 'AdminPanel')
            return resolvePageComponent(`./Pages/Admin/${name}.jsx`, import.meta.glob('./Pages.jsx'))
        if (name == 'Subforum')
            return resolvePageComponent(`./Pages/Subforum/${name}.jsx`, import.meta.glob('./Pages/*.jsx'))
        return resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**.jsx'))
    }
*/