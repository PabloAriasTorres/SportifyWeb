<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Http\Controllers\Recurso\ComprobarInfo;
use App\Http\Requests\StoreUsuarioRequest;
use App\Http\Requests\UpdateUsuarioRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    public function login(Request $request)
    {
        \Log::info($request);
        $email = $request->input('email');
        $contrasenya = $request->input('contrasenya');

        $usuario = Usuario::where('email', $email)->first();

        if($usuario == null){
             return response()->json([
                'success' => false,
                'mensaje' => 'No existe el correo proporcionado'
            ]);
        }

        //COMPARA LAS DOS CONTRASEÑAS HASHEADAS PARA COMPROBAR SI ES LA MISMA CONTRASEÑA
        //QUE HAY EN LA BASE DE DATOS 
        if (Hash::check($contrasenya, $usuario->contrasenya)) {
            return response()->json([
                'success' => true,
                'data' => $usuario
            ]);
        } else {
            return response()->json([
                'success' => false,
                'mensaje' => 'No coincide la contraseña con el correo proporcionado'
            ]);
        }
    }

    public function loginAdmin(Request $request){
        if ($request->input('email') === 'admin@gmail.com' && $request->input('contrasenya') === 'admin') {
            return response()->json([
                'success' => true
            ]);
        }else{
            return response()->json([
                'success' => false,
                'mensaje' => 'Las credenciales no coinciden'
            ]);
        }
    }

    public function registro(StoreUsuarioRequest $request)
    {
        $usuarioDatos = $request->all();
        $contrasenya = $request->input('contrasenya');
        $usuarioDatos['contrasenya'] = bcrypt($contrasenya);
        if (Usuario::where('email', $usuarioDatos['email'])->exists()) {
            return response()->json([
                'success' => false,
                'mensaje' => 'Ya existe una cuenta con ese correo'
            ]);
        }
        $usuario = Usuario::create($usuarioDatos);

        return response()->json([
            'success' => true,
            'data' => $usuario
        ]);
    }

    public function index()
    {
        //
        $usuarios = Usuario::paginate(10);
    
        return response()->json([
            'usuarios' => $usuarios->items(),
            'currentPage' => $usuarios->currentPage(),
            'lastPage' => $usuarios->lastPage(),
            'hasMore' => $usuarios->hasMorePages(),
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
    public function store(StoreUsuarioRequest $request)
    {
        // COMO HAY QUE HACER UN REGISTRO Y LOGIN NO CREO QUE HAGA FALTA HACER UN POST PARA USUARIO
        // YA QUE EL REGISTRO ES EXACTAMENTE LO MISMO
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $usuario = Usuario::find($id);
        return $usuario;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUsuarioRequest $request, $id)
    {
        $usuario = Usuario::find($id);
        $usuario->update($request->all());

        return response()->json($usuario);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $usuario = Usuario::find($id);
        $usuario->delete();

        return response()->json($id);
    }
}
