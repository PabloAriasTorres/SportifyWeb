<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->integer('pista_id');
            $table->integer('usuario_id');
            $table->date('fecha');
            $table->time('hora');
            $table->decimal('precio', 8, 2);
            $table->enum('metodo', ['Bizum', 'Tarjeta', 'PayPal']);
            $table->unique(['pista_id', 'fecha','hora']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
