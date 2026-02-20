<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Plan;
use App\Http\Resources\CustomerResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::with(['activeMembership'])->orderBy('created_at', 'desc')->get();

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
        ]);
    }

    public function create()
    {
        $plans = Plan::active()->valid()->orderBy('sort_order')->get();

        return Inertia::render('Customers/Create', [
            'plans' => $plans,
        ]);
    }

    public function store(Request $request)
    {
        \Log::info('Customer store method called', $request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers',
            'phone' => 'nullable|string|max:20',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'address' => 'nullable|string',
            'join_date' => 'required|date',
            'plan_id' => 'required|exists:plans,id',
            'membership_start_date' => 'required|date',
        ]);

        \Log::info('Validation passed', $validated);

        try {
            // Get the selected plan
            $plan = Plan::findOrFail($validated['plan_id']);

            $customer = Customer::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'date_of_birth' => $validated['date_of_birth'],
                'gender' => $validated['gender'],
                'address' => $validated['address'],
                'join_date' => $validated['join_date'],
            ]);

            // Assign membership to customer based on plan
            $startDate = \Carbon\Carbon::parse($validated['membership_start_date']);
            $endDate = $startDate->copy()->addDays($plan->duration_days);

            \App\Models\Membership::create([
                'customer_id' => $customer->id,
                'plan_type' => $plan->category,
                'duration_days' => $plan->duration_days,
                'price' => $plan->getEffectivePrice(),
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => 'active',
                'notes' => json_encode([
                    'plan_id' => $plan->id,
                    'name' => $plan->name,
                    'description' => $plan->description,
                    'features' => $plan->features,
                    'benefits' => $plan->benefits,
                ]),
            ]);

            \Log::info('Customer and membership assigned successfully', ['customer_id' => $customer->id]);

            return redirect()->route('customers.index')->with('success', 'Customer created successfully.');
        } catch (\Exception $e) {
            \Log::error('Error creating customer', ['error' => $e->getMessage()]);
            return back()->withErrors(['error' => 'Failed to create customer: ' . $e->getMessage()]);
        }
    }
}
