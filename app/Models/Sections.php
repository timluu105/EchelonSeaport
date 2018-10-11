<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Image;
use File;
use Parsedown;

use App\Models\Pages;
use App\Models\ContentString;
use App\Models\ContentText;
use App\Models\ContentInteger;

class Sections extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'sections';

    /**
     * An array containing the set of section types (valid column values: string|text|integer|image) and the display column name
     *
     * NOTE: These should match the set of blades in resources/views/section-types
     *
     * @var array
     */
    public static $section_types = [
        'full-bleed-image' => [
            'display'      => 'image',
            'image'        => 'image',
            'halign'       => 'select',
            'valign'       => 'select',
            'subnav-title' => 'string'
        ],

        'inset-image' => [
            'display'      => 'image',
            'image'        => 'image',
            'halign'       => 'select',
            'valign'       => 'select',
            'subnav-title' => 'string'
        ],

        'captioned-image' => [
            'display'      => 'image|title',
            'title'        => 'string',
            'body'         => 'text',
            'image'        => 'image',
            'halign'       => 'select',
            'valign'       => 'select',
            'margin'       => 'select',
            'subnav-title' => 'string'
        ],

        'stripe' => [
            'display'      => 'subtitle|title',
            'subtitle'     => 'string',
            'title'        => 'string',
            'body'         => 'text',
            'subnav-title' => 'string'
        ],

        'title-image-column' => [
            'display'      => 'image|subtitle|title',
            'subtitle'     => 'string',
            'title'        => 'string',
            'body'         => 'text',
            'image'        => 'image',
            'halign'       => 'select',
            'valign'       => 'select',
            'subnav-title' => 'string'
        ],

        'dual-image-column' => [
            'display'      => 'image|titleimage|title',
            'title'        => 'string',
            'body'         => 'text',
            'titleimage'   => 'image',
            'image'        => 'image',
            'halign'       => 'select',
            'valign'       => 'select',
            'order'        => 'select',
            'bgcolor'      => 'select',
            'subnav-title' => 'string'
        ],

        'quote-box' => [
            'display'      => 'quote',
            'quote'        => 'text',
            'logo'         => 'select',
            'subnav-title' => 'string'
        ],

        'singular-destination' => [
            'display'         => 'title',
            'title'           => 'string',
            'subnav-title'    => 'string',
            'special-section' => true
        ],

        'one-thirty-five-seaport' => [
            'display'         => 'title',
            'title'           => 'string',
            'subnav-title'    => 'string',
            'special-section' => true
        ]
    ];

    /**
     * An array containing the set of select type names and the options for each
     *
     * @var array
     */
    public static $select_options = [
        'theme'   => [ 'white', 'black' ],
        'halign'  => [ 'center', 'left', 'right' ],
        'valign'  => [ 'center', 'top', 'bottom' ],
        'margin'  => [ 'inset', 'full-bleed' ],
        'order'   => [ 'title-image', 'image-title' ],
        'bgcolor' => [ 'transparent', 'tan' ],
        'logo'    => [ 'none', 'building' ]
    ];

    /**
     * A string containing the path of the image uploads directory
     *
     * @var string
     */
    public static $image_uploads_dir = '/uploads/img/';

    /**
     * Take a section id and return a boolean based on whether it exists
     *
     * @param integer $id
     * @return boolean
     */
    public static function sectionExists($id)
    {
        return self::where('id', $id)->exists();
    }

    /**
     * Take a section id and return a boolean based on whether it's enabled
     *
     * @param integer $id
     * @return boolean
     */
    public static function isEnabled($id)
    {
        return self::select('enabled')->where('id', $id)->first()['enabled'];
    }

    /**
     * Take a section id and return its timestamp
     *
     * @param integer $id
     * @return boolean
     */
    public static function getTimestamp($id)
    {
        return strtotime(self::find($id)->updated_at);
    }

    /**
     * Take a section id and return its type
     *
     * @param integer $id
     * @return string
     */
    public static function getSectionType($id)
    {
        return self::select('type')->where('id', $id)->first()['type'];
    }

    /**
     * Return an array of section types
     *
     * @return array
     */
    public static function getSectionTypes()
    {
        return array_keys(self::$section_types);
    }

    /**
     * Take a section type and return a boolean based on whether the type exists
     *
     * @param string $type
     * @return boolean
     */
    public static function sectionTypeExists($type)
    {
        return array_key_exists($type, self::$section_types);
    }

    /**
     * Take a section type and return an array of columns and their types
     *
     * @param string $type
     * @return array
     */
    public static function getSectionTypeColumns($type)
    {
        return self::sectionTypeExists($type) ? array_diff_key(self::$section_types[$type], [ 'display' => '' ]) : null;
    }

    /**
     * Take a select column name and return an array of select options
     *
     * @param string $type
     * @return array
     */
    public static function getSelectOptions($name)
    {
        return array_key_exists($name, self::$select_options) ? self::$select_options[$name] : null;
    }

    /**
     * Take a column type and return an instance of the respective model
     *
     * @param string $type
     * @return instance
     */
    public static function getContentModel($type, $section_id = null, $name = null)
    {
        $new = is_null($section_id) || is_null($name);
        $content = null;

        switch($type) {
            case 'string':
            case 'select':
                $content = $new ? new ContentString : ContentString::where('section_id', $section_id)->where('name', $name)->first();
                break;
            case 'text':
                $content = $new ? new ContentText : ContentText::where('section_id', $section_id)->where('name', $name)->first();
                break;
            case 'integer':
                $content = $new ? new ContentInteger : ContentInteger::where('section_id', $section_id)->where('name', $name)->first();
                break;
        }

        return $content;
    }

    /**
     * Take a page name and return an array of sections matching that page
     *
     * @param string $name
     * @return array
     */
    public static function getPageSections($name)
    {
        return self::where('page_id', Pages::getPageId($name))->orderBy('order')->get();
    }

    /**
     * Take a section id and return the display value
     *
     * @param integer $id
     * @return string
     */
    public static function getDisplay($id)
    {
        $type = self::getSectionType($id);
        $separator = '&nbsp;|&nbsp;';

        if (self::sectionTypeExists($type)) {
            $type_array = self::$section_types[$type];
            $display = '';

            foreach (explode('|', $type_array['display']) as $display_name) {
                $content_model = self::getContentModel($type_array[$display_name]);

                if (!is_null($content_model)) {
                    $data = $content_model::getData($id, $display_name);

                    if ($data != '') {
                        if ($display != '') {
                            $display .= $separator;
                        }

                        $display .= preg_replace('/<br[^>]*>/', ' ', $content_model::getData($id, $display_name));
                    }
                } else if ($type_array[$display_name] == 'image') {
                    $image_path = self::$image_uploads_dir . $id . '-' . $display_name . '.jpg';

                    if (file_exists(base_path() . '/public/' . $image_path)) {
                        $image_path .= '?version=' . self::getTimestamp($id);

                        if ($display != '') {
                            $display .= $separator;
                        }

                        $display .= "<a class='display-image' href='$image_path' target='_blank' title='Click for preview'><img src='$image_path' /></a>";
                    }
                }
            }

            return "<div class='display'>$display</div><div class='section-type'>($type)</div>";
        } else {
            return null;
        }
    }

    /**
     * Take a section id and return an array of its data
     *
     * @param integer $id
     * @param boolean $process_markdown (optional)
     * @return array
     */
    public static function getSectionContent($id, $process_markdown = false, $replace_nonchars = true)
    {
        if (self::sectionExists($id)) {
            $section_type = self::getSectionType($id);
            $section_content = [];

            foreach (self::getSectionTypeColumns($section_type) as $name => $type) {
                if ($type === 'image') {
                    array_push($section_content, [
                        'name' => $name,
                        'type' => $type
                    ]);
                } else {
                    $content = self::getContentModel($type);

                    if (!is_null($content)) {
                        if ($process_markdown && ($type === 'text')) {
                            $data = Parsedown::instance()->setBreaksEnabled(true)->setMarkupEscaped(true)->parse($content::getData($id, $name));
                        } else {
                            $data = $content::getData($id, $name);
                        }

                        if ($replace_nonchars) $data = preg_replace('/[^[:print:]]/', ' ', $data);

                        array_push($section_content, [
                            'name' => $name,
                            'type' => $type,
                            'data' => $data
                        ]);
                    }
                }
            }

            return $section_content;
        } else {
            return null;
        }
    }

    /**
     * Take a page name and return an array of its sections
     *
     * @param string $page
     * @return array
     */
    public static function getEnabledPageSectionsContent($page, $preview)
    {
        // Get the page id associated for the provided page name
        $sort_style = Pages::optionCheck($page, 'sort-style');
        $sections = [];

        if ($sort_style === 'reorder') {
            $sort_column = 'order';
        } else if ($sort_style === 'column') {
            $sort_column = Pages::optionCheck($page, 'sort-column');
        } else {
            $sort_column = 'created_at';
        }

        $sections_query = self::where('page_id', Pages::getPageId($page))->where('enabled', true);

        // Check to see if a section should be previewed
        if ($preview != 'null') {
            $preview = explode('|', $preview);

            if ($preview[0] == $page) {
                $sections_query->orWhere('id', $preview[1]);
            }
        }

        foreach ($sections_query->orderBy($sort_column)->get() as $section) {
            $section_data = self::getSectionContent($section->id, true);
            $data_array = [];
            $data_array['id'] = $section->id;
            $data_array['timestamp'] = self::getTimestamp($section->id);

            foreach ($section_data as $data) {
                $key = $data['name'];
                $value = $data['type'] === 'image' ? self::$image_uploads_dir . $section->id . '-' . $key . '.jpg?version=' . $data_array['timestamp'] : $data['data'];
                $data_array[$key] = $value;
            }

            array_push($sections, [ $section->type, $data_array ]);
        }

        return $sections;
    }

}
