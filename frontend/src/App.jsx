import React, { useState } from "react";
import axios from "axios";
import DiamondChart from "./components/DiamondChart";
import NorthIndianChart from './components/NorthIndianChart'; 

const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5050/api/kundli", {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      });
      setKundliData(res.data);
    } catch (err) {
      console.error("Error fetching kundli:", err);
    }
  };

  const renderChart = (chart) => {
    // chart is an object: { sign: [planets] }
    const chartArr = ZODIAC_SIGNS.map((sign) => chart[sign]?.join(", ") || "");
    const grid = [
      [chartArr[6], chartArr[7], chartArr[8]],
      [chartArr[5], "", chartArr[9]],
      [chartArr[4], chartArr[3], chartArr[10]],
      [chartArr[2], chartArr[1], chartArr[11]],
      [chartArr[0], "", "Asc"],
    ];

    return (
      <div className="grid grid-cols-3 gap-2 border p-4 shadow rounded-xl w-[360px] bg-white">
        {grid.flat().map((val, idx) => (
          <div
            key={idx}
            className="h-20 flex items-center justify-center text-center border rounded bg-yellow-50 text-sm font-semibold"
          >
            {val || ""}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-yellow-100 to-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Kundli Generator</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 max-w-xl mb-10 bg-white p-6 shadow-xl rounded-xl"
      >
        <input
          className="border p-2 rounded"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          placeholder="Date of Birth (YYYY-MM-DD)"
          name="date_of_birth"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          placeholder="Time of Birth (HH:MM)"
          name="time_of_birth"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          placeholder="Latitude (e.g. 28.61)"
          name="latitude"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          placeholder="Longitude (e.g. 77.20)"
          name="longitude"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          placeholder="Timezone (e.g. Asia/Kolkata)"
          name="timezone"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="col-span-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        >
          Generate Kundli
        </button>
      </form>

      {kundliData && (
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <NorthIndianChart
            chart={kundliData.d1_chart}
            ascendant={ZODIAC_SIGNS.indexOf(kundliData.ascendant)}
            title="Lagna Chart"
          />
          <NorthIndianChart
            chart={kundliData.d9_chart}
            ascendant={ZODIAC_SIGNS.indexOf(kundliData.ascendant)}
            title="Navamsa Chart"
          />
        </div>
      )}
    </div>
  );
}
