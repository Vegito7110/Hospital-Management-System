import React, { useState } from "react";
import axios from 'axios';

export default function Staff() {
  const [formData, setFormData] = useState({
    StaffID: '',
    FirstName: '',
    Surname: '',
    Designation: '',
    Address: '',
    MobileNumber: ''
  });

  const [staffID, setStaffID] = useState('');
  const [updateID, setUpdateID] = useState('');
  const [deleteID, setDeleteID] = useState('');
  const [updatedData, setUpdatedData] = useState({
    FirstName: '',
    Surname: '',
    Designation: '',
    Address: '',
    MobileNumber: ''
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
      const response = await axios.post('http://localhost:5000/admin/staff1', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Staff added successfully:", response.data);
      alert("Staff added!");
    } catch (error) {
      console.error("Error adding staff:", error);
      alert("Failed to add staff");
    }
  };

  const handleCheckStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/admin/staff1/${staffID}`);
      console.log("Staff data:", response.data);
      alert(`Staff found: ${response.data.StaffID}`);
    } catch (error) {
      console.error("Error fetching staff:", error);
      alert("Staff not found");
    }
  };

  const handleDeleteStaff = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/admin/staff1/${deleteID}`);
      console.log("Staff deleted successfully");
      alert("Staff deleted!");
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete staff");
    }
  };

  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/admin/staff1/${updateID}`, updatedData);
      console.log("Staff updated successfully:", response.data);
      alert("Staff updated!");
    } catch (error) {
      console.error("Error updating staff:", error);
      alert("Failed to update staff");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Staff Details</h2>

      {/* Add Staff Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
          <input type="number" name="StaffID" value={formData.StaffID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 701" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input type="text" name="FirstName" value={formData.FirstName} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., John" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
          <input type="text" name="Surname" value={formData.Surname} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., Doe" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
          <input type="text" name="Designation" value={formData.Designation} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., Nurse, Technician" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea name="Address" value={formData.Address} onChange={handleChange} rows={3}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 123 Main Street" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input type="text" name="MobileNumber" value={formData.MobileNumber} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 9876543210" />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Staff
        </button>
      </form>

      {/* Check Staff
      <form onSubmit={handleCheckStaff} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Check Staff</h3>
        <input type="text" placeholder="Enter Staff ID" value={staffID}
          onChange={(e) => setStaffID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Check</button>
      </form> */}

      {/* Delete Staff */}
      <form onSubmit={handleDeleteStaff} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete Staff</h3>
        <input type="text" placeholder="Enter Staff ID to delete" value={deleteID}
          onChange={(e) => setDeleteID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>

      {/* Update Staff */}
      <form onSubmit={handleUpdateStaff} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Staff Details</h3>
        <input type="text" placeholder="Enter Staff ID to update" value={updateID}
          onChange={(e) => setUpdateID(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated First Name" value={updatedData.FirstName}
          onChange={(e) => setUpdatedData({ ...updatedData, FirstName: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Surname" value={updatedData.Surname}
          onChange={(e) => setUpdatedData({ ...updatedData, Surname: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Designation" value={updatedData.Designation}
          onChange={(e) => setUpdatedData({ ...updatedData, Designation: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Address" value={updatedData.Address}
          onChange={(e) => setUpdatedData({ ...updatedData, Address: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="tel" placeholder="Updated Mobile Number" value={updatedData.MobileNumber}
          onChange={(e) => setUpdatedData({ ...updatedData, MobileNumber: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
