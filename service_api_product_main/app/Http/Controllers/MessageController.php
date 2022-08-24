<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages = Message::paginate();

        return response($messages, Response::HTTP_OK);
    }

    public function messageList($room)
    {
        $messages = Message::where('private_room', $room)->orderBy('created_at')->get();

        return response($messages, Response::HTTP_CREATED);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeCreate(Request $request)
    {
        $private_room = $request->get("private_room");
        $user_id = $request->get("user_id");
        $message_text = $request->get("message_text");

        $privateRoomExists = Friend::where("private_room", $private_room)->get();

        if (count($privateRoomExists) > 1) {
            $userExists = User::find($user_id);

            if ($userExists && $message_text) {
                Message::create([
                    "private_room" => $private_room,
                    "message_text" => $message_text,
                    "user_id" => $user_id
                ]);

                return response(null, Response::HTTP_CREATED);
            }
        }

        return response()->json(["msg" => "usuário ou sala não existe!"], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $messageId = Message::find($id);

        if ($messageId) {
            return response($messageId, Response::HTTP_OK);
        }

        return response()->json(["msg" => "mensagem não encontrada!"], Response::HTTP_BAD_REQUEST);
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
