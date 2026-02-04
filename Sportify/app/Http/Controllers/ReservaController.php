<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Socio;
use App\Models\Pista;
use App\Models\Horario;
use App\Models\Deporte;
use App\Http\Requests\StoreReservaRequest;
use App\Http\Requests\UpdateReservaRequest;
use Illuminate\Http\Request;
use DateTime;
use Log;
use App\Http\Controllers\Recurso\ComprobarInfo;
use Illuminate\Support\Facades\Auth;

class ReservaController extends Controller
{
    public function __construct()
    {
        $this->middleware(\App\Http\Middleware\VerificarInfoPeticion::class)
             ->only(['store', 'update']);
    }

    public function getReservasUsuario($idUsuario){
        $reservas = Reserva::join('pistas', 'reservas.pista_id', '=', 'pistas.id')
        ->where('reservas.usuario_id', $idUsuario)
        ->where('reservas.fecha', '>=', now()->format('Y-m-d'))
        ->orderBy('reservas.fecha', 'asc')
        ->orderBy('reservas.hora', 'asc')
        ->select([
            'reservas.*',
            'pistas.nombre',
        ])
        ->get();
        return response()->json($reservas);
    }

    public function getEstadisticasReservas(){
        $estadisticas = \DB::table('reservas')
        ->selectRaw('
            metodo,
            COUNT(*) as totalReservasPorMetodo,
            SUM(precio) as totalDineroPorMetodo
        ')
        ->groupBy('metodo')
        ->get();

        $totales = \DB::table('reservas')
            ->selectRaw('
                COUNT(*) as totalReservas,
                SUM(precio) as totalDinero
            ')
            ->first();

        return response()->json([
            'totales' => $totales,
            'metodos' => $estadisticas
        ]);
    }

    public function index(Request $request)
    {
        $reservas = Reserva::paginate(10);
        return response()->json([
            'reservas' => $reservas->items(),
            'currentPage' => $reservas->currentPage(),
            'lastPage' => $reservas->lastPage(),
            'hasMore' => $reservas->hasMorePages(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(StoreReservaRequest $request)
    {
        Reserva::create($request->all());

        // Actualizar campo reserva de la pista
        $fecha = (new DateTime($request->input('fecha')))->format('Y-m-d');
        $hora = (new DateTime($request->input('hora')))->format('H:i:s');

        $horario = Horario::where('pista_id', $request->input('pista_id'))
            ->where('fecha', $fecha)
            ->where('hora', $hora)
            ->first();
        
        if ($horario) {
            $horario->reservada = true;
            $horario->save();
        }

        return [
            'estado' => true
        ];
    }

    public function show(Reserva $reserva)
    {
        return response()->json($reserva);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reserva $reserva)
    {
        //
    }

    public function update(UpdateReservaRequest $request, Reserva $reserva)
    {
        $reserva->update($request->all());

        return response()->json($reserva);
    }

    public function destroy($id)
    {
        $reserva = Reserva::find($id);

        $horario = Horario::where('pista_id', $reserva['pista_id'])
            ->where('fecha', $reserva['fecha'])
            ->where('hora', $reserva['hora'])
            ->first();
        
        if ($horario) {
            $horario->reservada = false;
            $horario->save();
        }

        $reserva->delete();

        return response()->json($id);
    }
}
