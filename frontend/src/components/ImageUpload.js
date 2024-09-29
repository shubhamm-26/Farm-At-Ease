"use client";

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import logoGreen from '../assets/logoGreen.svg';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ImageUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPrediction("");
    setConfidence("");
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image to analyze");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    setPrediction("");
    setConfidence("");
    setPreviewUrl(null);
    
    try {
      const url = `${apiUrl}/${props.type}/${props.name}/predict`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.predicted_class);
      setConfidence(data.confidence);
    } catch (error) {
      console.error("Error uploading file", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full h-[84%]">
        <h1 className="text-xl font-semibold mb-4">Predict Plant Disease</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col h-1/2">
          <div className="mb-4 h-[90%] w-full">
            <label className="flex justify-center items-center w-full h-full border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition">
              {previewUrl ? (
                <img 
                src={previewUrl} 
                alt="Preview" 
                className=" h-full object-fill"
              />
              ) : (
                <div className='flex flex-col justify-center items-center'>
                <Image 
                  src={logoGreen} 
                  alt="Upload Logo" 
                  className="w-16 h-full mb-4" 
                />
                Upload Image
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
          
          <button
            type="submit"
            className={`w-full py-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            disabled={!selectedFile || loading}
          >
            {loading ? "Analyzing..." : "Analyze Plant"}
          </button>
        </form>
        
        {prediction && (
          <div className="mt-4 bg-green-100 border border-green-300 text-green-700 p-3 rounded">
            <p className="font-bold">Prediction Result</p>
            <p>
              <strong>{prediction}</strong>
              <br />
              Confidence: {confidence}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
