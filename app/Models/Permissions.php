<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permissions extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'permissions';

    /**
     * READ
     *
     * 0001 / 1
     *
     * @var public staticant integer
     */
    public static $READ = 1;

    /**
     * UPDATE
     *
     * 0010 / 2
     *
     * @var public staticant integer
     */
    public static $UPDATE = 2;

    /**
     * CREATE
     *
     * 0100 / 4
     *
     * @var public staticant integer
     */
    public static $CREATE = 4;


    /**
     * DELETE
     *
     * 1000 / 8
     *
     * @var public staticant integer
     */
    public static $DELETE = 8;

    /**
     * Has
     *
     * @var perms
     * @return bool true/false
     */
    public function has($perm) {
        return $this->bits & self::${$perm};
    }

}
