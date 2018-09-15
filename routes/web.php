<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
|--------------------------------------------------------------------------
| New Relic Patch
|--------------------------------------------------------------------------
|
| This works in combination with app/Http/Middleware/NewRelicPatch.php to
| fix an issue with the New Relic PHP module and composer in combination
| with Laravel
|
*/

Route::macro('after', function($callback) {
    $this->events->listen('router.filter:after:newrelic-patch', $callback);
});

/*
|--------------------------------------------------------------------------
| Dashboard Routes
|--------------------------------------------------------------------------
*/

Route::group([ 'prefix' => 'dashboard' ], function() {
    //
    // Dashboard Controllers
    //

    Route::put('/content/meta/create', 'Dashboard\MetaController@putCreate');
    Route::put('/content/meta/edit', 'Dashboard\MetaController@putEdit');
    Route::delete('/content/meta/delete', 'Dashboard\MetaController@deleteDelete');

    Route::post('/content/sections/new', 'Dashboard\SectionsController@postNew');
    Route::post('/content/sections/image-upload', 'Dashboard\SectionsController@postImageUpload');
    Route::post('/content/sections/image-edit', 'Dashboard\SectionsController@postImageEdit');
    Route::post('/content/sections/update', 'Dashboard\SectionsController@postUpdate');
    Route::put('/content/sections/edit', 'Dashboard\SectionsController@putEdit');
    Route::delete('/content/sections/delete', 'Dashboard\SectionsController@deleteDelete');
    Route::patch('/content/sections/reorder', 'Dashboard\SectionsController@patchReorder');

    Route::put('/availability/data/update', 'Dashboard\AvailabilityController@putUpdate');
    Route::post('/availability/data/new', 'Dashboard\AvailabilityController@postNew');
    Route::delete('/availability/data/delete', 'Dashboard\AvailabilityController@deleteDelete');

    Route::get('/inquiries/download/{filename}', 'Dashboard\InquiryController@getDownload');

    Route::post('/access/users/new', 'Dashboard\UsersController@postNew');
    Route::delete('/access/users/delete', 'Dashboard\UsersController@deleteDelete');

    Route::post('/press/articles/new', 'Dashboard\PressController@postNew');
    Route::post('/press/articles/press-reorder', 'Dashboard\PressController@postPressReorder');
    Route::post('/press/articles/pdf-upload', 'Dashboard\PressController@postPdfUpload');
    Route::post('/press/articles/pdf-delete', 'Dashboard\PressController@postPdfDelete');
    Route::post('/press/articles/image-upload', 'Dashboard\PressController@postImageUpload');
    Route::post('/press/articles/image-delete', 'Dashboard\PressController@postImageDelete');
    Route::put('/press/articles/edit', 'Dashboard\PressController@putEdit');
    Route::delete('/press/articles/delete', 'Dashboard\PressController@deleteDelete');

    //
    // GET Routes
    //

    Route::get('/', 'DashboardController@getDashboard');
    Route::get('/get-that-content/{project?}/{category?}/{page?}/{page2?}/{arg?}/{arg2?}', 'DashboardController@getContent');
    Route::get('/get-that-subnav/{page?}', 'DashboardController@getSubnav');
    Route::get('/{project}/{category?}/{page?}/{page2?}', 'DashboardController@getPage');
});

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

//
// User Default Routes
//

Route::auth();
Route::get('/logout', 'Auth\LoginController@logout');

//
// Download Routes
//

Route::get('/download/img/{dir}/{file}', function($dir, $file) {
    $img = base_path() . '/public/img/' . $dir . '/' . $file;

    if (file_exists($img)) {
        return response()->download($img);
    } else {
        abort(404);
    }
});

Route::get('/download/uploads/{dir}/{file}', function($dir, $file) {
    $file_dl = base_path() . '/public/uploads/' . $dir . '/' . $file;

    if (file_exists($file_dl)) {
        return response()->download($file_dl);
    } else {
        abort(404);
    }
});

/*
|--------------------------------------------------------------------------
| Public Controller Routes
|--------------------------------------------------------------------------
*/

Route::get('/private/{dir}/{file}', 'PublicController@getPrivateFile');
Route::get('/{vue?}', 'PublicController@getVue')->where('vue', '[\/\w\.-]*');
