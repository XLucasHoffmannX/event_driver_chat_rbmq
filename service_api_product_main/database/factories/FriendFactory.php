<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FriendFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()->id,
            'friend_id' => \App\Models\User::inRandomOrder()->first()->id,
            'accept' => $this->faker->boolean(),
            'private_room' => $this->faker->unique()->uuid(),
        ];
    }
}
