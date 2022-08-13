<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/auth', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::get('user', [UserController::class, 'user']);

    /* autenticadas */
    Route::post('/logout', [AuthController::class, 'logout']);
});
