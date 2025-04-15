import react, { useState } from "react";

export default function InPatients() {
  const [formData, setFormData] = useState({
    patientID: '',
    admissionID: '',
    admissiondate: '',
    dischargedate: '',
    roomno: '',
    gender: '',
    mobileno: '',
    address: '',
    doctorID: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Patient Details</h2> 
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg">
          {/* Patient ID */}
          <div>
            <label htmlFor="patientID" className="block text-sm font-medium text-gray-700 mb-1"> Patient ID</label>
            <input 
              type="text"
              id="patientID"
              name="patientID"
              value={formData.patientID}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., IP101"
            />
          </div>

          {/* Admission ID */}
          <div>
            <label htmlFor="admissionID" className="block text-sm font-medium text-gray-700 mb-1"> Admission ID </label>
            <input 
              type="text"
              id="admissionID"
              name="admissionID"
              value={formData.admissionID}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., A101"
            />
          </div>

          {/* Admission Date */}
          <div>
            <label htmlFor="admissiondate" className="block text-sm font-medium text-gray-700 mb-1"> Admission Date </label>
            <input 
              type="date"
              id="admissiondate"
              name="admissiondate"
              value={formData.admissiondate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Discharge Date */}
          <div>
            <label htmlFor="dischargedate" className="block text-sm font-medium text-gray-700 mb-1"> Discharge Date </label>
            <input 
              type="date"
              id="dischargedate"
              name="dischargedate"
              value={formData.dischargedate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Room Number */}
          <div>
            <label htmlFor="roomno" className="block text-sm font-medium text-gray-700 mb-1"> Room Number </label>
            <input 
              type="number"
              step={1}
              id="roomno"
              name="roomno"
              value={formData.roomno}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          { /* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1"> Gender </label>
              <input type="text"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
              />
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700 mb-1"> Mobile Number </label>
            <input 
              type="tel"
              id="mobileno"
              name="mobileno"
              value={formData.mobileno}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 9876543210"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1"> Address </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter address"
            />
          </div>

          {/* Doctor ID */}
          <div>
            <label htmlFor="doctorID" className="block text-sm font-medium text-gray-700 mb-1"> Doctor ID </label>
            <input 
              type="text"
              id="doctorID"
              name="doctorID"
              value={formData.doctorID}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., D101"
            />
          </div>

          <button
            type="submit"
            className="w-full px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Submit
          </button>
        </form>
    </div>
  );

}