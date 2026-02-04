<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Usuario::create([
            'nombre' => 'Admin',
            'email' => 'admin@gmail.com',
            'contrasenya' => bcrypt('admin'),
            'telefono' => 123456789
        ]);

        Usuario::factory()
            ->count(3)
            ->create();
    }
}
