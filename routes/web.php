<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('customers', \App\Http\Controllers\CustomerController::class)->only(['index', 'create', 'store']);
    Route::resource('plans', \App\Http\Controllers\PlansController::class);
    Route::get('plans/active', [\App\Http\Controllers\PlansController::class, 'getActivePlans'])->name('plans.active');
});

require __DIR__.'/settings.php';
