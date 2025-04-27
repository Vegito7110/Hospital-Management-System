import React, { useState } from "react";

export default function Cashier() {
  const [formData, setFormData] = useState({
    staffID: '',
    name: '',
    billID: ''
  });

  const [staffIDCheck, setStaffIDCheck] = useState('');
  const [deleteID, setDeleteID] = useState('');
  const [updateID, setUpdateID] = useState('');
  const [updatedData, setUpdatedData] = useState({
    name: '',
    billID: ''
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
    console.log("Add Cashier:", formData);
  };

  const handleCheckCashier = (e) => {
    e.preventDefault();
    console.log("Checking cashier with ID:", staffIDCheck);
  };

  const handleDeleteCashier = (e) => {
    e.preventDefault();
    console.log("Deleting cashier with ID:", deleteID);
  };

  const handleUpdateCashier = (e) => {
    e.preventDefault();
    console.log(`Updating Cashier ID ${updateID} with data:`, updatedData);
  };

  return (
    <div className="px-6 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold">Add New Cashier</h2>

      {/* Add Cashier */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        <div>
          <label className="block text-sm font-medium mb-1">Staff ID</label>
          <input type="text" name="staffID" value={formData.staffID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., S001" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., Riya Sharma" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bill ID</label>
          <input type="text" name="billID" value={formData.billID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., B101" required />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Cashier
        </button>
      </form>

      {/* Check Cashier */}
      <form onSubmit={handleCheckCashier} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Check Cashier</h3>
        <input type="text" placeholder="Enter Staff ID" value={staffIDCheck}
          onChange={(e) => setStaffIDCheck(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Check</button>
      </form>

      {/* Delete Cashier */}
      <form onSubmit={handleDeleteCashier} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete Cashier</h3>
        <input type="text" placeholder="Enter Staff ID to delete" value={deleteID}
          onChange={(e) => setDeleteID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>

      {/* Update Cashier */}
      <form onSubmit={handleUpdateCashier} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Cashier</h3>
        <input type="text" placeholder="Enter Staff ID to update" value={updateID}
          onChange={(e) => setUpdateID(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Name" value={updatedData.name}
          onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Bill ID" value={updatedData.billID}
          onChange={(e) => setUpdatedData({ ...updatedData, billID: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}

  