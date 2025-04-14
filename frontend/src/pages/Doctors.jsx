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
    mobilenumber: '',
    cabin: '',
    address: ''
  });

  // Handle changes in form inputs

  const handleChange = (e) => {
    const { name,value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  // Handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="px-6 max-w-4xl mx-auto">
      <h2 className="font-montserrat text-2xl font-semibold mb-6 text-gray-800 mt-10">Add New Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg">
          
          {/* Doctor ID Field */}
          <div>
            <label htmlFor="doctorID" className="block text-sm font-medium text-gray-700 mb-1">
              DoctorID
            </label>
              <input 
                type="number" id="doctorID" name="doctorID" value={formData.doctorID} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 101" 
             />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
              <input 
                type="text" id="name" 
                name="name" value={formData.name} 
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Dr. Nitin"
              />
          </div>

          {/* Specialization Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <select 
              type="text" id="name" 
              name="specialization" value={formData.specialization} 
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">

              {/* Default disabled option */}
              <option value="" disabled>
                Select a Specialization
              </option>

              {/* Map over options array */}
              {specializationOptions.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Number Field */}
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 9876543210"
            />
          </div>

          {/* Cabin Field */}
          <div>
            <label htmlFor="cabin" className="block text-sm font-medium text-gray-700 mb-1">
              Cabin Number
            </label>
            <input
              type="text"
              id="cabin"
              name="cabin"
              value={formData.cabin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 203"
            />
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 123 Church Street, Delhi"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Doctor
            </button>
          </div>
        </form>
    </div>
  );
}
