<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = [
            ['name' => 'Richard', 'email' => 'malcarichard6@gmail.com', 'password' => bcrypt('73629806')],
        ];

        DB::table('admins')->insert($admins);
    }
}
