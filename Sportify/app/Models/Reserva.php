<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    /** @use HasFactory<\Database\Factories\ReservaFactory> */
    use HasFactory;

    protected $fillable = [
        'pista_id',
        'usuario_id',
        'fecha',
        'hora',
        'precio',
        'metodo'
    ];

    /**
     * Get the pista that owns the Reserva
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pista()
    {
        return $this->belongsTo(Pista::class);
    }

    /**
     * Get the usuario that owns the Reserva
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}
