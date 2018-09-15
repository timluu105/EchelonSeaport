<?php

namespace App;

use App\Roles\Role;
use App\Models\Permissions;
use App\Models\LoginHistory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'api_token', 'remember_token'
    ];

    /**
     * If the user has dashboard access or not.
     *
     * @return boolean
     */
    public function hasDashboardAccess()
    {
        return $this->dashboard_access;
    }

    /**
     * Set Role
     *
     * @param string
     * @return void
     */
    public function setRole($role = null)
    {
        if (is_null($role)) return false;
        $this->resetRole();
        $role = "App\\Roles\\$role";
        $role = new $role($this);
        $this->role = $role->name();
        $this->save();
    }

    /**
     * Reset Role
     *
     * @return void
     */
    private function resetRole()
    {
        foreach(Permissions::where('user', $this->id)->get() as $p) {
            $p->delete();
        }
    }

    /**
     * Has Permission
     *
     * @var page
     * @var type - default 'READ'
     * @return bool true/false
     */
    public function hasPermission($page, $type = 'READ')
    {
        $perms = Permissions::where('user', $this->id)->where('page', $page)->first();

        if (is_null($perms) || !Role::isEnabled($page)) {
            return false;
        }

        return $perms->has($type);
    }

    /**
     * List Perms
     *
     * @return array of permissions
     */
    public function listPerms()
    {
        $perms = [];

        foreach (Permissions::where('user', $this->id)->get() as $permission) {
            if (Role::isEnabled($permission->page)) {
                array_push($perms, $permission);
            }
        }

        return $perms;
    }

    /**
     * Last Login Attempt
     *
     * @return date containing the most recent login attempt
     */
    public function lastLoginAttempt()
    {
        if (LoginHistory::where('email', $this->email)->exists()) {
            return date('M j, Y - g:i A', strtotime(LoginHistory::where('email', $this->email)->latest()->first()->created_at));
        } else {
            return "";
        }
    }
}
