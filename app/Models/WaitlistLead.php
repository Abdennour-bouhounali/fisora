<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WaitlistLead extends Model
{
    use HasFactory;

protected $fillable = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'street_address',
    'postal_code',
    'city',
    'country',
    'product_interest',
    'language',
];
}
