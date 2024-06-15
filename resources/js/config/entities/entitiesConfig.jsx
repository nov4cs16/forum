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

import { commentConfig } from "./commentConfig";
import { forumConfig } from "./forumConfig"
import { postConfig } from "./postConfig";
import { subforumConfig } from "./subforumConfig";

export const entityConfig = (entityName) => {
    let config;

    switch (entityName) {
        case 'forums':
            config = forumConfig;
            break;
        case 'subforums':
            config = subforumConfig;
            break;
            case 'posts':
            config = postConfig;
            break;
            case 'comments':
            config = commentConfig;
            break;
        default:
            config = {};
            break;
    }

    return { config };
};
