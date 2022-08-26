<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Archive extends Model
{
    use HasFactory, Uuids;

    protected $fillable = [
        'private_room',
        'name',
        'type'
    ];
}
