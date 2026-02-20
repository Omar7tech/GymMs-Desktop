<?php

namespace App\Http\Controllers;

use App\Models\Membership;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MembershipsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $memberships = Membership::whereNull('customer_id') // Only plan templates, not assigned memberships
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Memberships/Index', [
            'memberships' => $memberships,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Memberships/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_days' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'features' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        Membership::create([
            'plan_type' => 'plan', // This is a plan template
            'duration_days' => $validated['duration_days'],
            'price' => $validated['price'],
            'status' => $validated['is_active'] ?? true ? 'active' : 'inactive',
            'notes' => json_encode([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? '',
                'features' => $validated['features'] ?? [],
            ]),
        ]);

        return redirect()->route('memberships.index')->with('success', 'Membership plan created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $membership = Membership::findOrFail($id);

        return Inertia::render('Memberships/Show', [
            'membership' => $membership,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $membership = Membership::findOrFail($id);

        return Inertia::render('Memberships/Edit', [
            'membership' => $membership,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $membership = Membership::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_days' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'features' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $membership->update([
            'duration_days' => $validated['duration_days'],
            'price' => $validated['price'],
            'status' => $validated['is_active'] ?? true ? 'active' : 'inactive',
            'notes' => json_encode([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? '',
                'features' => $validated['features'] ?? [],
            ]),
        ]);

        return redirect()->route('memberships.index')->with('success', 'Membership plan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $membership = Membership::findOrFail($id);

        // Only allow deleting if not assigned to any customers
        if ($membership->customer_id) {
            return back()->withErrors(['error' => 'Cannot delete membership that is assigned to a customer.']);
        }

        $membership->delete();

        return redirect()->route('memberships.index')->with('success', 'Membership plan deleted successfully.');
    }

    /**
     * Get active membership plans for selection
     */
    public function getActivePlans()
    {
        $plans = Membership::whereNull('customer_id')
            ->where('status', 'active')
            ->orderBy('price')
            ->get();

        return response()->json($plans);
    }
}
