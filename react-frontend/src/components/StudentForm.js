import React, { useState, useEffect } from "react";

function StudentForm({ onSave, editingStudent }) {
  const initialFormData = { name: "", email: "", age: "" };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || "",
        email: editingStudent.email || "",
        age: editingStudent.age || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingStudent]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData(initialFormData);
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
