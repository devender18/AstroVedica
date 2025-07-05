import React, { useState } from "react";
import axios from "axios";
import NorthIndianChart from './components/NorthIndianChart'; 

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export default function KundliApp() {
  const [formData, setFormData] = useState({
    name: "",
    date_of_birth: "",
    time_of_birth: "",
    timezone: "Asia/Kolkata",
    latitude: "",
    longitude: "",
  });
  const [kundliData, setKundliData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://127.0.0.1:5050/api/kundli", {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      });
      setKundliData(res.data);
    } catch (err) {
      console.error("Error fetching kundli:", err);
      setError("Failed to generate Kundli. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🌟 Vedic Astrology Kundli Generator 🌟
        </h1>
        
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Birth Details</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time of Birth
              </label>
              <input
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                type="time"
                name="time_of_birth"
                value={formData.time_of_birth}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., 28.6139 (Delhi)"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., 77.2090 (Delhi)"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-lg font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Generating Kundli..." : "🔮 Generate Kundli"}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {kundliData && (
          <div className="bg-white rounded-xl shadow-2xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {kundliData.name}'s Kundli
              </h2>
              <p className="text-gray-600">
                Ascendant: <span className="font-semibold text-yellow-600">{kundliData.ascendant}</span>
              </p>
              {kundliData.birth_info && (
                <p className="text-sm text-gray-500 mt-2">
                  Born on {kundliData.birth_info.date} at {kundliData.birth_info.time} ({kundliData.birth_info.timezone})
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 justify-items-center">
              <NorthIndianChart
                chart={kundliData.d1_chart}
                ascendant={kundliData.ascendant}
                title="Lagna Chart (D1)"
              />
              <NorthIndianChart
                chart={kundliData.d9_chart}
                ascendant={kundliData.ascendant}
                title="Navamsa Chart (D9)"
              />
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-yellow-800">Chart Information</h3>
              <p className="text-sm text-yellow-700">
                <strong>Lagna Chart (D1):</strong> Shows the main life themes, personality, and general life path.<br/>
                <strong>Navamsa Chart (D9):</strong> Shows marriage compatibility, spiritual path, and inner strength.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}