import React, { useState } from "react";

export default function Rooms() {
  const [formData, setFormData] = useState({
    roomID: '',
    roomCost: '',
    vacant: '',
    inPatientID: ''
  });

  const [roomCheck, setRoomCheck] = useState('');
  const [deleteID, setDeleteID] = useState('');
  const [updateID, setUpdateID] = useState('');
  const [updatedData, setUpdatedData] = useState({
    roomCost: '',
    vacant: '',
    inPatientID: ''
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
    console.log("Adding Room:", formData);
  };

  const handleCheckRoom = (e) => {
    e.preventDefault();
    console.log("Checking Room ID:", roomCheck);
  };

  const handleDeleteRoom = (e) => {
    e.preventDefault();
    console.log("Deleting Room ID:", deleteID);
  };

  const handleUpdateRoom = (e) => {
    e.preventDefault();
    console.log(`Updating Room ID ${updateID} with:`, updatedData);
  };

  return (
    <div className="px-6 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold">Add New Room</h2>

      {/* Add Room */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        <div>
          <label className="block text-sm font-medium mb-1">Room ID</label>
          <input type="text" name="roomID" value={formData.roomID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., R101" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Room Cost</label>
          <input type="number" name="roomCost" value={formData.roomCost} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 2500" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Vacant</label>
          <select name="vacant" value={formData.vacant} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">In-Patient ID</label>
          <input type="text" name="inPatientID" value={formData.inPatientID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., IP007" />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Room
        </button>
      </form>

      {/* Check Room */}
      <form onSubmit={handleCheckRoom} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Check Room</h3>
        <input type="text" placeholder="Enter Room ID" value={roomCheck}
          onChange={(e) => setRoomCheck(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Check</button>
      </form>

      {/* Delete Room */}
      <form onSubmit={handleDeleteRoom} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete Room</h3>
        <input type="text" placeholder="Enter Room ID to delete" value={deleteID}
          onChange={(e) => setDeleteID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>

      {/* Update Room */}
      <form onSubmit={handleUpdateRoom} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Room</h3>
        <input type="text" placeholder="Enter Room ID to update" value={updateID}
          onChange={(e) => setUpdateID(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="number" placeholder="Updated Room Cost" value={updatedData.roomCost}
          onChange={(e) => setUpdatedData({ ...updatedData, roomCost: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <select value={updatedData.vacant}
          onChange={(e) => setUpdatedData({ ...updatedData, vacant: e.target.value })}
          className="border px-3 py-2 rounded w-full">
          <option value="">Vacancy Status</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input type="text" placeholder="Updated In-Patient ID" value={updatedData.inPatientID}
          onChange={(e) => setUpdatedData({ ...updatedData, inPatientID: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
