<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Deporte;
use App\Models\Club;
use App\Models\Horario;
use App\Models\Pista;
use DateTime;
use DateInterval;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pista>
 */
class PistaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'deporte_id' => Deporte::factory(),
            'club_id' => Club::factory(),
            'nombre' => 'Pista ' . $this->faker->word(),
            'precio' => $this->faker->randomFloat(2, 10, 50),
            'longitud' => $this->faker->randomFloat(1, 20, 35),
            'ancho' => $this->faker->randomFloat(1, 15, 25),
            'imagen' => '',
        ];
    }

    public function configure()
{
    return $this->afterCreating(function (Pista $pista) {
        $rutasImagenes = [
            'Fútbol' => 'images/pistas/fútbol',
            'Baloncesto' => 'images/pistas/baloncesto',
            'Pádel' => 'images/pistas/pádel',
            'Tenis' => 'images/pistas/tenis',
        ];

        $deporteNombre = $pista->deporte->nombre ?? 'Fútbol'; // fallback por si acaso
        $carpeta = $rutasImagenes[$deporteNombre] ?? 'images/pistas/fútbol';

        $imagenes = glob(public_path($carpeta . '/*.jpg'));
        $imagenElegida = basename($this->faker->randomElement($imagenes));

        $pista->imagen = $carpeta . '/' . $imagenElegida;
        $pista->save();

        // --- Crear horarios ---
        $horarios = [];
        $primerDia = new \DateTime('2025-06-01');
        $ultimoDia = new \DateTime('2025-07-31');

        while ($primerDia <= $ultimoDia) {
            $hora = new \DateTime('08:00:00');
            while ($hora <= new \DateTime('22:00:00')) {
                $horarios[] = [
                    'pista_id' => $pista->id,
                    'fecha' => $primerDia->format('Y-m-d'),
                    'hora' => $hora->format('H:i:s'),
                    'reservada' => false,
                ];
                $hora->add(new \DateInterval('PT1H'));
            }
            $primerDia->add(new \DateInterval('P1D'));
        }

        \App\Models\Horario::insert($horarios);
    });
}
}
