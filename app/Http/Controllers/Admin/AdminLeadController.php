<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\B2bLead;
use App\Models\Product;
use App\Models\ProductInteraction;
use App\Models\WaitlistLead;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminLeadController extends Controller
{
    public function index()
    {
        $waitlistLeads = WaitlistLead::latest()->get();
        $b2bLeads = B2bLead::latest()->get();

        // 1. Leads by Language
        $leadsByLanguage = WaitlistLead::select('language', DB::raw('count(*) as count'))
            ->groupBy('language')
            ->get()
            ->pluck('count', 'language')
            ->toArray();

        // 2. B2B Leads by Language
        $b2bLeadsByLanguage = B2bLead::select('language', DB::raw('count(*) as count'))
            ->groupBy('language')
            ->get()
            ->pluck('count', 'language')
            ->toArray();

        // 3. Views by Language
        $viewsByLanguage = ProductInteraction::where('interaction_type', 'view')
            ->select('language', DB::raw('count(*) as count'))
            ->groupBy('language')
            ->get()
            ->pluck('count', 'language')
            ->toArray();

        // 4. CTA Clicks by Language
        $clicksByLanguage = ProductInteraction::where('interaction_type', 'cta_click')
            ->select('language', DB::raw('count(*) as count'))
            ->groupBy('language')
            ->get()
            ->pluck('count', 'language')
            ->toArray();

        // 5. Most requested products (Waitlist Interest)
        $leadsByProduct = WaitlistLead::select('product_interest', DB::raw('count(*) as count'))
            ->groupBy('product_interest')
            ->orderBy('count', 'desc')
            ->get();

        // 6. CTR (Waitlist submissions / Views) by Language
        $ctrByLanguage = [];
        $languages = ['en', 'fr', 'ar'];
        foreach ($languages as $lang) {
            $views = $viewsByLanguage[$lang] ?? 0;
            $subs = $leadsByLanguage[$lang] ?? 0;
            $ctrByLanguage[$lang] = $views > 0 ? round(($subs / $views) * 100, 2) : 0;
        }

        // 7. Product-level conversion analytics
        $products = Product::all();
        $productAnalytics = [];

        foreach ($products as $product) {
            $views = ProductInteraction::where('product_id', $product->id)
                ->where('interaction_type', 'view')
                ->count();

            $ctaClicks = ProductInteraction::where('product_id', $product->id)
                ->where('interaction_type', 'cta_click')
                ->count();

            $registrations = ProductInteraction::where('product_id', $product->id)
                ->where('interaction_type', 'waitlist_registration')
                ->count();

            $productAnalytics[] = [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'views' => $views,
                'cta_clicks' => $ctaClicks,
                'registrations' => $registrations,
                'ctr' => $views > 0 ? round(($ctaClicks / $views) * 100, 2) : 0,
                'conversion_rate' => $views > 0 ? round(($registrations / $views) * 100, 2) : 0,
            ];
        }

        return Inertia::render('Admin/Leads', [
            'waitlistLeads' => $waitlistLeads,
            'b2bLeads' => $b2bLeads,
            'analytics' => [
                'leadsByLanguage' => $leadsByLanguage,
                'b2bLeadsByLanguage' => $b2bLeadsByLanguage,
                'viewsByLanguage' => $viewsByLanguage,
                'clicksByLanguage' => $clicksByLanguage,
                'leadsByProduct' => $leadsByProduct,
                'ctrByLanguage' => $ctrByLanguage,
                'productAnalytics' => $productAnalytics,
            ]
        ]);
    }
}
