import React, { useState } from "react";
import axios from 'axios';

export default function Bills() {
  const [formData, setFormData] = useState({
    BillID: '',
    InPatientID: '',
    OutPatientID: '',
    RoomID: '',
    Expenses: ''
  });

  const [billID, setBillID] = useState('');
  const [updateID, setUpdateID] = useState('');
  const [deleteID, setDeleteID] = useState('');
  const [updatedData, setUpdatedData] = useState({
    InPatientID: '',
    OutPatientID: '',
    RoomID: '',
    Expenses: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/billing1', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Bill added successfully:", response.data);
      alert("Bill added!");
    } catch (error) {
      console.error("Error adding bill:", error);
      alert("Failed to add bill");
    }
  };

  const handleCheckBill = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/admin/billing1/${billID}`);
      console.log("Bill data:", response.data);
      alert(`Bill found: ${response.data.BillID}`);
    } catch (error) {
      console.error("Error fetching bill:", error);
      alert("Bill not found");
    }
  };

  const handleDeleteBill = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/admin/billing1/${deleteID}`);
      console.log("Bill deleted successfully");
      alert("Bill deleted!");
    } catch (error) {
      console.error("Error deleting bill:", error);
      alert("Failed to delete bill");
    }
  };

  const handleUpdateBill = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/admin/billing1/${updateID}`, updatedData);
      console.log("Bill updated successfully:", response.data);
      alert("Bill updated!");
    } catch (error) {
      console.error("Error updating bill:", error);
      alert("Failed to update bill");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Bill Details</h2>

      {/* Add Bill Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bill ID</label>
          <input type="number" name="BillID" value={formData.BillID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 401" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">InPatient ID</label>
          <input type="number" name="InPatientID" value={formData.InPatientID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 101" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">OutPatient ID</label>
          <input type="number" name="OutPatientID" value={formData.OutPatientID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 201" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room ID</label>
          <input type="number" name="RoomID" value={formData.RoomID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 301" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expenses</label>
          <input type="number" name="Expenses" value={formData.Expenses} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 10000" required />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Bill
        </button>
      </form>

      {/* Check Bill
      <form onSubmit={handleCheckBill} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Check Bill</h3>
        <input type="text" placeholder="Enter Bill ID" value={billID}
          onChange={(e) => setBillID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Check</button>
      </form> */}

      {/* Delete Bill */}
      <form onSubmit={handleDeleteBill} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete Bill</h3>
        <input type="text" placeholder="Enter Bill ID to delete" value={deleteID}
          onChange={(e) => setDeleteID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>

      {/* Update Bill */}
      <form onSubmit={handleUpdateBill} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Bill Details</h3>
        <input type="text" placeholder="Enter Bill ID to update" value={updateID}
          onChange={(e) => setUpdateID(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="number" placeholder="Updated InPatient ID" value={updatedData.InPatientID}
          onChange={(e) => setUpdatedData({ ...updatedData, InPatientID: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="number" placeholder="Updated OutPatient ID" value={updatedData.OutPatientID}
          onChange={(e) => setUpdatedData({ ...updatedData, OutPatientID: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="number" placeholder="Updated Room ID" value={updatedData.RoomID}
          onChange={(e) => setUpdatedData({ ...updatedData, RoomID: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="number" placeholder="Updated Expenses" value={updatedData.Expenses}
          onChange={(e) => setUpdatedData({ ...updatedData, Expenses: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
