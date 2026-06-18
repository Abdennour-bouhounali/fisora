<?php

namespace App\Http\Controllers;

use App\Models\B2bLead;
use App\Models\Product;
use App\Models\ProductInteraction;
use App\Models\WaitlistLead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Store a consumer waitlist lead.
     */
    public function storeWaitlist(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'product_interest' => 'required|string|max:255',
            'language' => 'required|string|max:10',
        ]);

        $lead = WaitlistLead::create($validated);

        // Track waitlist registration as a cta_click or waitlist interaction if a matching product is found
        // Since we want to know conversion rate per product, let's log this registration interaction
        $product = Product::where('name', 'like', '%' . $validated['product_interest'] . '%')
            ->orWhere('slug', 'like', '%' . $validated['product_interest'] . '%')
            ->first();

        // Also save product interaction for conversion rate calculation
        if ($product) {
            ProductInteraction::create([
                'product_id' => $product->id,
                'interaction_type' => 'waitlist_registration',
                'language' => $validated['language'],
            ]);
        }

        return redirect()->back()->with('success', 'Waitlist registration successful!');
    }

    /**
     * Store a B2B business lead.
     */
    public function storeB2b(Request $request)
    {
        $validated = $request->validate([
            'business_name' => 'required|string|max:255',
            'contact_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'business_type' => 'required|string|max:255',
            'monthly_usage' => 'required|string|max:500',
            'products_of_interest' => 'required|array|min:1',
            'language' => 'required|string|max:10',
        ]);

        B2bLead::create($validated);

        return redirect()->back()->with('success', 'B2B submission successful!');
    }

    /**
     * Track page view or CTA click.
     */
    public function trackInteraction(Request $request)
    {
        $validated = $request->validate([
            'product_slug' => 'nullable|string|max:255',
            'product_id' => 'nullable|integer',
            'interaction_type' => 'required|string|in:view,cta_click,waitlist_registration',
            'language' => 'required|string|max:10',
        ]);

        $productId = $validated['product_id'] ?? null;

        if (!$productId && !empty($validated['product_slug'])) {
            $product = Product::where('slug', $validated['product_slug'])->first();
            if ($product) {
                $productId = $product->id;
            }
        }

        ProductInteraction::create([
            'product_id' => $productId,
            'interaction_type' => $validated['interaction_type'],
            'language' => $validated['language'],
        ]);

        return response()->json(['success' => true]);
    }
}
