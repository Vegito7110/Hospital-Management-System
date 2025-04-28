import react, { useState } from "react";
import axios from 'axios'

export default function InPatients() {
  const [formData, setFormData] = useState({
    PatientID: '',
    AdmissionID: '',
    AdmissionDate: '',
    DischargeDate: '',
    RoomNumber: '',
    Gender: '',
    MobileNumber: '',
    Address: '',
    DoctorID: ''
  });
  const [patientID, setDoctorID] = useState('');
  const [updateID, setUpdateID] = useState('');
  const [deleteID, setDeleteID] = useState('');
  const [updatedData, setUpdatedData] = useState({
    Name: '',
    Specialization: '',
    MobileNumber: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/inpatient1', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("InPatient added successfully:", response.data);
      alert("Patient added!");
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to add patient");
    }
  };

  const handleCheckPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/admin/inpatient1/${patientID}`);
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
      await axios.delete(`http://localhost:5000/admin/inpatient1/${deleteID}`);
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
      const response = await axios.patch(`http://localhost:5000/admin/inpatient1/${updateID}`, updatedData);
      console.log("Patient updated successfully:", response.data);
      alert("Patient updated!");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Patient Details</h2> 
      {/* Add InPatient Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg mb-10">
        {/* Patient ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
          <input type="number" name="PatientID" value={formData.PatientID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 101" required />
        </div>
        {/* Admission ID*/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">AdmissionID</label>
          <input type="number" name="AdmissionID" value={formData.AdmissionID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 111" required />
        </div>

        {/* AdmissionDate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
          <input type="date" name="AdmissionDate" value={formData.AdmissionDate} onChange={handleChange} required
            className="w-full px-3 py-2 border rounded-md">
          </input>
        </div>

        {/* Discharge Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discharge Date</label>
          <input type="date" name="DischargeDate" value={formData.DischargeDate} onChange={handleChange} required
            className="w-full px-3 py-2 border rounded-md">
          </input>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input type="tel" name="MobileNumber" value={formData.MobileNumber} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 9876543210" />
        </div>
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <input type="text" name="Gender" value={formData.Gender} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., Male/Female" />
        </div>

        {/* RoomNumber*/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cabin</label>
          <input type="number" name="RoomNumber" value={formData.RoomNumber} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 203" />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea name="Address" value={formData.Address} onChange={handleChange} rows={3}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 123 Church Street, Delhi" />
        </div>

        {/* Doctor ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Doctor ID</label>
          <input type="number" name="DoctorID" value={formData.DoctorID} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 101" />
        </div>

        {/* Submit */}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Patient
        </button>
      </form>

      {/* Delete Inpatient */}
      <form onSubmit={handleDeletePatient} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Delete InPatient</h3>
        <input type="text" placeholder="Enter Patient ID to delete" value={deleteID}
          onChange={(e) => setDeleteID(e.target.value)} className="border px-3 py-2 rounded w-full" />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
    
      </form>
      
      {/* Update InPatient */}
      <form onSubmit={handleUpdatePatient} className="mb-10 space-y-2">
        <h3 className="text-lg font-semibold">Update Patient Details</h3>
        <input type="number" placeholder="Enter Patient ID to update" value={updateID}
          onChange={(e) => setUpdateID(e.target.value)} className="border px-3 py-2 rounded w-full" />

        <input type="number" placeholder="Updated AdmissionID" value={updatedData.AdmissionID}
          onChange={(e) => setUpdatedData({ ...updatedData, AdmissionID: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <input type="text" placeholder="Updated Mobile Number" value={updatedData.MobileNumber}
          onChange={(e) => setUpdatedData({ ...updatedData, MobileNumber: e.target.value })}
          className="border px-3 py-2 rounded w-full" />

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );

}