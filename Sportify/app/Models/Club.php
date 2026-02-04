<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    /** @use HasFactory<\Database\Factories\ClubFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'localidad'
    ];

    /**
     * Get all of the pistas for the Club
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function pistas()
    {
        return $this->hasMany(Pista::class);
    }
}
