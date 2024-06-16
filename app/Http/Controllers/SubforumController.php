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

use App\Models\Subforum;
use App\Models\Forum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubforumController extends Controller
{
    public function index()
    {
        $subforums = Subforum::with(['forum', 'posts'])->get();
        $forums = Forum::all();

        // Agregar los foros a la colección de subforos
        foreach ($subforums as $subforum) {
            $subforum->forums = $forums;
        }

        // Devolver la respuesta JSON
        return response()->json($subforums);
    }
    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */

    public function create(): Response
    {
        return Inertia::render('AdminPanel', [
            'status' => session('status'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'forum_id' => 'required|exists:forums,id',
            'name' => 'required',
            'description' => 'required'
        ]);

        $forum = Forum::find($request->forum_id);

        // Crear el subforo con los datos proporcionados en la solicitud
        $subforum = Subforum::create([
            'forum_id' => $request->forum_id,
            'name' => $request->name,
            'description' => $request->description
        ]);

        //Cargar el foro correspondiente al subforo
        $subforum->load('forum');
        $forum->subforums()->save($subforum);
        $subforums = Subforum::with('forum')->get();
        $forums = Forum::all();

        return Inertia::render('AdminPanel', [
            'forums' => $forums,
            'data' => $subforums,
            'entityName' => 'subforums'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $subforum = Subforum::with('posts.user', 'posts.comments')->findOrFail($id);

        $subforum->posts->each(function ($post) {
            $post->type = 'link';
        });

        $posts = $subforum->posts->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'subforum_id' => $post->subforum_id,
                'user_id' => $post->user_id,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
                'type' => $post->type,
                'replies' => $post->comments->count(),
                'author' => $post->user->name
            ];
        });

        return Inertia::render('Posts', [
            'data' => $posts,
            'subforum_name' => $subforum->name,
            'subforum_id' => $id,
            'entityName' => 'posts'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subforum $subforum)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, string $id)
    {
        // Obtener el subforo que se desea actualizar
        $subforum = Subforum::with('forum')->find($id);

        $forums = Forum::all();

        // Verificar si el subforo existe
        if ($subforum) {
            // Validar los datos recibidos en la solicitud
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'forum_id' => 'required|exists:forums,id' 
            ]);

            // Actualizar los campos necesarios
            $subforum->name = $request->input('name');
            $subforum->description = $request->input('description');
            $subforum->forum_id = $request->input('forum_id');

            // Guardar los cambios
            $subforum->save();

            // Recargar el subforo para obtener la versión actualizada después de guardar
            $subforum->refresh();
            $subforum->forums = $forums;
            $subforums = Subforum::with('forum')->get();
            // Devolver la respuesta adecuada
            return Inertia::render('AdminPanel', [
                'forums' => $forums,
                'data' => $subforums,
                'entityName' => 'subforums' // Aquí agregamos 'entityName' al array de datos
            ]);
        } else {
            // Devolver una respuesta si el subforo no existe
            return response()->json(['message' => 'Subforo no encontrado'], 404);
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subforum = Subforum::findOrFail($id);
        $subforum->delete();
        $subforums = Subforum::with('forum')->get();
        $forums = Forum::all();
        // Devolver la respuesta adecuada
        return Inertia::render('AdminPanel', [
            'forums' => $forums,
            'data' => $subforums,
            'entityName' => 'subforums' // Aquí agregamos 'entityName' al array de datos
        ]);
    }
}
