<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_revenue'  => Order::whereIn('status', ['confirmed', 'processing', 'shipped', 'delivered'])->sum('total'),
            'total_orders'   => Order::count(),
            'total_products' => Product::where('is_active', true)->count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
        ];

        $recent_orders = Order::with('items')
            ->latest()
            ->limit(5)
            ->get();

        $status_stats = Order::selectRaw('status as _id, count(*) as count')
            ->groupBy('status')
            ->get();

        $low_stock_products = Product::where('stock', '<', 10)
            ->select('id', 'name', 'stock')
            ->limit(5)
            ->get();

        // Dummy monthly revenue for now, or aggregate if needed.
        $monthly_revenue = [
            ['_id' => 'Jan', 'revenue' => 12000],
            ['_id' => 'Feb', 'revenue' => 19000],
            ['_id' => 'Mar', 'revenue' => 15000],
            ['_id' => 'Apr', 'revenue' => 22000],
            ['_id' => 'May', 'revenue' => 28000],
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats'              => $stats,
            'recent_orders'      => $recent_orders,
            'status_stats'       => $status_stats,
            'low_stock_products' => $low_stock_products,
            'monthly_revenue'    => $monthly_revenue,
        ]);
    }
}
