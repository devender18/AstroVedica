// components/BirthForm.jsx
import React from 'react';

const BirthForm = ({ formData, onChange, onSubmit, loading, error }) => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Enter Your Birth Details
          </h2>
          
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Enter your full name"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                required
              />
            </div>
            
            {/* Date and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={onChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time of Birth
                </label>
                <input
                  type="time"
                  name="time_of_birth"
                  value={formData.time_of_birth}
                  onChange={onChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            {/* Location Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Latitude
                </label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={onChange}
                  placeholder="e.g., 28.6139"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Longitude
                </label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={onChange}
                  placeholder="e.g., 77.2090"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  required
                />
              </div>
            </div>
            
            {/* Timezone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Timezone
              </label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={onChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
              </select>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-colors text-lg"
              >
                {loading ? "Calculating Horoscope..." : "Calculate Horoscope"}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="mt-6 p-4 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BirthForm;