import React, { useState } from "react";

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
            </select>

            {/* Default disabled option */}
            <option value="" disabled>
              Select a Specialization
            </option>

            {/* Map over options array */}
          </div>
        </form>
    </div>
  );
}
