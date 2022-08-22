<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use Error;
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
            $userFriend = User::find($friend->friend_id);
            $userFriend['private_room'] = $friend->private_room;
            array_push($data, $userFriend);
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

        $friendIdRequest = $request->only('friend_id');
        $friendIdRequest = $friendIdRequest['friend_id'];

        $userExists = User::find($friendIdRequest);

        if ($user->id == $friendIdRequest) {
            return response()
                ->json(["msg" => "Não é possível criar amizade com você mesmo!"], Response::HTTP_BAD_REQUEST);
        }

        /* verificar se usuario da request existe */
        if ($userExists == null) {
            return response()->json(["msg" => "Usuário não encontrado!"], Response::HTTP_BAD_REQUEST);
        }

        if ($userExists->id == $friendIdRequest) {
            /* amizade de alguem */
            $someoneFriend = Friend::where('user_id', $friendIdRequest)->where('friend_id', $user->id)->get();
            $ownerFriend = Friend::where('user_id', $user->id)->where('friend_id', $friendIdRequest)->get();

            if (count($someoneFriend) == 1 && count($ownerFriend) == 1) {
                return response()->json(["msg" => "Amizade já existente!"], Response::HTTP_BAD_REQUEST);
            } else {
                $room_private_id_unique = Uuid::uuid4();
                if (count($someoneFriend) == 0 && count($ownerFriend) == 0) {
                    Friend::create([
                        "user_id" => $user->id,
                        "friend_id" => $friendIdRequest,
                        "private_room" => $room_private_id_unique
                    ]);
                }

                /* nova chamada */
                $someoneFriend = Friend::where('user_id', $friendIdRequest)->where('friend_id', $user->id)->get();
                $ownerFriend = Friend::where('user_id', $user->id)->where('friend_id', $friendIdRequest)->get();

                /* amizade friend_id nao existe */
                if (count($someoneFriend) == 0) {
                    $ownerFriendAttributes = Friend::where('user_id', $user->id)
                        ->where('friend_id', $friendIdRequest)->first(["private_room", "user_id", "friend_id"]);
                    $friendCreated = Friend::create([
                        "user_id" => $ownerFriendAttributes->friend_id,
                        "friend_id" => $ownerFriendAttributes->user_id,
                        "private_room" => $room_private_id_unique
                    ]);

                    return response()->json($friendCreated, Response::HTTP_CREATED);
                }
                /* amizade user_id nao existe */
                if (count($ownerFriend) == 0) {
                    /* verificar meu friend id */
                    $someoneFriendAttributes = Friend::where('user_id', $friendIdRequest)
                        ->where('friend_id', $user->id)->first(["private_room", "user_id", "friend_id"]);

                    $friendCreated = Friend::create([
                        "user_id" => $someoneFriendAttributes->friend_id,
                        "friend_id" => $someoneFriendAttributes->user_id,
                        "private_room" => $room_private_id_unique
                    ]);

                    return response()->json($friendCreated, Response::HTTP_CREATED);
                }
            }
        }
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
