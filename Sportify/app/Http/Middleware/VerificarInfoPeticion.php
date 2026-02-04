<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use App\Models\Pista;
use App\Models\Usuario;
use App\Models\Reserva;
use DateTime;

class VerificarInfoPeticion
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $usuario_id = $request->input('usuario_id');
        $pista_id = $request->input('pista_id');
        $fecha = $request->input('fecha');
        $hora = $request->input('hora');

        // Llamamos al método que realiza las validaciones
        $resultadoComprobacion = $this->comprobarDatosReserva($usuario_id, $pista_id, $fecha, $hora);

        // Si hay un error en la validación, devolver respuesta antes de continuar
        if (isset($resultadoComprobacion['estado']) && $resultadoComprobacion['estado'] === false) {
            return response()->json($resultadoComprobacion);
        }

        return $next($request);
    }

    private function comprobarDatosReserva($usuario_id, $pista_id, $fecha, $hora)
    {
        $reserva = Reserva::where('pista_id', $pista_id)
            ->whereDate('fecha', $fecha)
            ->where('hora', $hora)
            ->first();

        if ($reserva != null) {
            return [
                'error' => 'Ya hay una reserva para esa fecha',
                'estado' => false
            ];
        }

        $reservasUsuario = Reserva::where('usuario_id', $usuario_id)
            ->whereDate('fecha', $fecha)
            ->where('hora', $hora)
            ->get();

        if (count($reservasUsuario) != 0) {
            return [
                'error' => 'No puedes tener dos reservas con la misma fecha',
                'estado' => false
            ];
        }

        return ['estado' => 200];
    }
}
