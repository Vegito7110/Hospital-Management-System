import React, { useState } from "react";
import axios from 'axios';

export default function Cashier() {
  const [formData, setFormData] = useState({
    StaffID: '',
    Name: '',
    BillID: ''
  });

  const [staffID, setStaffID] = useState('');
  const [updateID, setUpdateID] = useState('');
  const [deleteID, setDeleteID] = useState('');
  const [updatedData, setUpdatedData] = useState({
    Name: '',
    BillID: ''
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
      const response = await axios.post('http://localhost:5000/admin/cashier1', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Cashier added successfully:", response.data);
      alert("Cashier added!");
    } catch (error) {
      console.error("Error adding cashier:", error);
      alert("Failed to add cashier");
    }
  };

  const handleCheckCashier = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/admin/cashier1/${staffID}`);
      console.log("Cashier data:", response.data);
      alert(`Cashier found: ${response.data.StaffID}`);
    } catch (error) {
      console.error("Error fetching cashier:", error);
      alert("Cashier not found");
    }
  };

  const handleDeleteCashier = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/admin/cashier1/${deleteID}`);
      console.log("Cashier deleted successfully");
      alert("Cashier deleted!");
    } catch (error) {
      console.error("Error deleting cashier:", error);
      alert("Failed to delete cashier");
    }
  };

  const handleUpdateCashier = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/admin/cashier1/${updateID}`, updatedData);
      console.log("Cashier updated successfully:", response.data);
      alert("Cashier updated!");
    } catch (error) {
      console.error("Error updating cashier:", error);
      alert("Failed to update cashier");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Cashier Details</h2>

      {/* Add Cashier Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
          <input type="number" name="StaffID" value={formData.StaffID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 601" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., Jane Doe" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bill ID</label>
          <input type="number" name="BillID" value={formData.BillID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 501" />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Cashier
        </button>
      </form>

      {/* Check Cashier
      <form onSubmit={handleCheckCashier} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Check Cashier</h3>
        <input type="text" placeholder="Enter Staff ID" value={staffID}
          onChange={(e) => setStaffID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Check</button>
      </form> */}

      {/* Delete Cashier */}
      <form onSubmit={handleDeleteCashier} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete Cashier</h3>
        <input type="text" placeholder="Enter Staff ID to delete" value={deleteID}
          onChange={(e) => setDeleteID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>

      {/* Update Cashier */}
      <form onSubmit={handleUpdateCashier} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Cashier Details</h3>
        <input type="text" placeholder="Enter Staff ID to update" value={updateID}
          onChange={(e) => setUpdateID(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Name" value={updatedData.Name}
          onChange={(e) => setUpdatedData({ ...updatedData, Name: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="number" placeholder="Updated Bill ID" value={updatedData.BillID}
          onChange={(e) => setUpdatedData({ ...updatedData, BillID: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
