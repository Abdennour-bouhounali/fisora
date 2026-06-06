<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'description_points', 'price', 'stock',
        'category', 'slug', 'images', 'weight', 'is_active', 'tags',
    ];

    protected $casts = [
        'description_points' => 'array',
        'images' => 'array',
        'tags' => 'array',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
    ];

    protected static function booted(): void
    {
        static::creating(function (Product $product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
