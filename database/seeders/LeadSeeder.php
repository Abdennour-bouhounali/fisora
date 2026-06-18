<?php

namespace Database\Seeders;

use App\Models\B2bLead;
use App\Models\Product;
use App\Models\ProductInteraction;
use App\Models\WaitlistLead;
use Illuminate\Database\Seeder;

class LeadSeeder extends Seeder
{
    public function run()
    {
        $products = Product::all();
        if ($products->isEmpty()) {
            return;
        }

        $languages = ['en', 'fr', 'ar'];
        
        $firstNames = ['Sofiane', 'Sarah', 'Karim', 'Amine', 'Yasmine', 'Mehdi', 'Meriem', 'Farid', 'Emma', 'John', 'Thomas'];
        $lastNames = ['Boudiaf', 'Mansouri', 'Kaci', 'Ould', 'Berrabah', 'Ghezzal', 'Ziri', 'Belkacem', 'Smith', 'Dupont', 'Muller'];
        $cities = ['Alger', 'Oran', 'Constantine', 'Ghardaïa', 'Paris', 'Marseille', 'London', 'Tunis'];
        $countries = ['Algeria', 'Algeria', 'Algeria', 'Algeria', 'France', 'France', 'United Kingdom', 'Tunisia'];

        $productInterestOptions = [
            'Garlic Concentrate',
            'Purple Onion Concentrate',
            'Mediterranean Base',
            'Mint Concentrate',
            'Lemon Concentrate',
            'Orange Concentrate'
        ];

        // 1. Create Product Interactions (views & clicks)
        foreach ($products as $product) {
            foreach ($languages as $lang) {
                // Views
                $viewCount = rand(20, 50);
                for ($i = 0; $i < $viewCount; $i++) {
                    ProductInteraction::create([
                        'product_id' => $product->id,
                        'interaction_type' => 'view',
                        'language' => $lang,
                        'created_at' => now()->subDays(rand(0, 15)),
                    ]);
                }

                // Clicks
                $clickCount = rand(5, $viewCount / 2);
                for ($i = 0; $i < $clickCount; $i++) {
                    ProductInteraction::create([
                        'product_id' => $product->id,
                        'interaction_type' => 'cta_click',
                        'language' => $lang,
                        'created_at' => now()->subDays(rand(0, 15)),
                    ]);
                }

                // Waitlist registrations
                $regCount = rand(1, $clickCount);
                for ($i = 0; $i < $regCount; $i++) {
                    ProductInteraction::create([
                        'product_id' => $product->id,
                        'interaction_type' => 'waitlist_registration',
                        'language' => $lang,
                        'created_at' => now()->subDays(rand(0, 15)),
                    ]);
                }
            }
        }

        // 2. Create Consumer Waitlist Leads
        for ($i = 0; $i < 25; $i++) {
            $langIndex = rand(0, 2);
            $lang = $languages[$langIndex];
            $fName = $firstNames[rand(0, count($firstNames) - 1)];
            $lName = $lastNames[rand(0, count($lastNames) - 1)];
            $cityIndex = rand(0, count($cities) - 1);

            WaitlistLead::create([
                'name' => "$fName $lName",
                'email' => strtolower($fName . '.' . $lName . rand(10, 99) . '@example.com'),
                'phone' => '0' . rand(5, 7) . rand(10000000, 99999999),
                'country' => $countries[$cityIndex],
                'city' => $cities[$cityIndex],
                'product_interest' => $productInterestOptions[rand(0, count($productInterestOptions) - 1)],
                'language' => $lang,
                'created_at' => now()->subDays(rand(0, 15)),
            ]);
        }

        // 3. Create B2B Leads
        $businessTypes = ['Restaurant', 'Café', 'Caterer', 'Food Business', 'Other'];
        $businessNames = ['Gourmet Med Bistro', 'Le Café Vert', 'El Hana Catering', 'Smart Food Packagers', 'Bio Oasis Kitchens'];
        
        for ($i = 0; $i < 6; $i++) {
            $fName = $firstNames[rand(0, count($firstNames) - 1)];
            $lName = $lastNames[rand(0, count($lastNames) - 1)];
            $lang = $languages[rand(0, 2)];

            // Select 2-3 products randomly
            $prodsOfInterest = [];
            $count = rand(1, 3);
            $keys = array_rand($productInterestOptions, $count);
            if (is_array($keys)) {
                foreach ($keys as $k) {
                    $prodsOfInterest[] = $productInterestOptions[$k];
                }
            } else {
                $prodsOfInterest[] = $productInterestOptions[$keys];
            }

            B2bLead::create([
                'business_name' => $businessNames[$i % count($businessNames)],
                'contact_name' => "$fName $lName",
                'email' => strtolower('partner.' . str_replace(' ', '', $businessNames[$i % count($businessNames)]) . '@example.com'),
                'phone' => '0' . rand(5, 7) . rand(10000000, 99999999),
                'business_type' => $businessTypes[rand(0, count($businessTypes) - 1)],
                'monthly_usage' => 'Usage estimation: Approximately ' . rand(10, 50) . ' kg of concentrated powders per month for marinades and seasoning.',
                'products_of_interest' => $prodsOfInterest,
                'language' => $lang,
                'created_at' => now()->subDays(rand(0, 15)),
            ]);
        }
    }
}
