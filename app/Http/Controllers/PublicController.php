<?php namespace App\Http\Controllers;

use File;
use Config;
use Illuminate\Http\Request;

class PublicController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        if ((env('APP_ENV') != 'production') && !Config::get('app.debug')) {
            $this->middleware('auth');
        }
    }

    public function getVue()
    {
        return view('templates.public', [
            'preview' => isset($_GET['preview-page']) && isset($_GET['preview-id'])
                ? $_GET['preview-page'] . '|' . $_GET['preview-id']
                : 'null'
        ]);
    }

    public function getPrivateFile($dir, $file)
    {
        $path = base_path() . '/private/' . $dir . '/' . $file;

        if (file_exists($path)) {
            $mimetype = File::mimeType($path);
            $max_age = $mimetype == 'text/plain' ? 31536000 : 60;

            return response()->file($path, [
                'Content-Type' => $mimetype,
                'Cache-Control' => "max-age=$max_age, public"
            ]);
        } else {
            abort(404);
        }
    }

}
