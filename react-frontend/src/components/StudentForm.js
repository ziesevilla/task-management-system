import React, { useState, useEffect } from "react";

function StudentForm({ onSave, editingStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        email: editingStudent.email,
        age: editingStudent.age,
      });
    } else {
      setFormData({ name: "", email: "", age: "" });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: "", email: "", age: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Age</label>
        <input
          type="number"
          name="age"
          className="form-control"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;
