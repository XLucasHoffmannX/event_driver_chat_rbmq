<?php

use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/auth', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::post('/cmessage', [MessageController::class, 'storeCreate']);

Route::get('/status', function () {
    return response('ok');
});

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::get('user', [UserController::class, 'user']);

    Route::apiResource('user-end', UserController::class);

    Route::post('/upload-archive', [ArchiveController::class, 'upload']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/teste', [FriendController::class, 'teste']);

    Route::get('mfriend', [FriendController::class, 'getFriendsUser']);
    Route::get('lisfriends', [FriendController::class, 'listFriendsUser']);
    Route::get('listmessages/{room}', [MessageController::class, 'messageList']);

    Route::apiResource('friend', FriendController::class);

    Route::apiResource('message', MessageController::class);
});
