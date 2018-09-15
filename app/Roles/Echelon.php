<?php namespace App\Roles;

class Echelon extends Role {

    /**
     * Role name
     *
     * @var string
     */
    protected $name = 'Echelon';

    /**
     * Permissions
     *
     * @var array
     */
    protected $permissions = [
        'content'            => [ 'READ' ],
        'content.meta'       => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ],
        'press'              => [ 'READ' ],
        'press.articles'     => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ],
        'inquiries'          => [ 'READ' ],
        'inquiries.view'     => [ 'READ' ],
        'inquiries.download' => [ 'READ' ],
        'availability'       => [ 'READ' ],
        'availability.table' => [ 'READ', 'UPDATE', 'CREATE', 'DELETE' ]
    ];

}
