<?php

namespace App\Http\Controllers;

use App\Models\Pista;
use App\Models\Deporte;
use App\Models\Horario;
use App\Models\Club;
use App\Http\Requests\StorePistaRequest;
use App\Http\Requests\UpdatePistaRequest;
use Illuminate\Http\Request;
use DateTime;
use App\Http\Controllers\Recurso\ComprobarInfo;
use Illuminate\Support\Facades\Auth;

class PistaController extends Controller
{
    public function getPistaDetalle($id){
        $infoDetalle = \DB::table('clubs as c')
            ->select(
                'c.id as cId',
                'c.nombre as cNombre',
                'c.direccion as dDireccion',
                'p.nombre as pNombre',
                'p.id as pId',
                'd.nombre as dNombre',
                'p.imagen as pImagen',
                'p.precio as pPrecio'
            )
            ->join('pistas as p', 'p.club_id', '=', 'c.id')
            ->join('deportes as d', 'd.id', '=', 'p.deporte_id')
            ->where('p.id', '=', $id)
            ->first();
        return response()->json($infoDetalle);
    }

    public function index(Request $request)
    {
        $pistas = Pista::paginate(10);
    
        return response()->json([
            'pistas' => $pistas->items(),
            'currentPage' => $pistas->currentPage(),
            'lastPage' => $pistas->lastPage(),
            'hasMore' => $pistas->hasMorePages(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(StorePistaRequest $request)
    {
        $data = $request->all();
        if ($request->hasFile('imagen')) {
            $imagen = $request->file('imagen');
            $nombreArchivo = $imagen->getClientOriginalName();
            $deporte = Deporte::find($request->deporte_id);
            
            $ruta = public_path("images/pistas/{$deporte->nombre}");
            
            $imagen->move($ruta, $nombreArchivo);
            
            $data['imagen'] = "images/pistas/{$deporte->nombre}/{$nombreArchivo}";
        }

        $pista = Pista::create($data);

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

        Horario::insert($horarios);

        return response()->json($pista);
    }

    public function show($id)
    {
        $pista = Pista::find($id);
        return $pista;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pista $pista)
    {
        //
    }

    public function update(UpdatePistaRequest $request,$id)
    {
        $data = $request->all();
        $pista = Pista::find($id);
        if ($request->hasFile('imagen')) {
            $imagen = $request->file('imagen');
            $nombreArchivo = $imagen->getClientOriginalName();
            $deporte = Deporte::find($request->deporte_id);
            $nombreDeporte = strtolower($deporte->nombre);

            $ruta = public_path("images/pistas/{$nombreDeporte}");
            
            $imagen->move($ruta, $nombreArchivo);

            $data['imagen'] = "images/pistas/{$nombreDeporte}/{$nombreArchivo}";
        }
        $pista->update($data);

        return response()->json($pista);
    }

    public function destroy($id)
    {
        $pista = Pista::find($id);
        $pista->delete();

        return response()->json($id);
    }
}
