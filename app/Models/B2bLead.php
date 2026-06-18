<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class B2bLead extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_name',
        'contact_name',
        'email',
        'phone',
        'business_type',
        'monthly_usage',
        'products_of_interest',
        'language',
    ];

    protected $casts = [
        'products_of_interest' => 'array',
    ];
}
