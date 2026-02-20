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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('category')->default('standard'); // premium, basic, vip, etc.
            $table->integer('duration_days');
            $table->decimal('original_price', 8, 2);
            $table->decimal('discounted_price', 8, 2)->nullable();
            $table->decimal('discount_percentage', 5, 2)->default(0);
            $table->date('valid_from')->nullable();
            $table->date('valid_until')->nullable();
            $table->json('features')->nullable(); // Array of features
            $table->json('benefits')->nullable(); // Special benefits
            $table->integer('max_members')->default(1); // For group plans
            $table->boolean('is_popular')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('badge_text')->nullable(); // "Most Popular", "Best Value", etc.
            $table->string('color_theme')->default('blue'); // For UI theming
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
