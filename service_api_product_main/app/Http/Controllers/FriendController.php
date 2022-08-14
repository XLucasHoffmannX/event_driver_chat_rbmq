<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class FriendController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $friends = Friend::paginate();

        return response($friends);
    }

    public function getFriendsUser()
    {
        $user = Auth::user();

        $friends = Friend::where('user_id', $user->id)->get();

        return response($friends, Response::HTTP_ACCEPTED);
    }

    public function listFriendsUser()
    {
        $data = [];
        $user = Auth::user();

        $friends = Friend::where('user_id', $user->id)->get();

        foreach ($friends as $friend) {
            array_push($data, User::find($friend->friend_id));
        }

        return response($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $friend_id = $request->get('friend_id');

        $userExists = User::find($friend_id);

        if ($userExists->id == $friend_id) {
            $friendAlreadyExists = Friend::where('user_id', $user->id)->get();

            if ($friendAlreadyExists[0]->friend_id != $userExists->id) {
                Friend::create([
                    "user_id" => Auth::user()->id,
                    "friend_id" => $friend_id,
                    "private_room" => Uuid::uuid4()
                ]);
            } else {
                return response()->json(["msg" => "Amizade ja existente!"]);
            }

            return response(null, Response::HTTP_CREATED);
        }

        return response()->json(["msg" => "Usuário não encontrado!"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
