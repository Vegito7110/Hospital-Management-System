// src/components/Navbar.jsx

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Hospital System</h1>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/doctors" className="hover:underline">Doctors</Link></li>
          <li><Link to="/in-patients" className="hover:underline">In-Patients</Link></li>
          <li><Link to="/out-patients" className="hover:underline">Out-Patients</Link></li>
          <li><Link to="/rooms" className="hover:underline">Rooms</Link></li>
          <li><Link to="/staff" className="hover:underline">Staff</Link></li>
          <li><Link to="/cashier" className="hover:underline">Cashiers</Link></li>
          <li><Link to="/billing" className="hover:underline">Billing</Link></li>
        </ul>
      </div>
    </nav>
  );
}
