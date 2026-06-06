<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@fisora.shop'],
            [
                'name'     => 'Admin FISORA',
                'email'    => 'admin@fisora.shop',
                'password' => Hash::make('Admin@Fisora2026!'),
                'is_admin' => true,
            ]
        );

        $this->command->info('✅ Admin user created: admin@fisora.shop / Admin@Fisora2026!');
    }
}
