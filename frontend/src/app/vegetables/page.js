import React from 'react';

const Vegetables = () => {
  return (
    <div className="container mx-auto py-8 px-4 pt-0">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-6">
        Vegetable Disease Detection Capabilities
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Our AI-powered image analysis system is capable of detecting various diseases in vegetable crops. Below is a comprehensive list of the vegetable crops we support and the specific diseases our model can identify for each:
      </p>

      {/* Tomato Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-green-500 mb-4">Tomato</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Bacterial spot</li>
          <li>Early blight</li>
          <li>Late blight</li>
          <li>Leaf mold</li>
          <li>Septoria leaf spot</li>
          <li>Spider mites (Two-spotted spider mite)</li>
          <li>Target spot</li>
          <li>Yellow leaf curl virus</li>
          <li>Tomato mosaic virus</li>
          <li>Healthy (no disease detected)</li>
        </ul>
      </div>

      {/* Pepper Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-green-500 mb-4">Pepper</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Bacterial spot</li>
          <li>Healthy (no disease detected)</li>
        </ul>
      </div>

      {/* Corn Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-green-500 mb-4">Corn</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Cercospora leaf spot</li>
          <li>Common rust</li>
          <li>Northern leaf blight</li>
          <li>Healthy (no disease detected)</li>
        </ul>
      </div>

      {/* Potato Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-green-500 mb-4">Potato</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Early blight</li>
          <li>Late blight</li>
          <li>Healthy (no disease detected)</li>
        </ul>

        <h3 className="text-2xl font-semibold text-green-600 mb-4 mt-4">Common Potato Diseases and Preventive Measures</h3>
        
        {/* Early Blight */}
        <h4 className="text-xl font-semibold text-green-600 mb-2">Early Blight</h4>
        <p className="text-gray-700 mb-2">
          Early blight is caused by the fungus <em>Alternaria solani</em> and can affect leaves, stems, and tubers.
        </p>
        <p className="font-semibold">Preventive Measures:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Use disease-free seed potatoes</li>
          <li>Practice crop rotation</li>
          <li>Maintain proper plant spacing for good air circulation</li>
          <li>Apply fungicides as a preventive measure</li>
        </ul>

        {/* Late Blight */}
        <h4 className="text-xl font-semibold text-green-600 mb-2">Late Blight</h4>
        <p className="text-gray-700 mb-2">
          Late blight is caused by the oomycete <em>Phytophthora infestans</em> and can rapidly destroy entire fields.
        </p>
        <p className="font-semibold">Preventive Measures:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Plant resistant varieties when available</li>
          <li>Destroy all cull piles and volunteer potato plants</li>
          <li>Apply fungicides before disease symptoms appear</li>
          <li>Monitor fields regularly for signs of infection</li>
        </ul>

        {/* Maintaining Healthy Potatoes */}
        <h4 className="text-xl font-semibold text-green-600 mb-2">Maintaining Healthy Potatoes</h4>
        <p className="font-semibold">Best Practices:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Ensure proper soil drainage</li>
          <li>Maintain balanced soil fertility</li>
          <li>Water plants at the base to keep foliage dry</li>
          <li>Practice good sanitation in the field</li>
        </ul>
      </div>

      {/* How to Use Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">How to Use This Information</h2>
        <ol className="list-decimal list-inside text-gray-700 mb-4">
          <li><strong>Crop Selection:</strong> Choose the vegetable crop you're analyzing from the list above.</li>
          <li><strong>Image Upload:</strong> Take a clear, well-lit photo of the plant leaves or fruits showing signs of disease.</li>
          <li><strong>Analysis:</strong> Our AI model will analyze the image and compare it against known patterns for the diseases listed under your selected crop.</li>
          <li><strong>Results:</strong> The system will provide a diagnosis, identifying whether the plant is healthy or affected by one of the listed diseases.</li>
          <li><strong>Prevention and Treatment:</strong> Based on the diagnosis, refer to our detailed guide on prevention and treatment measures for the specific disease detected.</li>
        </ol>
        <p className="text-gray-700">
          Remember, early detection is crucial for effective disease management. Regular monitoring and prompt action can significantly improve crop health and yield.
        </p>
      </div>

      {/* Limitations Section */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Limitations</h2>
        <p className="text-gray-700">
          Please note that while our system is highly accurate, it is limited to detecting only the diseases listed for each vegetable crop. If your plant is affected by a disease not listed here, or if the symptoms are not clearly visible in the image, the system may not be able to provide an accurate diagnosis. In such cases, we recommend consulting with a local agricultural expert or extension service.
        </p>
        <p className="text-gray-700 mt-4">
          For more detailed information on each disease, including symptoms, prevention measures, and treatment options, please refer to our comprehensive crop-specific guides.
        </p>
      </div>
    </div>
  );
};

export default Vegetables;
