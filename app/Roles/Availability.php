<?php namespace App\Roles;

class Availability extends Role {

    /**
     * Role name
     *
     * @var string
     */
    protected $name = 'Availability';

    /**
     * Permissions
     *
     * @var array
     */
    protected $permissions = [
        'availability'       => [ 'READ' ],
        'availability.table' => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ]
    ];

}
