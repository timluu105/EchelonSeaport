<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;

// Seed the table
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Delete the permissions and users tables
        DB::table('permissions')->delete();
        DB::table('users')->delete();

        // Add the Admin user if ADMIN_PASS has been set
        if (env('ADMIN_PASS', null) != null) {
            $user = User::create([
                'id'        => 1,
                'name'      => 'Admin',
                'email'     => 'admin@admin.com',
                'password'  => Hash::make(env('ADMIN_PASS')),
                'api_token' => str_random(60)
            ]);

            $user->dashboard_access = true;
            $user->save();
            $user->setRole('Admin');
        }

        // Add the View user if VIEW_PASS has been set
        if (env('VIEW_PASS', null) != null) {
            User::create([
                'id'        => 2,
                'name'      => 'View',
                'email'     => 'view@view.com',
                'password'  => Hash::make(env('VIEW_PASS')),
                'api_token' => str_random(60)
            ]);
        }
    }
}
