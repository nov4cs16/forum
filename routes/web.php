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


use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminPanelController;
use App\Http\Controllers\SubforumController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ForumController;
use App\Models\Forum;
use App\Models\Message;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

// Home Route
Route::get('/', function () {
    $forums = Forum::with('subforums')->get()->map(function ($forum) {
        $forum->type = 'link';
        return $forum;
    });
    
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'data' => $forums,
        'entityName' => 'forums'
    ]);
})->name('home');

// Dashboard Route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Static Pages Routes
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/portafolio', function () {
    return Inertia::render('Portfolio');
})->name('portafolio');

Route::get('/serviceterms', function () {
    return Inertia::render('ServiceTerms');
})->name('serviceterms');

// Message Routes
Route::post('/send-message', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'nombre' => 'required|string|max:255',
        'mensaje' => 'required|string|max:2000',
    ]);

    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    Message::create([
        'nombre' => $request->nombre,
        'mensaje' => $request->mensaje,
    ]);

    return Inertia::render('Portfolio')->with('success', 'Mensaje enviado exitosamente');
})->name('send-message')->middleware('throttle:3,1');

// Forum Routes
Route::get('forum/{id}', [ForumController::class, 'show'])->name('forum.show');
Route::get('subforum/{id}', [SubforumController::class, 'show'])->name('subforum.show');
Route::get('post/{id}', [PostController::class, 'show'])->name('post.show');

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('comment', [CommentController::class, 'store'])->name('commentt.store')->middleware('throttle:3,1');
    Route::post('post', [PostController::class, 'store'])->middleware('throttle:5,1');
    Route::get('post', [PostController::class, 'create'])->name('post');
    Route::post('subforum', [SubforumController::class, 'store']);
    Route::get('subforum', [SubforumController::class, 'create'])->name('subforum');
    Route::post('forum', [ForumController::class, 'store']);
    Route::get('forum', [ForumController::class, 'create'])->name('forum');
    Route::put('forum/{id}', [ForumController::class, 'update'])->name('forum.update');
    Route::put('subforum/{id}', [SubforumController::class, 'update'])->name('subforum.update');
    Route::delete('forum/{id}', [ForumController::class, 'destroy'])->name('forum.delete');
    Route::delete('subforum/{id}', [SubforumController::class, 'destroy'])->name('subforum.delete');
    
    // Admin Panel Routes
    Route::get('/admin_panel', [AdminPanelController::class, 'index'])->name('admin.panel');
    Route::get('/admin_panel/forums', [AdminPanelController::class, 'index_forums'])->name('admin.panel.forums');
    Route::get('/admin_panel/subforums', [AdminPanelController::class, 'index_subforums'])->name('admin.panel.subforums');
});

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
