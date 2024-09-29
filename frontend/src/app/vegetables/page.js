"use client";
import React from 'react';

const VegetableDiseaseDetectionPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans pt-20">

      <main className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-green-800 pb-4 mb-6 border-b border-gray-300">
          Vegetable Disease Detection Capabilities
        </h2>
        
        <p className="mb-6">
          Our AI-powered image analysis system is capable of detecting various diseases in vegetable crops. 
          Below is a comprehensive list of the vegetable crops we support and the specific diseases our model can identify for each:
        </p>

        <div className="space-y-8">
          {[
            {
              crop: "Tomato",
              diseases: ["Bacterial spot", "Early blight", "Late blight", "Leaf mold", "Septoria leaf spot", "Spider mites", "Target spot", "Yellow leaf curl virus", "Tomato mosaic virus", "Healthy"]
            },
            {
              crop: "Pepper",
              diseases: ["Bacterial spot", "Healthy"]
            },
            {
              crop: "Corn",
              diseases: ["Cercospora leaf spot", "Common rust", "Northern leaf blight", "Healthy"]
            },
            {
              crop: "Potato",
              diseases: ["Early blight", "Late blight", "Healthy"]
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
            <li>Crop Selection: Choose the vegetable crop you're analyzing from the list above.</li>
            <li>Image Upload: Take a clear, well-lit photo of the plant leaves or fruits showing signs of disease.</li>
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

export default VegetableDiseaseDetectionPage;