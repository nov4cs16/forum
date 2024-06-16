<?php

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
Copyright (c) 2024 Sergio RD

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

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Subforum;
use App\Models\Forum;

class AdminPanelController extends Controller
{
    public function index()
    {
        // Puedes pasar datos a la vista si es necesario
        return Inertia::render('AdminPanel',[
            'name'=>'index'
        ]);
    }
    public function index_forums()
    {
        $forums = Forum::with('subforums')->get();
        //return response()->json($forums);
        // Puedes pasar datos a la vista si es necesario
        return Inertia::render('AdminPanel',[
            'data'=>$forums,
            'entityName' => 'forums' 
        ]);
    }
    public function index_subforums()
    {
        // Obtener todos los subforos con sus respectivos foros asociados
        $subforums = Subforum::with('forum')->get();
        
        // Obtener todos los foros
        $forums = Forum::all();
        
        // Devolver la respuesta JSON con Inertia
        return Inertia::render('AdminPanel', [
            'forums' => $forums,
            'data' => $subforums,
            'entityName' => 'subforums' // Aquí agregamos 'entityName' al array de datos
        ]);
    }
    

}