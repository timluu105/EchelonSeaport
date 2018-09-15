<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'units';

    // Available buildings
    public static $buildings = [ '133', '135' ];

    // Return all available units
    public static function getAvailableUnits()
    {
        $buildings = [];

        foreach (self::where('available', 1)->get() as $unit) {
            $unit_push = [
                'residence' => $unit->residence,
                'beds' => $unit->beds,
                'baths' => $unit->baths,
                'area' => number_format(round((float) $unit->area, 1)),
                'exterior' => number_format(round((float) $unit->exterior, 1)),
                'price' => number_format((float) $unit->price, 0, '.', ','),
                'cc' => number_format((float) $unit->cc, 0, '.', ','),
                'taxes' => number_format((float) $unit->taxes, 0, '.', ','),
                'floor_plan' => $unit->floor_plan != '' && file_exists(base_path() . '/public/img/floorplans/' . $unit->floor_plan . '.jpg') ? ('/img/floorplans/' . $unit->floor_plan . '.jpg') : ''
            ];

            if (!array_key_exists($unit->building, $buildings)) {
                $buildings[$unit->building] = [];
            }

            array_push($buildings[$unit->building], $unit_push);
        }

        return $buildings;
    }

}
