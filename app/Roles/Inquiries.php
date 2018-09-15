<?php namespace App\Roles;

class Inquiries extends Role {

    /**
     * Role name
     *
     * @var string
     */
    protected $name = 'Inquiries';

    /**
     * Permissions
     *
     * @var array
     */
    protected $permissions = [
        'inquiries'          => [ 'READ' ],
        'inquiries.view'     => [ 'READ' ],
        'inquiries.download' => [ 'READ' ]
    ];

}
