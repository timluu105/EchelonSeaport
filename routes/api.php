<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function(Request $request) {
    return $request->user();
});

Route::post('/meta', 'ApiController@postMeta');
Route::post('/page-content', 'ApiController@postPageContent');
Route::post('/register-contact', 'ApiController@postRegister');
Route::get('/subnav-links', 'ApiController@getSubnavLinks');
Route::get('/units', 'ApiController@getUnits');
Route::get('/press-articles', 'ApiController@getPress');
