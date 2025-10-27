import React from "react";

function StudentList({ students, onEdit, onDelete }) {
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center">
              No students found.
            </td>
          </tr>
        ) : (
          students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default StudentList;
