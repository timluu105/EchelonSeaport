<?php namespace App\Http\Controllers;

use Config;
use App\Commands\MailCommand;
use App\Commands\HubspotPost;
use App\Commands\MailChimpCommand;
use App\Models\Meta;
use App\Models\Inquiry;
use App\Models\Unit;
use App\Models\Pages;
use App\Models\Sections;
use App\Models\Press;
use Illuminate\Http\Request;

class ApiController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        if ((env('APP_ENV') != 'production') && !Config::get('app.debug')) {
            $this->middleware('auth:api');
        }
    }

    public function postMeta(Request $request)
    {
        // Make sure the path is provided
        $this->validate($request, [ 'path' => 'required' ]);

        return Meta::at($request);
    }

    public function getUnits()
    {
        return Unit::getAvailableUnits();
    }

    public function getPress()
    {
        return Press::getEnabledPressArticles();
    }

    public function getSubnavLinks() {
        $subnav = [];

        foreach (Pages::get() as $page) {
            $page_name = $page['name'];
            $subnav[$page_name] = [];

            foreach (Sections::getEnabledPageSectionsContent($page_name, 'null') as $section) {
                if (array_key_exists('subnav-title', $section[1])) {
                    $title = $section[1]['subnav-title'];

                    if (!is_null($title) && $title != '' && preg_match('/[a-zA-Z0-9]/', $title)) {
                        array_push($subnav[$page_name], [
                            'title' => $title,
                            'id' => strtolower(preg_replace([ '/\ \ */', '/[^a-zA-Z0-9\-]/' ], [ '-', '' ], $title))
                        ]);
                    }
                }
            }
        }

        return $subnav;
    }

    public function postPageContent(Request $request)
    {
        // Make sure the page has been provided
        $this->validate($request, [ 'page' => 'required' ]);

        return [
            'title' => Pages::getPageTitle($request['page']),
            'sections' => Sections::getEnabledPageSectionsContent($request['page'], $request['preview'])
        ];
    }

    public function postRegister(Request $request)
    {
        // Make sure required fields are filled in
        $this->validate($request, [
            'first_name'   => 'required',
            'last_name'   => 'required',
            'email'  => 'required|email'
        ]);

        // Store the client's IP address in the request

        // If we get this far then we have the right stuff
        // so now we want to create a new model.
        $i = new Inquiry;

        // Add values to model
        foreach (Inquiry::getInquiryColumnNames() as $column) {
            if ($column !== 'created_at' && $column !== 'ipaddress') {
                $i[$column] = $request[$column];
            }
        }

        // Store the IP address
        $i['ipaddress'] = $request->ip();

        // Save into database
        $i->save();

        // Send mail
        $this->dispatch(new MailCommand($i));

        // Send to Hubspot
        $this->dispatch(new HubspotPost($i));

        // Send to MailChimp
        $this->dispatch(new MailChimpCommand($i));

        // Return a success
        return 'success';
    }

}
