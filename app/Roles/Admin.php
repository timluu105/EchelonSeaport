<?php namespace App\Roles;

class Admin extends Role {

    /**
     * Role name
     *
     * @var string
     */
    protected $name = 'Admin';

    /**
     * Permissions
     *
     * @var array
     */
    protected $permissions = [
        'content'            => [ 'READ' ],
        'content.meta'       => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ],
        'access'             => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ],
        'access.logins'      => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ],
        'access.users'       => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ],
        'press'              => [ 'READ' ],
        'press.articles'     => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ],
        'inquiries'          => [ 'READ' ],
        'inquiries.view'     => [ 'READ' ],
        'inquiries.download' => [ 'READ' ],
        'availability'       => [ 'READ' ],
        'availability.table' => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ]
    ];

}
