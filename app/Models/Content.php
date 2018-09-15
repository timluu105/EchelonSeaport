<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model {

    /**
     * Take a section id, name and return a boolean based on whether it exists
     *
     * @param int $section_id
     * @param string $name
     * @return boolean
     */
    public static function contentExists($section_id, $name)
    {
        return self::where('section_id', $section_id)->where('name', $name)->exists();
    }

    /**
     * Take a section id, name and return the associated data
     *
     * @param int $section_id
     * @param string $name
     * @return string
     */
    public static function getData($section_id, $name)
    {
        if (self::contentExists($section_id, $name)) {
            return self::select('data')->where('section_id', $section_id)->where('name', $name)->first()['data'];
        } else {
            return null;
        }
    }

}
