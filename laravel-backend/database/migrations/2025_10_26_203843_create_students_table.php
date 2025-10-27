<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('title'); // Task title
            $table->text('description')->nullable(); // Task description, can be null
            $table->enum('status', ['pending', 'in-progress', 'completed'])->default('pending'); // Task status
            $table->date('due_date')->nullable(); // Optional due date
            $table->timestamps(); // created_at and updated_at
});

    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};