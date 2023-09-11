// components/Settings.js
import React, { ReactElement, useState } from "react";
import { NextPageWithLayout } from "play/pages/_app";
import Layout from "play/components/layout";

const Settings: NextPageWithLayout = () => {
  // Initialize state for form fields
  const [formData, setFormData] = useState({
    name: "Yashasvi Tiwari",
    email: "yashasvi.tiwari.4648@gmail.com",
    password: "",
  });

  // Handle form input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (you can add your logic here)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Send the updated data to your server or perform other actions
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h1 className="text-2xl font-semibold">Dashboard Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Settings;
