<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductInteraction extends Model
{
    public $timestamps = false; // We only use created_at

    protected $fillable = [
        'product_id',
        'interaction_type',
        'language',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
