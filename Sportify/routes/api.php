<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\PistaController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\DeporteController;

//CLUB
Route::get('/clubsInfoCms', [ClubController::class, 'getClubsInfoCms']);
Route::get('/clubsHome', [ClubController::class, 'getClubsHome']);
Route::get('/byDeporte/{deporte}', [ClubController::class, 'getClubsByDeporte']);
Route::get('/byLocalidad/{localidad}', [ClubController::class, 'getClubsByLocalidad']);
Route::get('/bySearch/{search}', [ClubController::class, 'getClubsBySearch']);
Route::get('/club/{id}', [ClubController::class, 'show']);
Route::get('/clubs', [ClubController::class, 'index']);
Route::post('/club', [ClubController::class, 'store']);
Route::post('/club/{id}', [ClubController::class, 'update']);
Route::delete('/club/{id}', [ClubController::class, 'destroy']);

//HORARIO
Route::get('/horario/{id}', [HorarioController::class, 'show']);

//PISTA
Route::get('/pistas', [PistaController::class, 'index']);
Route::post('/pista', [PistaController::class, 'store']);
Route::get('/pista/{id}', [PistaController::class, 'show']);
Route::get('/pistaDetalle/{id}', [PistaController::class, 'getPistaDetalle']);
Route::post('/pista/{id}', [PistaController::class, 'update']);
Route::delete('/pista/{id}', [PistaController::class, 'destroy']);

//RESERVA
Route::post('reservar', [ReservaController::class, 'store']);
Route::get('reservas', [ReservaController::class, 'index']);
Route::get('getEstadisticasReservas', [ReservaController::class, 'getEstadisticasReservas']);
Route::get('reservas/{id}', [ReservaController::class, 'getReservasUsuario']);
Route::delete('reserva/{id}', [ReservaController::class, 'destroy']);

//USUARIO
Route::post('login', [UsuarioController::class, 'login']);
Route::post('loginAdmin', [UsuarioController::class, 'loginAdmin']);
Route::post('register', [UsuarioController::class, 'registro']);
Route::get('/usuario/{id}', [UsuarioController::class, 'show']);
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::post('/usuario/{id}', [UsuarioController::class, 'update']);
Route::delete('/usuario/{id}', [UsuarioController::class, 'destroy']);

//DEPORTE
Route::get('/deportes', [DeporteController::class, 'index']);
