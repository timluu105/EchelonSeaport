<?php namespace App\Roles;

use App\Models\Permissions;
use App\User;
use Auth;

class Role {

    /**
     * Enabled roles
     *
     * @var array
     */
    public static $enabled_roles = [
        'content',
        'content.meta',
        'press',
        'press.articles',
        'availability',
        'availability.table',
        'access',
        'access.logins',
        'access.users'
    ];

    /**
     * Role name
     *
     * @var string
     */
    protected $name = 'Role';

    /**
     * Permissions
     *
     * @var array
     */
    protected $permissions = [
        'content'            => [],
        'content.meta'       => [],
        'press'              => [],
        'press.articles'     => [],
        'inquiries'          => [],
        'inquiries.view'     => [],
        'inquiries.download' => [],
        'availability'       => [],
        'availability.table' => [],
        'access'             => [],
        'access.logins'      => [],
        'access.users'       => []
    ];

    /**
     * User
     *
     * @var User
     */
    protected $user;

    /**
     * Name
     *
     * @return string
     */
    public function name()
    {
        return $this->name;
    }

    /**
     * Create a new Role instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
        $this->create();
    }

    /**
     * Create bits
     *
     * @return void
     */
    public function create()
    {
        foreach ($this->permissions as $page => $perms) {
            foreach ($perms as $perm) {
                // First try and get the permissions
                $p = Permissions::where('user', $this->user->id)->where('page', $page)->first();

                // If it is null then we create the permissions
                if (is_null($p)) {
                    $p = new Permissions;
                    $p->user = $this->user->id;
                    $p->page = $page;
                }

                // Get Bits ready
                $p->bits = $p->bits | Permissions::${$perm};

                // Save permissions
                $p->save();
            }
        }
    }

    /**
     * Get All Roles
     *
     * @return [] Role
     */
    public static function getAllRoles()
    {
        $roles = [ 'None' => 'None' ];

        foreach (glob(app_path() . '/Roles/*.php') as $r) {
            $role = basename($r, '.php');

            if ($role != 'Role' && in_array(strtolower($role), self::$enabled_roles) || $role == 'Admin' || $role == 'Echelon') {
                $roles = array_merge($roles, [ $role => $role ]);
            }
        }

        return $roles;
    }

    /**
     * Return true if permission is enabled, otherwise return false
     *
     * @return [] Role
     */
    public static function isEnabled($role)
    {
        foreach (self::$enabled_roles as $enabled_role) {
            if ($enabled_role == $role) {
                return true;
            }
        }

        return false;
    }

}
