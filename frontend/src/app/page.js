import Footer from "@/components/Footer";
import SupportedCrops from "@/components/SupportedCrops";
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../assets/logoGreen.svg';

export default function Home() {
  return (
    <div className="pt-20  min-h-screen">
      {/* Header Section */}
      <section className="text-center py-10 flex flex-col items-center mb-20">
        <Image src={Logo} alt="Farm At Ease" width={150} height={150} />
        <h1 className="text-7xl font-bold text-green-800 mt-20">Welcome Farm At Ease</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
          Use our machine learning model to identify diseases in your crops effortlessly! 
          Just upload an image of the leaf, and we'll help you understand what's wrong.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="max-w-3xl mx-auto p-6">
  <h2 className="text-3xl font-bold text-center text-green-700 mb-6">How It Works</h2>
  <div className="space-y-6">
    <div className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold text-green-600">1. Upload Image</h3>
      <p className="mt-2 text-gray-600">
        Snap a photo of the leaf and upload it here for analysis.
      </p>
    </div>
    <div className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold text-green-600">2. Analyze</h3>
      <p className="mt-2 text-gray-600">
        Our machine learning model will analyze the image for diseases.
      </p>
    </div>
    <div className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold text-green-600">3. Get Results</h3>
      <p className="mt-2 text-gray-600">
        Receive instant result with the disease detected.
      </p>
    </div>
  </div>
</section>

      {/* Supported Crops Section */}

      <SupportedCrops />

      {/* Footer */}
      <Footer />
    </div>
  );
}
