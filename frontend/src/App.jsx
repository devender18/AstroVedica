// App.jsx
import React, { useState } from "react";
import axios from "axios";
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BirthForm from './components/BirthForm';
import KundliResults from './components/KundliResults';

export default function App() {
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
  const [showForm, setShowForm] = useState(false);

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
      const res = await axios.post("https://16.171.230.135:5050/api/kundli", {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      });
      setKundliData(res.data);
      setShowForm(false);
    } catch (err) {
      console.error("Error fetching kundli:", err);
      setError("Failed to generate Kundli. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateKundli = () => {
    setShowForm(true);
    setKundliData(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {!showForm && !kundliData && (
        <HeroSection onGenerateKundli={handleGenerateKundli} />
      )}
      
      {showForm && (
        <BirthForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      )}
      
      {kundliData && (
        <KundliResults kundliData={kundliData} />
      )}
    </div>
  );
}