<?php namespace App\Http\Controllers;

use App\Models\Meta;
use App\User;
use UAParser\Parser;

class DashboardController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Dashboard Controller
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
     * Get the home dashboard page.
     *
     * @return Response
     */
    public function getDashboard()
    {
        return view('templates.dashboard');
    }

    /**
     * Show the application dashboard to the user.
     *
     * @return Response
     */
    public function getPage()
    {
        return view('templates.dashboard');
    }

    /**
     * Load the content for the page in question.
     *
     * @param  string first page
     * @param  string second page
     * @return Response
     */
    public function getContent($page = null, $page2 = null, $arg = null, $arg2 = null)
    {
        // If the first page is null, we're on the homepage of the project category.
        if (is_null($page)) {
            //
            // Route: /dashboard/
            //
            return view('dashboard.pages.index');
        }

        // If the second page is null we're on the homepage of the project category
        // first page.
        if (is_null($page2)) {
            //
            // Route: /dashboard/{page}
            //
            return view("dashboard.pages.$page.index");
        }

        $name = '';
        $data = null;

        switch($page2) {
            case 'logins':
                $name = 'parser';
                $data = Parser::create();
                break;
        }

        //
        // Route: /dashboard/{page}/{subpage}/{arg1}/{arg2}
        //
        return view("dashboard.pages.$page.$page2", [
            'arg1' => $arg,
            'arg2' => $arg2
        ])->with($name, $data);
    }

    /**
     * Load the subnav for the page in question.
     *
     * @param  string page
     * @return Response
     */
    public function getSubnav($page = 'index')
    {
        return view("dashboard.subnav.$page");
    }

}
