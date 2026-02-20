<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'description',
        'category',
        'duration_days',
        'original_price',
        'discounted_price',
        'discount_percentage',
        'valid_from',
        'valid_until',
        'features',
        'benefits',
        'max_members',
        'is_popular',
        'is_featured',
        'is_active',
        'sort_order',
        'badge_text',
        'color_theme',
    ];

    protected $casts = [
        'original_price' => 'decimal:2',
        'discounted_price' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
        'valid_from' => 'date',
        'valid_until' => 'date',
        'features' => 'array',
        'benefits' => 'array',
        'is_popular' => 'boolean',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'max_members' => 'integer',
        'sort_order' => 'integer',
    ];

    // Get the effective price (discounted or original)
    public function getEffectivePrice()
    {
        return $this->discounted_price ?? $this->original_price;
    }

    // Check if plan is currently valid
    public function isValid()
    {
        $now = Carbon::now();

        if ($this->valid_from && $now->lt($this->valid_from)) {
            return false;
        }

        if ($this->valid_until && $now->gt($this->valid_until)) {
            return false;
        }

        return $this->is_active;
    }

    // Check if plan has discount
    public function hasDiscount()
    {
        return $this->discounted_price && $this->discounted_price < $this->original_price;
    }

    // Get discount amount
    public function getDiscountAmount()
    {
        if (!$this->hasDiscount()) {
            return 0;
        }

        return $this->original_price - $this->discounted_price;
    }

    // Get savings percentage
    public function getSavingsPercentage()
    {
        if (!$this->hasDiscount()) {
            return 0;
        }

        return round((($this->original_price - $this->discounted_price) / $this->original_price) * 100, 1);
    }

    // Check if plan is for groups
    public function isGroupPlan()
    {
        return $this->max_members > 1;
    }

    // Get formatted duration
    public function getFormattedDuration()
    {
        if ($this->duration_days < 30) {
            return $this->duration_days . ' days';
        }

        $months = round($this->duration_days / 30, 1);
        return $months . ' month' . ($months > 1 ? 's' : '');
    }

    // Get category color/theme
    public function getCategoryColor()
    {
        return match($this->category) {
            'basic' => 'gray',
            'standard' => 'blue',
            'premium' => 'purple',
            'vip' => 'gold',
            'enterprise' => 'green',
            default => $this->color_theme ?? 'blue',
        };
    }

    // Get plan type badge
    public function getTypeBadge()
    {
        return match($this->category) {
            'basic' => 'Basic',
            'standard' => 'Standard',
            'premium' => 'Premium',
            'vip' => 'VIP',
            'enterprise' => 'Enterprise',
            default => ucfirst($this->category),
        };
    }

    // Check if plan is expiring soon
    public function isExpiringSoon()
    {
        if (!$this->valid_until) {
            return false;
        }

        $daysUntilExpiry = Carbon::now()->diffInDays($this->valid_until, false);
        return $daysUntilExpiry <= 30 && $daysUntilExpiry > 0;
    }

    // Get days until expiry
    public function getDaysUntilExpiry()
    {
        if (!$this->valid_until) {
            return null;
        }

        return Carbon::now()->diffInDays($this->valid_until, false);
    }

    // Scope for active plans
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for featured plans
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Scope for popular plans
    public function scopePopular($query)
    {
        return $query->where('is_popular', true);
    }

    // Scope for valid plans (not expired)
    public function scopeValid($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('valid_until')
              ->orWhere('valid_until', '>', now());
        })->where(function ($q) {
            $q->whereNull('valid_from')
              ->orWhere('valid_from', '<=', now());
        });
    }
}
