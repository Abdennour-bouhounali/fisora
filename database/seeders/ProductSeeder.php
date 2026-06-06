<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name'        => 'Menthe en Poudre',
                'description' => 'Menthe fraîche concentrée, déshydratée naturellement. 100g = 700-800g de menthe fraîche.',
                'description_points' => ['100% Naturel', 'Sans conservateurs', 'Déshydraté naturellement'],
                'price'       => 650,
                'stock'       => 100,
                'category'    => 'wellness',
                'weight'      => '50g',
                'images'      => ['/images/products/mint.png'],
                'tags'        => ['menthe', 'naturel', 'poudre'],
                'is_active'   => true,
            ],
            [
                'name'        => 'Citron en Poudre',
                'description' => 'Citron méditerranéen concentré. 100g de poudre = 1kg de citrons frais.',
                'description_points' => ['100% Naturel', 'Sans conservateurs', 'Riche en vitamine C'],
                'price'       => 700,
                'stock'       => 80,
                'category'    => 'wellness',
                'weight'      => '50g',
                'images'      => ['/images/products/lemon.png'],
                'tags'        => ['citron', 'naturel', 'poudre', 'vitamine C'],
                'is_active'   => true,
            ],
            [
                'name'        => 'Orange en Poudre',
                'description' => 'Orange solaire concentrée. 100g de poudre = 1kg d\'oranges fraîches.',
                'description_points' => ['100% Naturel', 'Sans conservateurs', 'Riche en antioxydants'],
                'price'       => 700,
                'stock'       => 90,
                'category'    => 'wellness',
                'weight'      => '50g',
                'images'      => ['/images/products/orange.png'],
                'tags'        => ['orange', 'naturel', 'poudre'],
                'is_active'   => true,
            ],
            [
                'name'        => 'Ail en Poudre',
                'description' => 'Ail concentré 10× plus intense que l\'ail frais.',
                'description_points' => ['100% Naturel', 'Sans conservateurs', '10× concentré'],
                'price'       => 550,
                'stock'       => 120,
                'category'    => 'culinary',
                'weight'      => '50g',
                'images'      => ['/images/products/garlic.png'],
                'tags'        => ['ail', 'naturel', 'cuisine', 'épices'],
                'is_active'   => true,
            ],
            [
                'name'        => 'Oignon Violet en Poudre',
                'description' => 'Oignon violet doux et complexe. Profondeur alliacée naturelle.',
                'description_points' => ['100% Naturel', 'Sans conservateurs', 'Saveur intense'],
                'price'       => 600,
                'stock'       => 100,
                'category'    => 'culinary',
                'weight'      => '50g',
                'images'      => ['/images/products/onion.png'],
                'tags'        => ['oignon', 'naturel', 'cuisine'],
                'is_active'   => true,
            ],
            [
                'name'        => 'Mélange Méditerranéen',
                'description' => 'Le fondement de chaque plat. Mélange de base méditerranéen.',
                'description_points' => ['100% Naturel', 'Prêt à l\'emploi', 'Recette exclusive'],
                'price'       => 850,
                'stock'       => 60,
                'category'    => 'solutions',
                'weight'      => '50g',
                'images'      => [],
                'tags'        => ['mélange', 'méditerranéen', 'base'],
                'is_active'   => true,
            ],
        ];

        foreach ($products as $data) {
            $data['slug'] = Str::slug($data['name']);
            Product::updateOrCreate(['slug' => $data['slug']], $data);
        }

        $this->command->info('✅ ' . count($products) . ' products seeded.');
    }
}
