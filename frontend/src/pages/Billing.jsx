import React, { useState } from "react";

export default function Billing() {
  const [formData, setFormData] = useState({
    billID: '',
    inPatientID: '',
    outPatientID: '',
    roomID: '',
    expenses: ''
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value
    setFormData(prevState => ({
      ...prevState,
      [name]: value // Update the specific field
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default page reload
    console.log("Form Data Submitted: ", formData);
    // In a real application, you would send this data to your backend API here
    // Example:
    // fetch('/api/billing', { method: 'POST', body: JSON.stringify(formData), headers: {'Content-Type': 'application/json'} })
    //  .then(response => response.json())
    //  .then(data => console.log('Success:', data))
    //  .catch(error => console.error('Error:', error));

    // Optionally clear the form after submission
    // setFormData({
    //   billID: '',
    //   inPatientID: '',
    //   outPatientID: '',
    //   roomID: '',
    //   expenses: ''
    // });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Bill Details</h2> 
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg">

          {/* Bill ID Field */}
          <div>
            <label htmlFor="billID" className="block text-sm font-medium text-gray-700 mb-1">
              Bill ID
            </label>
              <input
                type="number" // Assuming BillID is numeric
                step={1}
                id="billID"
                name="billID" // Matches the key in formData state
                value={formData.billID}
                onChange={handleChange}
                required // Example: Make Bill ID required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 1001"
             />
          </div>

          {/* In-Patient ID Field */}
          <div>
            <label htmlFor="inPatientID" className="block text-sm font-medium text-gray-700 mb-1">
              In-Patient ID (if applicable)
            </label>
              <input
                type="text" // Use text to allow IDs like 'IP123'
                id="inPatientID"
                name="inPatientID"
                value={formData.inPatientID}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., IP501"
                disabled={formData.outPatientID !== ""}
             />
             {formData.outPatientID !== "" && (
             <p className="text-sm text-gray-500 mt-1">
                Disabled because InPatient ID is filled
              </p>
            )}
          </div>

          {/* Out-Patient ID Field */}
          <div>
            <label htmlFor="outPatientID" className="block text-sm font-medium text-gray-700 mb-1">
              Out-Patient ID (if applicable)
            </label>
              <input
                type="text" // Use text to allow IDs like 'OP802'
                id="outPatientID"
                name="outPatientID"
                value={formData.outPatientID}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., OP802"
                disabled={formData.inPatientID !== "" || formData.roomID !== ""}
             />
             {(formData.inPatientID !== "" || formData.roomID !== "") && (
              <p className="text-sm text-gray-500 mt-1">
                Disabled because InPatient ID or Room ID is filled
              </p>
            )}
          </div>

          {/* Room ID Field */}
          <div>
            <label htmlFor="roomID" className="block text-sm font-medium text-gray-700 mb-1">
              Room ID (if In-Patient)
            </label>
              <input
                type="text" // Use text to allow IDs like 'R305' or just numbers
                id="roomID"
                name="roomID"
                value={formData.roomID}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 305"
                disabled={formData.outPatientID !== ""}
             />
             {formData.outPatientID !== "" && (
             <p className="text-sm text-gray-500 mt-1">
                Disabled because Room ID is filled
              </p>
            )}
          </div>

           {/* Expenses Field */}
          <div>
            <label htmlFor="expenses" className="block text-sm font-medium text-gray-700 mb-1">
              Total Expenses
            </label>
              <input
                type="number" // Use number for currency/costs
                id="expenses"
                name="expenses"
                value={formData.expenses}
                onChange={handleChange}
                required // Example: Make expenses required
                step="0.01" // Allows decimal input for currency
                min="0" // Prevent negative expenses
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 1500.50"
             />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Bill
            </button>
          </div>

        </form>
    </div>
  );
}