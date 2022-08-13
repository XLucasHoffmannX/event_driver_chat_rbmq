<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FriendFactory extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Friend::factory(10)->create();
    }
}
