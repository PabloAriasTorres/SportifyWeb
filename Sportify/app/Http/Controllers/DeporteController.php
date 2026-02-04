<?php

namespace App\Http\Controllers;

use App\Models\Deporte;
use App\Http\Requests\StoreDeporteRequest;
use App\Http\Requests\UpdateDeporteRequest;
use App\Http\Controllers\Recurso\ComprobarInfo;
use Illuminate\Support\Facades\Auth;

class DeporteController extends Controller
{
    public function index()
    {
        //
        $deportes = \DB::table('deportes')->get();

        return response()->json($deportes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(StoreDeporteRequest $request)
    {
        //
        $deporte = Deporte::create($request->all());

        return response()->json($deporte);
    }

    public function show(Deporte $deporte)
    {
        return response()->json($deporte);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deporte $deporte)
    {
        //
    }

    public function update(UpdateDeporteRequest $request, Deporte $deporte)
    {
        //
        $deporte->update($request->all());

        return response()->json($deporte);
    }

    public function destroy($id)
    {
        $deporte = Deporte::find($id);
        $deporte->delete();

        return response()->json($id);
    }
}
