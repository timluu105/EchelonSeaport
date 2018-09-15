<?php namespace App\Roles;

class Press extends Role {

    /**
     * Role name
     *
     * @var string
     */
    protected $name = 'Press';

    /**
     * Permissions
     *
     * @var array
     */
    protected $permissions = [
        'press'          => [ 'READ' ],
        'press.articles' => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ]
    ];

}
