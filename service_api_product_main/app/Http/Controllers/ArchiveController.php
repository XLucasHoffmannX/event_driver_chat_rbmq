<?php

namespace App\Http\Controllers;

use App\Models\Archive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ArchiveController extends Controller
{
    public function upload(Request $request)
    {
        $nameFile = null;
        $private_room = $request->get("private_room");
        $type = $request->get("type");

        if ($request->hasFile('archive') && $request->file('archive')->isValid()) {
            $name = Str::random(10) . "-" . date('Ymd');

            $extension = $request->archive->extension();

            $nameFile = "{$name}.{$extension}";

            $upload = $request->archive->storeAs('/public/archives', $nameFile);

            if ($upload) {
                Archive::create([
                    "private_room" => $private_room,
                    "name" => $nameFile,
                    "type" => $type
                ]);

                return response()->json([
                    "url" => Storage::url($upload),
                    "name" => $nameFile
                ]);
            }

            return response()->json(["msg" => "Falha no upload"], Response::HTTP_BAD_REQUEST);
        }

        return response()->json(["msg" => "Falha no upload"], Response::HTTP_BAD_REQUEST);
    }
}
