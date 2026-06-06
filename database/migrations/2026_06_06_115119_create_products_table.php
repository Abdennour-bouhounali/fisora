<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('description_points')->nullable(); // array of bullet points
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(0);
            $table->string('category')->default('general'); // wellness, culinary, solutions
            $table->string('slug')->unique();
            $table->json('images')->nullable(); // array of image paths
            $table->string('weight')->nullable(); // e.g. "50g"
            $table->boolean('is_active')->default(true);
            $table->json('tags')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
