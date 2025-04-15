import React, { useState } from "react";

// Define the specialization options array
const specializationOptions = [
  "Nephrology",
  "Orthopaedics & Joint Replacement",
  "Cardiac Sciences",
  "Obstetrics And Gynaecology",
  "Cancer Care / Oncology",
  "Neurosciences",
  "Internal Medicine",
  "General Surgery",
];

export default function Doctors() {
  const [formData, setFormData] = useState({
    doctorID: '',
    name: '',
    specialization: '',
    mobileNumber: '',
    cabin: '',
    address: ''
  });

  const [doctorID, setDoctorID] = useState('');
  const [updateID, setUpdateID] = useState('');
  const [deleteID, setDeleteID] = useState('');
  const [updatedData, setUpdatedData] = useState({
    name: '',
    specialization: '',
    mobileNumber: ''
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
    console.log("Add Doctor:", formData);
    // Call API to add doctor
  };

  const handleCheckDoctor = (e) => {
    e.preventDefault();
    console.log("Checking doctor with ID:", doctorID);
    // Call API to fetch doctor by ID
  };

  const handleDeleteDoctor = (e) => {
    e.preventDefault();
    console.log("Deleting doctor with ID:", deleteID);
    // Call API to delete doctor
  };

  const handleUpdateDoctor = (e) => {
    e.preventDefault();
    console.log(`Updating Doctor ID ${updateID} with data:`, updatedData);
    // Call API to update doctor
  };

  return (
    <div className="px-6 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold">Add New Doctor</h2>

      {/* Add Doctor Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        {/* Doctor ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Doctor ID</label>
          <input type="number" name="doctorID" value={formData.doctorID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 101" />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., Dr. Nitin" required />
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
          <select name="specialization" value={formData.specialization} onChange={handleChange} required
            className="w-full px-3 py-2 border rounded-md">
            <option value="" disabled>Select a Specialization</option>
            {specializationOptions.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 9876543210" />
        </div>

        {/* Cabin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cabin</label>
          <input type="text" name="cabin" value={formData.cabin} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 203" />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} rows={3}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 123 Church Street, Delhi" />
        </div>

        {/* Submit */}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Doctor
        </button>
      </form>

      {/* Check Doctor */}
      <form onSubmit={handleCheckDoctor} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Check Doctor</h3>
        <input type="text" placeholder="Enter Doctor ID" value={doctorID}
          onChange={(e) => setDoctorID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Check</button>
      </form>

      {/* Delete Doctor */}
      <form onSubmit={handleDeleteDoctor} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete Doctor</h3>
        <input type="text" placeholder="Enter Doctor ID to delete" value={deleteID}
          onChange={(e) => setDeleteID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>

      {/* Update Doctor */}
      <form onSubmit={handleUpdateDoctor} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Doctor Details</h3>
        <input type="text" placeholder="Enter Doctor ID to update" value={updateID}
          onChange={(e) => setUpdateID(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Name" value={updatedData.name}
          onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <select value={updatedData.specialization}
          onChange={(e) => setUpdatedData({ ...updatedData, specialization: e.target.value })}
          className="border px-3 py-2 rounded w-full">
          <option value="" disabled>Update Specialization</option>
          {specializationOptions.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>

        <input type="text" placeholder="Updated Mobile Number" value={updatedData.mobileNumber}
          onChange={(e) => setUpdatedData({ ...updatedData, mobileNumber: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
