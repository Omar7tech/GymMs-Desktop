<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlansController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = Plan::orderBy('sort_order')->orderBy('name')->get();

        return Inertia::render('Plans/Index', [
            'plans' => $plans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Plans/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:basic,standard,premium,vip,enterprise',
            'duration_days' => 'required|integer|min:1',
            'original_price' => 'required|numeric|min:0',
            'discounted_price' => 'nullable|numeric|min:0',
            'features' => 'nullable|array',
            'benefits' => 'nullable|array',
            'max_members' => 'required|integer|min:1',
            'is_featured' => 'boolean',
            'is_popular' => 'boolean',
            'badge_text' => 'nullable|string|max:50',
            'color_theme' => 'required|in:blue,green,purple,gold,red',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        Plan::create($validated);

        return redirect()->route('plans.index')->with('success', 'Plan created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $plan = Plan::findOrFail($id);

        return Inertia::render('Plans/Show', [
            'plan' => $plan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $plan = Plan::findOrFail($id);

        return Inertia::render('Plans/Edit', [
            'plan' => $plan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $plan = Plan::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:basic,standard,premium,vip,enterprise',
            'duration_days' => 'required|integer|min:1',
            'original_price' => 'required|numeric|min:0',
            'discounted_price' => 'nullable|numeric|min:0',
            'features' => 'nullable|array',
            'benefits' => 'nullable|array',
            'max_members' => 'required|integer|min:1',
            'is_featured' => 'boolean',
            'is_popular' => 'boolean',
            'badge_text' => 'nullable|string|max:50',
            'color_theme' => 'required|in:blue,green,purple,gold,red',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        $plan->update($validated);

        return redirect()->route('plans.index')->with('success', 'Plan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $plan = Plan::findOrFail($id);
        $plan->delete();

        return redirect()->route('plans.index')->with('success', 'Plan deleted successfully.');
    }

    /**
     * Get active plans for selection
     */
    public function getActivePlans()
    {
        $plans = Plan::active()
            ->valid()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return response()->json($plans);
    }
}
