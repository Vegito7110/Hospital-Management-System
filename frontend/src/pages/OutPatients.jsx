import React, { useState } from "react";
import axios from 'axios';

export default function OutPatients() {
  const [formData, setFormData] = useState({
    PatientID: '',
    AdmissionDate: '',
    DischargeDate: '',
    Gender: '',
    MobileNumber: '',
    Address: '',
    OPD_Date: '',
    DoctorID: ''
  });

  const [patientID, setPatientID] = useState('');
  const [updateID, setUpdateID] = useState('');
  const [deleteID, setDeleteID] = useState('');
  const [updatedData, setUpdatedData] = useState({
    MobileNumber: '',
    Address: '',
    DischargeDate: ''
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
      const response = await axios.post('http://localhost:5000/admin/outpatient1', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("OutPatient added successfully:", response.data);
      alert("Patient added!");
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to add patient");
    }
  };

  const handleCheckPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/admin/outpatient/${patientID}`);
      console.log("Patient data:", response.data);
      alert(`Patient found: ${response.data.PatientID}`);
    } catch (error) {
      console.error("Error fetching patient:", error);
      alert("Patient not found");
    }
  };

  const handleDeletePatient = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/admin/outpatient1/${deleteID}`);
      console.log("Patient deleted successfully");
      alert("Patient deleted!");
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient");
    }
  };

  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/admin/outpatient1/${updateID}`, updatedData);
      console.log("Patient updated successfully:", response.data);
      alert("Patient updated!");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Outpatient Details</h2>

      {/* Add Outpatient Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
          <input type="number" name="PatientID" value={formData.PatientID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 101" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
          <input type="date" name="AdmissionDate" value={formData.AdmissionDate} onChange={handleChange} required
            className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discharge Date</label>
          <input type="date" name="DischargeDate" value={formData.DischargeDate} onChange={handleChange} required
            className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input type="tel" name="MobileNumber" value={formData.MobileNumber} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 9876543210" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <input type="text" name="Gender" value={formData.Gender} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., Male / Female" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea name="Address" value={formData.Address} onChange={handleChange} rows={3}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 123 Church Street, Delhi" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">OPD_Date</label>
          <input type="date" name="OPD_Date" value={formData.OPD_Date} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 2001" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Doctor ID</label>
          <input type="number" name="DoctorID" value={formData.DoctorID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 101" />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Patient
        </button>
      </form>

      {/* Check Outpatient
      <form onSubmit={handleCheckPatient} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Check Outpatient</h3>
        <input type="text" placeholder="Enter Patient ID" value={patientID}
          onChange={(e) => setPatientID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Check</button>
      </form> */}

      {/* Delete Outpatient */}
      <form onSubmit={handleDeletePatient} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete Outpatient</h3>
        <input type="number" placeholder="Enter Patient ID to delete" value={deleteID}
          onChange={(e) => setDeleteID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </form>

      {/* Update Outpatient */}
      <form onSubmit={handleUpdatePatient} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Outpatient Details</h3>
        <input type="text" placeholder="Enter Patient ID to update" value={updateID}
          onChange={(e) => setUpdateID(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Mobile Number" value={updatedData.MobileNumber}
          onChange={(e) => setUpdatedData({ ...updatedData, MobileNumber: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Address" value={updatedData.Address}
          onChange={(e) => setUpdatedData({ ...updatedData, Address: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="date" placeholder="Updated Discharge Date" value={updatedData.DischargeDate}
          onChange={(e) => setUpdatedData({ ...updatedData, DischargeDate: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
