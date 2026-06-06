<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
            'folder' => 'nullable|string|max:100',
        ]);

        $folder = $request->input('folder', 'products');
        $path = $request->file('image')->store("uploads/{$folder}", 'public');

        return response()->json([
            'path' => '/storage/' . $path,
        ]);
    }
}
