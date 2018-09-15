<?php namespace App\Http\Controllers\Dashboard;

use Auth;
use App\Models\Press;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PressController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Press Controller
    |--------------------------------------------------------------------------
    */

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('dashboard_access');
    }

    /**
     * Get Press From Request
     *
     * @param  \Illuminate\Http\Request $request
     * @return \App\Models\Press OR null
     */
    public function press(Request $request)
    {
        return Press::find($request['id']);
    }

    /**
     * Add New Press Article
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function postNew(Request $request)
    {
        if (Auth::user()->hasPermission('press.articles', 'CREATE')) {
            // Validate
            $this->validate($request, [
                'title'       => 'required',
                'publisher'   => 'required',
                'description' => 'required',
                'date'        => 'required'
            ]);

            // Create new press article
            $press = new Press;
            $press->title = $request['title'];
            $press->publisher = $request['publisher'];
            $press->description = $request['description'];
            $press->date = $request['date'];
            $press->order = Press::count();
            $press->save();

            // Return Successfully
            return $press->id;
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Image Upload
     *
     * @request POST
     * @path    image-upload
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function postImageUpload(Request $request)
    {
        if (Auth::user()->hasPermission('press.articles', 'UPDATE')) {
            // Ensure the file path has been provided
            $this->validate($request, [ 'id' => 'required' ]);
            return Press::saveImage($request, $request['id']);
        } else {
            return 'fail';
        }
    }

    /**
     * Delete Image
     *
     * @request POST
     * @path    image-delete
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function postImageDelete(Request $request)
    {
        if (Auth::user()->hasPermission('press.articles', 'UPDATE')) {
            // Check to see if the column exists
            $press = $this->press($request);
            if (is_null($press)) return 'fail';
            $image_path = base_path() . '/public' . Press::$uploads_dir . $press->id . '.jpg';

            if (file_exists($image_path)) {
                if (!unlink($image_path)) {
                    return 'fail';
                }
            }

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * PDF Upload
     *
     * @request POST
     * @path    pdf-upload
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function postPdfUpload(Request $request)
    {
        if (Auth::user()->hasPermission('press.articles', 'UPDATE')) {
            // Ensure the file path has been provided
            $this->validate($request, [ 'path' => 'required' ]);

            if ($request->hasFile('file')) {
                $request->file('file')->move(base_path() . '/public' . Press::$uploads_dir, $request['path']);
            } else {
                return 'fail';
            }

            return 'success';
        } else {
            return 'fail';
        }
    }

    /**
     * Delete PDF
     *
     * @request POST
     * @path    pdf-delete
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function postPdfDelete(Request $request)
    {
        if (Auth::user()->hasPermission('press.articles', 'UPDATE')) {
            // Check to see if the column exists
            $press = $this->press($request);
            if (is_null($press)) return 'fail';
            $pdf_path = base_path() . '/public' . Press::$uploads_dir . $press->id . '.pdf';

            if (file_exists($pdf_path)) {
                if (!unlink($pdf_path)) {
                    return 'fail';
                }
            }

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Update Press Row
     *
     * @request PUT
     * @path    edit
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function putEdit(Request $request)
    {
        if (Auth::user()->hasPermission('press.articles', 'UPDATE')) {
            // Check to see if the column exists
            $press = $this->press($request);
            if (is_null($press)) return 'fail';

            $value = $request['value'] === 'true'  ? filter_var($request['value'], FILTER_VALIDATE_BOOLEAN) :
                     $request['value'] === 'false' ? filter_var($request['value'], FILTER_VALIDATE_BOOLEAN) :
                     $request['value'];

            $press->{$request['name']} = $value;
            $press->save();

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Delete Press Row
     *
     * @request DELETE
     * @path    delete
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function deleteDelete(Request $request)
    {
        if (Auth::user()->hasPermission('press.articles', 'DELETE')) {
            // Check to see if the column exists
            $press = $this->press($request);
            if (is_null($press)) return 'fail';
            return Press::deleteArticle($press->id);
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    public function postPressReorder(Request $request)
    {
        if (Auth::user()->hasPermission('press.articles', 'UPDATE')) {
            $this->validate($request, [
                'order' => 'required'
            ]);

            return Press::reorder($request['order']);
        } else {
            // Return a fail if the user lacks the required permission
            return $request;
        }
    }

}
