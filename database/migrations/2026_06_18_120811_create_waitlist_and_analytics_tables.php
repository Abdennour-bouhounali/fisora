<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Consumer Waitlist leads
        Schema::create('waitlist_leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('country');
            $table->string('city');
            $table->string('product_interest'); // Pre-filled with current product or General Interest
            $table->string('language', 10)->default('en');
            $table->timestamps();
        });

        // B2B leads
        Schema::create('b2b_leads', function (Blueprint $table) {
            $table->id();
            $table->string('business_name');
            $table->string('contact_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('business_type');
            $table->string('monthly_usage');
            $table->json('products_of_interest')->nullable();
            $table->string('language', 10)->default('en');
            $table->timestamps();
        });

        // Product Analytics (views and clicks)
        Schema::create('product_interactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->string('interaction_type'); // 'view', 'cta_click'
            $table->string('language', 10)->default('en');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_interactions');
        Schema::dropIfExists('b2b_leads');
        Schema::dropIfExists('waitlist_leads');
    }
};
