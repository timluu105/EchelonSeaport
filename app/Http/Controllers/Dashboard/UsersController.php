<?php namespace App\Http\Controllers\Dashboard;

use Auth;
use Hash;
use App\Commands\DeleteCommand;
use App\User;
use App\Models\Permissions;
use App\Models\LoginHistory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UsersController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Users Controller
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
     * Get User From Request
     *
     * @param  \Illuminate\Http\Request $request
     * @return \App\Models\User OR null
     */
    public function user(Request $request)
    {
        return User::find($request['id']);
    }

    /**
     * Add New User
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function postNew(Request $request)
    {
        if (Auth::user()->hasPermission('access.users', 'CREATE')) {
            // Validate
            $this->validate($request, [
                'name'     => 'required',
                'email'    => 'required|email',
                'role'     => 'required',
                'password' => 'required',
            ]);

            // Create new user
            $user = new User;
            $user->name = $request['name'];
            $user->email = $request['email'];
            $user->role = $request['role'];
            $user->password = Hash::make($request['password']);
            $user->api_token = str_random(60);
            $user->dashboard_access = isset($request['dashboard_access']);
            $user->save();

            // Set role
            if ($request['role'] !== 'None') {
                $user->setRole($request['role']);
            }

            // Redirect Back
            return redirect()->back();
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Delete User
     *
     * @request DELETE
     * @path    delete
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function deleteDelete(Request $request)
    {
        if (Auth::user()->hasPermission('access.users', 'DELETE')) {
            // Check to see if the column exists
            $user = $this->user($request);

            if ($user->role != 'Admin') {
                // Delete associated permissions and login_history data
                Permissions::where('user', $user->id)->delete();
                LoginHistory::where('email', $user->email)->delete();

                // Queue a delete
                $this->dispatch(new DeleteCommand($user));

                // Return a success
                return 'success';
            } else {
                // Return a fail if the user attempting to be delete is an Admin
                return 'fail';
            }
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

}
