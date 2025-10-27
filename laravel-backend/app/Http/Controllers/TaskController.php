<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    // GET /api/tasks - Return all tasks
    public function index() {
        return response()->json(Task::all(), 200);
    }

    // GET /api/tasks/{id} - Return a single task
    public function show($id) {
        $task = Task::find($id);   
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        return response()->json($task, 200);
    }

    // POST /api/tasks - Store a new task
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => ['required', Rule::in(['pending', 'in-progress', 'completed'])],
            'due_date' => 'nullable|date',
        ]);

        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    // PUT/PATCH /api/tasks/{id} - Update an existing task
    public function update(Request $request, $id) {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'status' => ['nullable', Rule::in(['pending', 'in-progress', 'completed'])],
            'due_date' => 'nullable|date',
        ]);

        $task->update($validated);
        return response()->json($task, 200);
    }

    // DELETE /api/tasks/{id} - Delete a task
    public function destroy($id) {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->delete();
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
