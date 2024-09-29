"use client";
import React from 'react';

const FruitDiseaseDetectionPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans pt-20">
      <main className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-green-800 pb-4 mb-6 border-b border-gray-300">
          Fruit Disease Detection Capabilities
        </h2>
        
        <p className="mb-6">
          Our AI-powered image analysis system is capable of detecting various diseases in fruit crops. 
          Below is a comprehensive list of the fruit crops we support and the specific diseases our model can identify for each:
        </p>

        <div className="space-y-8">
          {[
            {
              crop: "Apple",
              diseases: ["Apple scab", "Powdery mildew", "Fire blight", "Healthy"]
            },
            {
              crop: "Peach",
              diseases: ["Brown rot", "Peach leaf curl", "Bacterial spot", "Healthy"]
            },
            {
              crop: "Grapes",
              diseases: ["Downy mildew", "Powdery mildew", "Black rot", "Healthy"]
            },
          ].map(({ crop, diseases }) => (
            <div key={crop} className="mb-4">
              <h3 className="text-xl font-semibold text-green-700 mb-2">{crop}</h3>
              <ul className="list-disc pl-6 space-y-1">
                {diseases.map(disease => (
                  <li key={disease} className="text-gray-700">{disease}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-green-700 mb-2">How to Use This Information</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Crop Selection: Choose the fruit crop you're analyzing from the list above.</li>
            <li>Image Upload: Take a clear, well-lit photo of the fruit or leaves showing signs of disease.</li>
            <li>Analysis: Our AI model will analyze the image and compare it against known patterns for the listed diseases.</li>
            <li>Results: The system will provide a diagnosis, identifying whether the plant is healthy or affected by a listed disease.</li>
            <li>Prevention and Treatment: Based on the diagnosis, refer to our detailed guide for specific measures.</li>
          </ol>
        </div>

        <p className="mt-6 text-gray-700 italic">
          Remember, early detection is crucial for effective disease management. Regular monitoring and prompt action can significantly improve crop health and yield.
        </p>
      </main>
    </div>
  );
};

export default FruitDiseaseDetectionPage;
