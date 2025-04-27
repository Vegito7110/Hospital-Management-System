import React, { useState } from "react";

export default function Outpatients() {
  const [formData, setFormData] = useState({
    patientID: '',
    billID: '',
    expenses: ''
  });

  const [checkID, setCheckID] = useState('');
  const [deleteID, setDeleteID] = useState('');
  const [updateID, setUpdateID] = useState('');
  const [updatedData, setUpdatedData] = useState({
    billID: '',
    expenses: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add Outpatient:", formData);
    // Add API call here
  };

  const handleCheck = (e) => {
    e.preventDefault();
    console.log("Checking Outpatient with ID:", checkID);
    // Fetch API
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Deleting Outpatient with ID:", deleteID);
    // Delete API
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(`Updating Patient ID ${updateID} with:`, updatedData);
    // Update API
  };

  return (
    <div className="px-6 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Add Outpatient</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        <input type="text" name="patientID" placeholder="Patient ID" value={formData.patientID} onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md" required />

        <input type="text" name="billID" placeholder="Bill ID" value={formData.billID} onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md" required />

        <input type="number" name="expenses" placeholder="Expenses" value={formData.expenses} onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md" required />

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Outpatient
        </button>
      </form>

      {/* Check Patient */}
      <form onSubmit={handleCheck} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Check Outpatient</h3>
        <input type="text" placeholder="Enter Patient ID" value={checkID}
          onChange={(e) => setCheckID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Check</button>
      </form>

      {/* Delete */}
      <form onSubmit={handleDelete} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete Outpatient</h3>
        <input type="text" placeholder="Enter Patient ID to delete" value={deleteID}
          onChange={(e) => setDeleteID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>

      {/* Update */}
      <form onSubmit={handleUpdate} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Outpatient Details</h3>
        <input type="text" placeholder="Enter Patient ID to update" value={updateID}
          onChange={(e) => setUpdateID(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Bill ID" value={updatedData.billID}
          onChange={(e) => setUpdatedData({ ...updatedData, billID: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="number" placeholder="Updated Expenses" value={updatedData.expenses}
          onChange={(e) => setUpdatedData({ ...updatedData, expenses: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}

  