<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminOrderController;
use Illuminate\Support\Facades\Route;

// ─── Public Routes ─────────────────────────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::get('/b2b', [HomeController::class, 'b2b'])->name('b2b');

// Products
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

// Orders
Route::get('/checkout', [OrderController::class, 'create'])->name('orders.create');
Route::post('/checkout', [OrderController::class, 'store'])->name('orders.store');
Route::get('/track', [OrderController::class, 'track'])->name('orders.track');

// Leads & Analytics
Route::post('/waitlist', [\App\Http\Controllers\LeadController::class, 'storeWaitlist'])->name('waitlist.store');
Route::post('/b2b-leads', [\App\Http\Controllers\LeadController::class, 'storeB2b'])->name('b2b.store');
Route::post('/analytics/track', [\App\Http\Controllers\LeadController::class, 'trackInteraction'])->name('analytics.track');

// ─── Admin Auth Routes ──────────────────────────────────────────────────────────
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Protected admin routes
    Route::middleware(\App\Http\Middleware\EnsureIsAdmin::class)->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/leads', [\App\Http\Controllers\Admin\AdminLeadController::class, 'index'])->name('leads.index');

        // Products CRUD
        Route::resource('products', AdminProductController::class)->except(['show', 'edit', 'create']);

        // Orders
        Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
        Route::patch('/orders/{order}', [AdminOrderController::class, 'update'])->name('orders.update');
    });
});

// ─── File Upload ────────────────────────────────────────────────────────────────
Route::post('/api/upload', [UploadController::class, 'store'])
    ->middleware(['auth', \App\Http\Middleware\EnsureIsAdmin::class])
    ->name('upload');
