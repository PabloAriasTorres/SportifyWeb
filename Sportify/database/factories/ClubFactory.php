<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Club>
 */
class ClubFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $localidades = ['Comunidad Valenciana', 'Barcelona', 'Madrid'];
        return [
            'nombre' => $this->faker->company(),
            'direccion' => $this->faker->address(),
            'localidad' => $this->faker->randomElement($localidades),
            'telefono' => $this->faker->numerify('9########')
        ];
    }
}
