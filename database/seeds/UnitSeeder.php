<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Models\Unit;

// Seed the table
class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Delete the table
        DB::table('units')->delete();

        // Data for the table
        $data = [
            [ 'building' => '133', 'residence' => '4A', 'beds' => '2', 'baths' => '2', 'area' => '1500', 'exterior' => '1500',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],
            [ 'building' => '133', 'residence' => '6B', 'beds' => '3', 'baths' => '3', 'area' => '2250', 'exterior' => '1250',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],
            [ 'building' => '133', 'residence' => '7C', 'beds' => '2', 'baths' => '2.5', 'area' => '1750', 'exterior' => '1000',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],
            [ 'building' => '133', 'residence' => '9B', 'beds' => '3', 'baths' => '3', 'area' => '1750', 'exterior' => '500',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],
            [ 'building' => '133', 'residence' => '12B', 'beds' => '2', 'baths' => '2', 'area' => '2250', 'exterior' => '8000',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],
            [ 'building' => '133', 'residence' => '16A', 'beds' => '3', 'baths' => '3.5', 'area' => '2000', 'exterior' => '650',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],

            [ 'building' => '135', 'residence' => '4A', 'beds' => '2', 'baths' => '2', 'area' => '1250', 'exterior' => '925',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],
            [ 'building' => '135', 'residence' => '6B', 'beds' => '3', 'baths' => '3', 'area' => '2000', 'exterior' => '1000',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],
            [ 'building' => '135', 'residence' => '7C', 'beds' => '2', 'baths' => '2.5', 'area' => '3000', 'exterior' => '1250',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],
            [ 'building' => '135', 'residence' => '9B', 'beds' => '3', 'baths' => '3', 'area' => '1575', 'exterior' => '850',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],
            [ 'building' => '135', 'residence' => '12B', 'beds' => '2', 'baths' => '2', 'area' => '2750', 'exterior' => '750',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ],
            [ 'building' => '135', 'residence' => '16A', 'beds' => '3', 'baths' => '3.5', 'area' => '2250', 'exterior' => '650',  'price' => '2000000', 'cc' => '3000', 'taxes' => '2000',  'floor_plan' => '', 'available' => 1 ]
        ];

        // Unguard the table
        Model::unguard();

        // Seed the table
        foreach ($data as $row) {
            Unit::create([
                'building'   => $row['building'],
                'residence'  => $row['residence'],
                'beds'       => $row['beds'],
                'baths'      => $row['baths'],
                'area'       => $row['area'],
                'exterior'   => $row['exterior'],
                'price'      => $row['price'],
                'cc'         => $row['cc'],
                'taxes'      => $row['taxes'],
                'floor_plan' => $row['floor_plan'],
                'available'  => $row['available']
            ]);
        }

        // Reguard the table
        Model::reguard();
    }
}
