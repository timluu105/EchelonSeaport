<?php namespace App\Http\Controllers\Dashboard;

use Auth;
use App\Commands\DeleteCommand;
use App\Commands\ReorderCommand;
use App\Commands\UpdateSectionsCommand;
use App\Models\Pages;
use App\Models\Sections;
use App\Models\ContentString;
use App\Models\ContentText;
use App\Models\ContentInteger;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SectionsController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Sections Controller
    |--------------------------------------------------------------------------
    */

    /**
     * Create a New Controller Instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('dashboard_access');
    }

    /**
     * Get Section
     *
     * @param  \Illuminate\Http\Request $request
     * @return \App\Models\Section OR null
     */
    public function section(Request $request)
    {
        return Sections::find($request['id']);
    }

    /**
     * Create Section
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function postNew(Request $request)
    {
        if (Auth::user()->hasPermission('content.pages', 'CREATE')) {
            // Validate
            $this->validate($request, [
                'page' => 'required',
                'type' => 'required'
            ]);

            if (Pages::pageExists($request['page']) && Sections::sectionTypeExists($request['type'])) {
                return Sections::createSection($request['page'], $request['type']);
            } else {
                // Return a fail if either the page name or section type don't exist
                return 'fail';
            }
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Image Upload
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function postImageUpload(Request $request)
    {
        if (Auth::user()->hasPermission('content.pages', 'UPDATE')) {
            // Ensure the file path has been provided
            $this->validate($request, [ 'path' => 'required' ]);

            if ($request->hasFile('file')) {
                Sections::saveImage($request, $request['path']);
            } else {
                return 'fail';
            }

            return 'success';
        } else {
            return 'fail';
        }
    }

    /**
     * Image Edit
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function postImageEdit(Request $request)
    {
        if (Auth::user()->hasPermission('content.pages', 'UPDATE')) {
            // Ensure the file path has been provided
            $this->validate($request, [
                'id' => 'required',
                'image' => 'required',
                'x' => 'required',
                'y' => 'required',
                'width' => 'required',
                'height' => 'required'
            ]);

            // Bump the updated_at timestamp
            $this->section($request)->touch();

            // Edit the image and return the success status
            return Sections::editImage(base_path() . '/public' . $request['image'], $request['width'], $request['height'], $request['x'], $request['y']);
        } else {
            return 'fail';
        }
    }

    /**
     * Update Section
     *
     * @request POST
     * @path    update
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function postUpdate(Request $request)
    {
        if (Auth::user()->hasPermission('content.pages', 'UPDATE')) {
            // Make sure required fields are filled in
            $this->validate($request, [
                'id'     => 'required',
                'values' => 'required'
            ]);

            if (Sections::setSectionContent($request['id'], $request['values'])) {
                return 'success';
            } else {
                return 'fail';
            }

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Update Section Row
     *
     * @request PUT
     * @path    edit
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function putEdit(Request $request)
    {
        if (Auth::user()->hasPermission('content.pages', 'UPDATE')) {
            // Check to see if the column exists
            $section = $this->section($request);

            if (is_null($section)) {
                return 'fail';
            }

            // Queue an update
            $this->dispatch(new UpdateSectionsCommand($section, $request['name'], $request['value']));

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Delete Section
     *
     * @request DELETE
     * @path    delete
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function deleteDelete(Request $request)
    {
        if (Auth::user()->hasPermission('content.pages', 'DELETE')) {
            // Check to see if the column exists
            $section = $this->section($request);

            if (is_null($section)) {
                return 'fail';
            }

            // Delete images associated with the section
            foreach (Sections::getSectionTypeColumns($section->type) as $name => $type) {
                if ($type === 'image') {
                    $image_file = base_path() . '/public' . Sections::$image_uploads_dir . $section->id . '-' . $name . '.jpg';

                    if (file_exists($image_file)) {
                        if (!unlink($image_file)) {
                            return 'fail';
                        }
                    }
                }
            }

            // Queue a delete
            $this->dispatch(new DeleteCommand($section));

            // Return a success
            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

    /**
     * Reorder Section Rows
     *
     * @request PATCH
     * @path    reorder
     *
     * @param   \Illuminate\Http\Request $request
     * @return  string 'success' or 'fail'
     */
    public function patchReorder(Request $request)
    {
        if (Auth::user()->hasPermission('content.pages', 'UPDATE')) {
            // Queue a reorder
            $this->dispatch(new ReorderCommand('\App\Models\Sections', $request['order']));

            return 'success';
        } else {
            // Return a fail if the user lacks the required permission
            return 'fail';
        }
    }

}
