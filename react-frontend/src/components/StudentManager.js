// src/components/StudentManager.js
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Spinner, Alert } from "react-bootstrap";
import api from "../api"; // centralized axios

const StudentManager = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "pending", due_date: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Generic form change handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add/Edit submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, form);
      } else {
        await api.post("/tasks", form);
      }
      setForm({ title: "", description: "", status: "pending", due_date: "" });
      setEditingId(null);
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to save task.");
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to delete task.");
    }
  };

  // Open modal to edit
  const handleEdit = (task) => {
    setForm(task);
    setEditingId(task.id);
    setError("");
    setShowModal(true);
  };

  // Open modal to add
  const handleAdd = () => {
    setForm({ title: "", description: "", status: "pending", due_date: "" });
    setEditingId(null);
    setError("");
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Task Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button onClick={handleAdd} className="mb-3">
        Add Task
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
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.due_date}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Task" : "Add Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleFormChange}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {editingId ? "Update Task" : "Save Task"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentManager;
