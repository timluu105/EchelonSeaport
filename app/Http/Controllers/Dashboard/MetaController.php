<?php namespace App\Http\Controllers\Dashboard;

use Auth;
use App\Commands\DeleteCommand;
use App\Commands\ReorderCommand;
use App\Commands\UpdateMetaCommand;
use App\Models\Meta;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MetaController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Meta Controller
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
     * Get Meta From Request
     *
     * @param  \Illuminate\Http\Request $request
     * @return \App\Models\Meta OR null
     */
    public function meta(Request $request)
    {
        return Meta::find($request['id']);
    }

    /**
     * Create Meta row
     *
     * @request PUT
     * @path    create
     *
     * @param   \Illuminate\Http\Request $request
     * @return  id or 'fail'
     */
    public function putCreate(Request $request)
    {
        if (Auth::user()->hasPermission('content.meta', 'CREATE')) {
            // Create new \App\Models\Meta
            $m = new Meta;
            $m->page = $request['page'];
            $m->title = '';
            $m->description = '';
            $m->keywords = '';
            $m->save();

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Update Meta Row
     *
     * @request PUT
     * @path    edit
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function putEdit(Request $request)
    {
        if (Auth::user()->hasPermission('content.meta', 'UPDATE')) {
            // Check to see if the column exists
            $meta = $this->meta($request);
            if (is_null($meta)) return 'fail';

            // Queue an update
            $this->dispatch(new UpdateMetaCommand($meta, $request['name'], $request['value']));

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Delete Meta Row
     *
     * @request DELETE
     * @path    delete
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function deleteDelete(Request $request)
    {
        if (Auth::user()->hasPermission('content.meta', 'DELETE')) {
            // Check to see if the column exists
            $meta = $this->meta($request);
            if (is_null($meta)) return 'fail';

            // Queue a delete
            $this->dispatch(new DeleteCommand($meta));

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

}
