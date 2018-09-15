<?php namespace App\Http\Controllers\Dashboard;

use Auth;
use App\Commands\DeleteCommand;
use App\Models\Unit;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AvailabilityController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Availability Controller
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
     * Get Unit From Request
     *
     * @param  \Illuminate\Http\Request $request
     * @return \App\Models\Unit OR null
     */
    public function unit(Request $request)
    {
        return Unit::find($request['id']);
    }

    /**
     * Update a column in a unit
     *
     * @param  \Illuminate\Http\Request $request
     * @return 'success' or 'fail'
     */
    public function putUpdate(Request $request)
    {
        if (Auth::user()->hasPermission('availability.table', 'UPDATE')) {
            // Check to see if the column exists
            $unit = $this->unit($request);
            if (is_null($unit)) return 'fail';

            $unit->{$request['name']} = $request['value'];
            $unit->save();

            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Create A New Unit
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function postNew(Request $request)
    {
        if (Auth::user()->hasPermission('availability.table', 'CREATE')) {
            // Validate
            $this->validate($request, [
                'building'   => 'required',
                'residence'  => 'required',
                'beds'       => 'required',
                'baths'      => 'required',
                'area'       => 'required',
                'cc'         => 'required',
                'taxes'      => 'required',
                'price'      => 'required',
                'available'  => 'required'
            ]);

            // Create new unit
            $unit = new Unit;

            // Add values to model
            $unit->building   = $request['building'];
            $unit->residence  = $request['residence'];
            $unit->beds       = $request['beds'];
            $unit->baths      = $request['baths'];
            $unit->area       = $request['area'];
            $unit->exterior   = $request['exterior'];
            $unit->price      = $request['price'];
            $unit->cc         = $request['cc'];
            $unit->taxes      = $request['taxes'];
            $unit->floor_plan = $request['floor_plan'];
            $unit->available  = $request['available'];

            // Save into database
            $unit->save();

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Delete Unit
     *
     * @request DELETE
     * @path    delete
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function deleteDelete(Request $request)
    {
        if (Auth::user()->hasPermission('availability.table', 'DELETE')) {
            // Check to see if the column exists
            $unit = $this->unit($request);
            if (is_null($unit)) return 'fail';

            // Queue a delete
            $this->dispatch(new DeleteCommand($unit));

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

}
