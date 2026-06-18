<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
            'folder' => 'nullable|string|max:100',
        ]);

        $folder = $request->input('folder', 'products');

        // Create directory if it doesn't exist
        $destinationPath = public_path("images/{$folder}");

        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0775, true);
        }

        // Generate unique filename
        $file = $request->file('image');
        $filename = Str::random(25) . '.' . $file->getClientOriginalExtension();

        // Move file directly to public/images/products
        $file->move($destinationPath, $filename);

        $url = "/images/{$folder}/{$filename}";

        return response()->json([
            'image' => $url
        ]);
    }
}
