<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Products', [
            'products' => Product::latest()->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'               => 'required|string|max:255',
            'description'        => 'nullable|string',
            'description_points' => 'nullable|array',
            'price'              => 'required|numeric|min:0',
            'stock'              => 'required|integer|min:0',
            'category'           => 'required|in:wellness,culinary,solutions,general',
            'weight'             => 'nullable|string',
            'images'             => 'nullable|array',
            'tags'               => 'nullable|array',
            'is_active'          => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $product = Product::create($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product created!');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name'               => 'required|string|max:255',
            'description'        => 'nullable|string',
            'description_points' => 'nullable|array',
            'price'              => 'required|numeric|min:0',
            'stock'              => 'required|integer|min:0',
            'category'           => 'required|in:wellness,culinary,solutions,general',
            'weight'             => 'nullable|string',
            'images'             => 'nullable|array',
            'tags'               => 'nullable|array',
            'is_active'          => 'boolean',
        ]);

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product updated!');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product deleted!');
    }
}
