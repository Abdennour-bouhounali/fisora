<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('items');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Admin/Orders', [
            'orders'  => $query->latest()->paginate(20),
            'filters' => $request->only('status'),
        ]);
    }

    public function show(Order $order)
    {
        return Inertia::render('Admin/OrderDetail', [
            'order' => $order->load('items'),
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,delivered,cancelled',
        ]);

        $order->update($validated);

        return redirect()->back()->with('success', 'Order status updated!');
    }
}
