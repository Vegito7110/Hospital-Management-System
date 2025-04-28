import React, { useState } from "react";
import axios from 'axios';

export default function Rooms() {
  const [formData, setFormData] = useState({
    RoomNumber: '',
    RoomCost: '',
    Vacant: '',
    InPatientID: ''
  });

  const [roomID, setRoomID] = useState('');
  const [updateID, setUpdateID] = useState('');
  const [deleteID, setDeleteID] = useState('');
  const [updatedData, setUpdatedData] = useState({
    RoomCost: '',
    Vacant: '',
    InPatientID: ''
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
      const response = await axios.post('http://localhost:5000/admin/room1', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Room added successfully:", response.data);
      alert("Room added!");
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Failed to add room");
    }
  };

  const handleCheckRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/admin/room1/${roomID}`);
      console.log("Room data:", response.data);
      alert(`Room found: ${response.data.RoomID}`);
    } catch (error) {
      console.error("Error fetching room:", error);
      alert("Room not found");
    }
  };

  const handleDeleteRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/admin/room1/${deleteID}`);
      console.log("Room deleted successfully");
      alert("Room deleted!");
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Failed to delete room");
    }
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/admin/room1/${updateID}`, updatedData);
      console.log("Room updated successfully:", response.data);
      alert("Room updated!");
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Failed to update room");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Room Details</h2>

      {/* Add Room Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room ID</label>
          <input type="number" name="RoomNumber" value={formData.RoomNumber} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 301" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room Cost</label>
          <input type="number" name="RoomCost" value={formData.RoomCost} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 5000" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vacant</label>
          <input type="text" name="Vacant" value={formData.Vacant} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="Yes / No" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">InPatient ID</label>
          <input type="number" name="InPatientID" value={formData.InPatientID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 101" />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Room
        </button>
      </form>

      {/* Check Room
      <form onSubmit={handleCheckRoom} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Check Room</h3>
        <input type="text" placeholder="Enter Room ID" value={roomID}
          onChange={(e) => setRoomID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Check</button>
      </form> */}

      {/* Delete Room */}
      <form onSubmit={handleDeleteRoom} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete Room</h3>
        <input type="text" placeholder="Enter Room ID to delete" value={deleteID}
          onChange={(e) => setDeleteID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>

      {/* Update Room */}
      <form onSubmit={handleUpdateRoom} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Room Details</h3>
        <input type="text" placeholder="Enter Room ID to update" value={updateID}
          onChange={(e) => setUpdateID(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="number" placeholder="Updated Room Cost" value={updatedData.RoomCost}
          onChange={(e) => setUpdatedData({ ...updatedData, RoomCost: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Vacant Status" value={updatedData.Vacant}
          onChange={(e) => setUpdatedData({ ...updatedData, Vacant: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="number" placeholder="Updated InPatient ID" value={updatedData.InPatientID}
          onChange={(e) => setUpdatedData({ ...updatedData, InPatientID: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
