<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function create()
    {
        if (config('shop.coming_soon_mode', true)) {
            abort(403, 'Purchasing is temporarily disabled.');
        }

        return Inertia::render('Checkout');
    }

    public function store(Request $request)
    {
        if (config('shop.coming_soon_mode', true)) {
            abort(403, 'Purchasing is temporarily disabled.');
        }

        $validated = $request->validate([
            'customer_name'  => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'required|string|max:30',
            'address'        => 'required|string',
            'city'           => 'required|string|max:100',
            'wilaya'         => 'required|string|max:100',
            'postal_code'    => 'nullable|string|max:20',
            'payment_method' => 'required|in:cash_on_delivery,credit_card,bank_transfer',
            'notes'          => 'nullable|string',
            'items'          => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($validated) {
            $subtotal = 0;
            $items = [];

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $lineTotal = $product->price * $item['quantity'];
                $subtotal += $lineTotal;

                $items[] = [
                    'product_id'    => $product->id,
                    'product_name'  => $product->name,
                    'product_price' => $product->price,
                    'quantity'      => $item['quantity'],
                    'subtotal'      => $lineTotal,
                ];
            }

            $shippingFee = $subtotal >= 5000 ? 0 : 400;

            $order = Order::create([
                'customer_name'  => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'],
                'address'        => $validated['address'],
                'city'           => $validated['city'],
                'wilaya'         => $validated['wilaya'],
                'postal_code'    => $validated['postal_code'] ?? null,
                'payment_method' => $validated['payment_method'],
                'notes'          => $validated['notes'] ?? null,
                'subtotal'       => $subtotal,
                'shipping_fee'   => $shippingFee,
                'total'          => $subtotal + $shippingFee,
                'user_id'        => auth()->id(),
            ]);

            $order->items()->createMany($items);
        });

        return redirect()->back()->with('success', 'Order placed successfully!');
    }

    public function track(Request $request)
    {
        $order = null;

        if ($request->filled('order_number')) {
            $order = Order::with('items')
                ->where('order_number', $request->order_number)
                ->first();
        }

        return Inertia::render('TrackOrder', [
            'order' => $order,
        ]);
    }
}
