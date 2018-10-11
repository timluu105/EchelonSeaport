<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pages extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'pages';

    /**
     * Take a page name and return a boolean based on whether it exists
     *
     * @param string $name
     * @return boolean
     */
    public static function pageExists($name)
    {
        return self::where('name', $name)->exists();
    }

    /**
     * Take a page name and return its id
     *
     * @param string $name
     * @return int
     */
    public static function getPageId($name)
    {
        return self::select('id')->where('name', $name)->first()['id'];
    }

    /**
     * Take a page name and return its title
     *
     * @param string $name
     * @return string
     */
    public static function getPageTitle($name)
    {
        return self::select('title')->where('name', $name)->first()['title'];
    }

    /**
     * Take a page name and an option and return a boolean based on whether that page has the option set
     *
     * @param string $name
     * @param string $option
     * @return boolean
     */
    public static function optionCheck($name, $option)
    {
        $options = explode(';', self::select('options')->where('name', $name)->first()['options']);
        $option_value = null;

        foreach ($options as $option_string) {
            $option_array = explode(':', $option_string);

            if ($option_array[0] == $option) {
                $option_value = $option_array[1];
                break;
            }
        }

        return $option_value;
    }

}
