<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Lang;
use App;

class Meta extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'meta';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'page',
        'enabled',
    ];

    /**
     * The default meta title
     *
     * @var string
     */
    const DEFAULT_TITLE = 'Title';

    /**
     * The default meta keywords
     *
     * @var string
     */
    const DEFAULT_KEYWORDS = 'These, Are, Keywords';

    /**
     * The default meta description
     *
     * @var string
     */
    const DEFAULT_DESCRIPTION = 'Description';

    /**
     * Strip the page name of slashes and replace it with periods.
     *
     * @param string $page
     * @return string $page
     */
    public static function stripPage($page)
    {
        return str_replace('/', '.', $page);
    }

    /**
     * Given a page name, figure out if it's a public page or not.
     *
     * @param string $page
     * @return string public or dashboard
     */
    public static function publicOrDashboard($page)
    {
        return strstr($page, 'dashboard') ? 'dashboard' : 'public';
    }

    /**
     * Get the default meta and create it if it doesn't exists
     *
     * @return Meta $default
     */
    public static function getDefault($project = null)
    {
        if (is_null($project)) {
            $default = self::where('page', 'default')->first();
        } else {
            $default = self::where('page', 'default')->where('project_id', $project)->first();
        }

        if (is_null($default)) {
            // If someone deleted the default meta then we create
            // a new one because we always need to have a default
            $default = new Meta;
            $default->page = 'default';
            $default->title = self::DEFAULT_TITLE;
            $default->description = self::DEFAULT_DESCRIPTION;
            $default->keywords = self::DEFAULT_KEYWORDS;
            if (!is_null($project)) $default->project_id = $project;
            $default->save();
        }

        return $default;
    }

    /**
     * Fill Meta with defaults if any are empty.
     *
     * @param Meta $meta
     * @return Meta $meta
     */
    public static function fillDefaultsIfEmpty(Meta $meta, $project = null)
    {
        // Get the default
        $default = self::getDefault($project);

        // Fill in if missing
        $meta->title = $meta->title == '' ? $default->title : $meta->title;
        $meta->description = $meta->description == '' ? $default->description : $meta->description;
        $meta->keywords = $meta->keywords == '' ? $default->keywords : $meta->keywords;

        // Return Meta
        return $meta;
    }

    /**
     * Given a request, find the correct meta object and return it.
     *
     * @param  \Illuminate\Http\Request $request
     * @return Meta
     */
    public static function at(Request $request)
    {
        $page = is_null($request->path) ? self::stripPage($request->path()) : self::stripPage($request->path);
        $fallback = self::publicOrDashboard($page);

        // Get the default meta
        $default = self::getDefault();

        // Try and find the page.
        $meta = self::where('page', $page)->first();

        if (!is_null($meta)) {
            // Make sure that the meta description is enabled. If it's
            // not enabled then we don't want to use this one and then
            // we use a fallback.
            if ($meta->enabled) return self::translate(self::fillDefaultsIfEmpty($meta));
        }

        if ($fallback === 'dashboard') {
            $meta = self::where('page', 'dashboard')->first();

            if (is_null($meta)) {
                // If someone deleted the default dashboard meta then
                // we create a new one because we always need to have
                // a default dashboard meta.
                $meta = new Meta;
                $meta->page = 'dashboard';
                $meta->title = 'Dashboard';
                $meta->description = '';
                $meta->keywords = '';
                $meta->save();
            }

            // Make sure that the meta description is enabled. If it's
            // not enabled then we don't want to use this one and then
            // we use a fallback.
            if ($meta->enabled) return self::translate(self::fillDefaultsIfEmpty($meta));
        }

        return self::translate(self::fillDefaultsIfEmpty($default));
    }

    static function translate(Meta $meta) {
    	$page = $meta->page;

    	if(Lang::has("site.page-titles." . $page)) {
    		$meta->title = Lang::get("site.page-titles." . $page);
		}

		return $meta;
	}
}
