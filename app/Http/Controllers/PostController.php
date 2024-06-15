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

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Subforum;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user', 'comments')->get();
        return response()->json($posts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'subforum_id' => 'required|exists:subforums,id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required',
            'body' => 'required'
        ]);
     //   $subforum = Subforum::find($request->subforum_id);


    // Crear el subforo con los datos proporcionados en la solicitud
    $post = Post::create([
        'subforum_id' => $request->subforum_id,
        'user_id' => $request->user_id,
        'title' => $request->title,
        'body' => $request->body
    ]);
 /*   $post->load('subforum');
    $subforum->posts()->save($post);
    $posts = Post::with('subforum')->get();
    $subforums = Subforum::all();*/

    $subforum = Subforum::with('posts.user','posts.comments')->findOrFail($request->subforum_id);
        
    $subforum->posts->each(function ($post) {
        $post->type = 'link';
    });

    $posts = $subforum->posts->map(function ($post) {
        return [
            'id' => $post->id,
            'title' => $post->title,
         //  'body' => $post->body,
            'subforum_id' => $post->subforum_id,
            'user_id' => $post->user_id,
            'created_at' => $post->created_at,
            'updated_at' => $post->updated_at,
            'type' => $post->type,
           // 'user' => [
              //  'id' => $post->user->id,
                //'name' => $post->user->name
             
            //]
            'replies' => $post->comments->count(),
            'author'=>$post->user->name
        ];
    });

 //   $posts = Post::with('user', 'comments')->get();
    return Inertia::render('Posts', [
        'data' => $posts,
        'subforum_id'=> $request->subforum_id,
        'entityName' => 'posts'
    ]);
        //return response()->json($forum, 201);
    }

    /**
     * Display the specified resource.
     */

     public function show222(string $id)
     {
 
 
         $post = Post::with(['user', 'comments.user'])->findOrFail($id);
         
   
     //  return response()->json( ['data'=>$post]);
       return Inertia::render('Thread', [
         'data' => $post,
     
         'entityName' => 'comments' // Aquí agregamos 'entityName' al array de datos
     ]);
 }
    public function show(string $id)
    {


        $post = Post::with('user','comments.user')->findOrFail($id);
        
  
      //return response()->json( $forum->subforums);
      return Inertia::render('Thread', [
        'data' => $post,
        
        'entityName' => 'comments' // Aquí agregamos 'entityName' al array de datos
    ]);
}
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
