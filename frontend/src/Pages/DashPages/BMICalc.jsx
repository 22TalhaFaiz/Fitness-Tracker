import React, { useState } from "react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    if (!weight || !height) {
      setBmi(null);
      setStatus("Please enter valid weight and height.");
      return;
    }

    const heightInMeters = height / 100; // convert cm to meters
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setStatus("Underweight");
    else if (bmiValue >= 18.5 && bmiValue < 24.9) setStatus("Normal weight");
    else if (bmiValue >= 25 && bmiValue < 29.9) setStatus("Overweight");
    else setStatus("Obese");
  };

  return (
    <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg max-w-md mx-auto text-white w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">BMI Calculator</h2>

      <div className="mb-4">
        <label className="block mb-1">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your weight"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your height"
        />
      </div>

      <button
        onClick={calculateBMI}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        Calculate
      </button>

      {bmi && (
        <div className="mt-4 p-4 rounded-lg bg-neutral-700 text-center">
          <p className="text-lg">Your BMI: <span className="font-bold">{bmi}</span></p>
          <p className="text-sm text-gray-300">{status}</p>
        </div>
      )}

      {!bmi && status && (
        <p className="mt-3 text-red-400 text-center">{status}</p>
      )}
    </div>
  );
};

export default BMICalculator;
