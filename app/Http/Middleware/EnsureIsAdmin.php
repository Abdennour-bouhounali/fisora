<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check() || !auth()->user()->is_admin) {
            if ($request->wantsJson()) {
                return response()->json(['error' => 'Forbidden'], 403);
            }
            return redirect()->route('admin.login');
        }

        return $next($request);
    }
}
