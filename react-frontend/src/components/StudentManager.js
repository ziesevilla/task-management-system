// src/components/StudentManager.js
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Spinner, Alert } from "react-bootstrap";
import api from "../api"; // use centralized axios

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "", course: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch students from API
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/students");
      setStudents(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle Add/Edit submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/students/${editingId}`, form);
      } else {
        await api.post("/students", form);
      }
      setForm({ name: "", email: "", age: "", course: "" });
      setEditingId(null);
      setShowModal(false);
      fetchStudents();
    } catch (err) {
      console.error(err);
      setError("Failed to save student.");
    }
  };

  // Delete a student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
      setError("Failed to delete student.");
    }
  };

  // Open modal to edit
  const handleEdit = (student) => {
    setForm(student);
    setEditingId(student.id);
    setShowModal(true);
  };

  // Open modal to add
  const handleAdd = () => {
    setForm({ name: "", email: "", age: "", course: "" });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button onClick={handleAdd} className="mb-3">
        Add Student
      </Button>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.course}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Student" : "Add Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {editingId ? "Update" : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentManager;
