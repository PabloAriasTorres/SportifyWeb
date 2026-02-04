<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Http\Requests\StoreClubRequest;
use App\Http\Requests\UpdateClubRequest;
use App\Http\Controllers\Recurso\ComprobarInfo;
use Illuminate\Support\Facades\Auth;

class ClubController extends Controller
{
    public function getClubsByDeporte($deporte){
        $clubs = \DB::table('clubs as c')
        ->select(
            'c.id as cId',
            'c.nombre as cNombre',
            'c.direccion as dDireccion',
            'p.nombre as pNombre',
            'd.nombre as dNombre',
            'p.imagen as pImagen',
            'p.id as pId'
        )
        ->join('pistas as p', 'p.club_id', '=', 'c.id')
        ->join('deportes as d', 'd.id', '=', 'p.deporte_id')
        ->where('d.nombre', 'LIKE', '%'.$deporte.'%')
        ->orderBy('c.nombre')
        ->get();

        return response()->json($clubs);
    }

    public function getClubsByLocalidad($localidad){
        $clubs = \DB::table('clubs as c')
        ->select(
            'c.id as cId',
            'c.nombre as cNombre',
            'c.direccion as dDireccion',
            'p.nombre as pNombre',
            'd.nombre as dNombre',
            'p.imagen as pImagen',
            'p.id as pId'
        )
        ->join('pistas as p', 'p.club_id', '=', 'c.id')
        ->join('deportes as d', 'd.id', '=', 'p.deporte_id')
        ->where('c.localidad', 'LIKE', '%'.$localidad.'%')
        ->orderBy('c.nombre')
        ->get();

        return response()->json($clubs);
    }

    public function getClubsBySearch($searchTerm){
        $clubs = \DB::table('clubs as c')
        ->select(
            'c.id as cId',
            'c.nombre as cNombre',
            'c.direccion as dDireccion',
            'p.nombre as pNombre',
            'd.nombre as dNombre',
            'p.imagen as pImagen',
            'p.id as pId'
        )
        ->join('pistas as p', 'p.club_id', '=', 'c.id')
        ->join('deportes as d', 'd.id', '=', 'p.deporte_id')
        ->where('c.nombre', 'LIKE', '%'.$searchTerm.'%')
        ->orderBy('c.nombre')
        ->get();

        return response()->json($clubs);
    }

    public function getClubsInfoCms(){
        $clubs = \DB::table('clubs as c')
            ->select(
                'c.id as cId',
                'c.nombre as cNombre'
            )
            ->orderBy('c.nombre')
            ->groupBy('c.id','c.nombre')
            ->get();

        return response()->json($clubs);
    }

    public function getClubsHome(){
        $clubs = \DB::table('clubs as c')
            ->select(
                'c.id as cId',
                'c.nombre as cNombre',
                'c.direccion as dDireccion',
                'p.id as pId',
                'p.nombre as pNombre',
                'd.nombre as dNombre',
                'p.imagen as pImagen'
            )
            ->join('pistas as p', 'p.club_id', '=', 'c.id')
            ->join('deportes as d', 'd.id', '=', 'p.deporte_id')
            ->orderBy('c.nombre')
            ->get();

        return response()->json($clubs);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clubs = Club::paginate(10);
        
        return response()->json([
            'clubs' => $clubs->items(),
            'currentPage' => $clubs->currentPage(),
            'lastPage' => $clubs->lastPage(),
            'hasMore' => $clubs->hasMorePages(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClubRequest $request)
    {
        //
        $club = Club::create($request->all());

        return response()->json($club);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $club = Club::find($id);
        return $club;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Club $club)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClubRequest $request, $id)
    {
        $club = Club::find($id);
        $club->update($request->all());

        return response()->json($club);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $club = Club::find($id);
        $club->delete();

        return response()->json($id);
    }
}
