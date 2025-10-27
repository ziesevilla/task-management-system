<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index() {
        return response()->json(Student::all(), 200);
    }

    public function show($id) {
        $student = Student::find($id);
        if (!$student) return response()->json(['message' => 'Student not found'], 404);
        return response()->json($student, 200);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'age' => 'required|integer',
            'course' => 'required|string|max:100',
        ]);

        $student = Student::create($validated);
        return response()->json($student, 201);
    }

    public function update(Request $request, $id) {
        $student = Student::find($id);
        if (!$student) return response()->json(['message' => 'Student not found'], 404);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:students,email,' . $id,
            'age' => 'integer',
            'course' => 'string|max:100',
        ]);

        $student->update($validated);
        return response()->json($student, 200);
    }

    public function destroy($id) {
        $student = Student::find($id);
        if (!$student) return response()->json(['message' => 'Student not found'], 404);
        $student->delete();
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
