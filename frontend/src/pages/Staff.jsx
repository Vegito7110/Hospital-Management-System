import React, { useState } from "react";

export default function Staff() {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    designation: '',
    address: '',
    mobileNumber: ''
  });

  const [searchName, setSearchName] = useState('');
  const [deleteName, setDeleteName] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updatedData, setUpdatedData] = useState({
    designation: '',
    address: '',
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
    console.log("Adding Staff Member:", formData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for staff:", searchName);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Deleting staff:", deleteName);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(`Updating ${updateName} with:`, updatedData);
  };

  return (
    <div className="px-6 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold">Add New Staff Member</h2>

      {/* Add Staff */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., John" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Surname</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., Doe" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Designation</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., Nurse" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 123 Street Name" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 9876543210" required />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Staff
        </button>
      </form>

      {/* Search Staff */}
      <form onSubmit={handleSearch} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Search Staff</h3>
        <input type="text" placeholder="Enter First Name to search" value={searchName}
          onChange={(e) => setSearchName(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </form>

      {/* Delete Staff */}
      <form onSubmit={handleDelete} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete Staff</h3>
        <input type="text" placeholder="Enter First Name to delete" value={deleteName}
          onChange={(e) => setDeleteName(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>

      {/* Update Staff */}
      <form onSubmit={handleUpdate} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Staff</h3>
        <input type="text" placeholder="Enter First Name to update" value={updateName}
          onChange={(e) => setUpdateName(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Designation" value={updatedData.designation}
          onChange={(e) => setUpdatedData({ ...updatedData, designation: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Address" value={updatedData.address}
          onChange={(e) => setUpdatedData({ ...updatedData, address: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Mobile Number" value={updatedData.mobileNumber}
          onChange={(e) => setUpdatedData({ ...updatedData, mobileNumber: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}

  