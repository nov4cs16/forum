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
use App\Models\Forum;
use App\Models\Subforum;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $forums = Forum::with('subforums')->get();
        return response()->json($forums);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('AdminPanel', [
            //'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(Request $request)
{
    $request->validate([
        'name' => 'required|unique:forums',
        'description' => 'required'
    ]);
  
    $forumData = [
        'name' => $request->name,
        'description' => $request->description
    ];

    $forum = Forum::create($forumData);

   
    $forums = Forum::with('subforums')->get();
    return Inertia::render('AdminPanel', [
        'data' => $forums,
       // 'data' => $subforums,
        'entityName' => 'forums' // Aquí agregamos 'entityName' al array de datos
    ]);
    //return response()->json($forum, 201);
}

    public function storee(Request $request)
    {

    $request->validate([
        'name' => 'required|unique:forums',
        'description' => 'required'
    ]);
  
    $forumData = [
        'name' => $request->name,
        'description' => $request->description
    ];
    $forum = Forum::create($forumData);

 $subforum = new Subforum([
        'name' => "sdsadsda",
    'description' => "3333212"
]);

$forum->subforums()->save($subforum);

    return response()->json($forum, 201);
   
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $forum = Forum::with('subforums')->findOrFail($id);
      $forum->subforums->each(function ($subforum) {
        $subforum->type = 'link';
    });

    //return response()->json( $forum->subforums);
      return Inertia::render('Subforum', [
        'data' => $forum->subforums,
        'forum_name' =>$forum->name,
        'entityName' => 'subforums' // Aquí agregamos 'entityName' al array de datos
    ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // No se suele implementar en APIs RESTful
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|unique:forums,name,' . $id,
            'description' => 'required'
        ]);

        $forum = Forum::findOrFail($id);
        $forum->update($request->all());
        $forums = Forum::with('subforums')->get();
        return Inertia::render('AdminPanel', [
            'data' => $forums,
           // 'data' => $subforums,
            'entityName' => 'forums' // Aquí agregamos 'entityName' al array de datos
        ]);
       // return response()->json($forum, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $forum = Forum::findOrFail($id);
        $forum->delete();
        $forums = Forum::with('subforums')->get();
        return Inertia::render('AdminPanel', [
            'data' => $forums,
           // 'data' => $subforums,
            'entityName' => 'forums' // Aquí agregamos 'entityName' al array de datos
        ]);;
    }
}
