<?php namespace App\Roles;

class Editor extends Role {

    /**
     * Role name
     *
     * @var string
     */
    protected $name = 'Editor';

    /**
     * Permissions
     *
     * @var array
     */
    protected $permissions = [
        'content'       => [ 'READ' ],
        'content.meta'  => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ]
    ];

}
