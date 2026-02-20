<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Membership extends Model
{
    protected $fillable = [
        'customer_id',
        'plan_type',
        'duration_days',
        'price',
        'start_date',
        'end_date',
        'status',
        'notes',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'price' => 'decimal:2',
    ];

    // Relationship to Customer
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // Check if membership is active
    public function isActive()
    {
        return $this->status === 'active' && !$this->isExpired();
    }

    // Check if membership is expired
    public function isExpired()
    {
        return $this->end_date->isPast();
    }

    // Get remaining days
    public function getRemainingDays()
    {
        if ($this->isExpired()) {
            return 0;
        }

        return Carbon::now()->diffInDays($this->end_date, false);
    }

    // Get expiry status for display
    public function getExpiryStatus()
    {
        $remainingDays = $this->getRemainingDays();

        if ($remainingDays <= 0) {
            return 'expired';
        } elseif ($remainingDays <= 7) {
            return 'expiring_soon';
        } else {
            return 'active';
        }
    }

    // Get formatted remaining time
    public function getRemainingTimeFormatted()
    {
        $remainingDays = $this->getRemainingDays();

        if ($remainingDays <= 0) {
            return 'Expired';
        }

        if ($remainingDays < 30) {
            return $remainingDays . ' days left';
        }

        $months = floor($remainingDays / 30);
        return $months . ' month' . ($months > 1 ? 's' : '') . ' left';
    }
}
