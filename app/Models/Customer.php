<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'address',
        'join_date',
    ];

    // Relationship to Memberships (assigned plans)
    public function memberships()
    {
        return $this->hasMany(Membership::class);
    }

    // Get active membership (assigned plan)
    public function activeMembership()
    {
        return $this->hasOne(Membership::class)->where('status', 'active')->where('end_date', '>', now());
    }

    // Check if customer has active membership (assigned plan)
    public function hasActiveMembership()
    {
        return $this->activeMembership()->exists();
    }
}