"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Potato from '../assets/Potato.jpg';
import Tomato from '../assets/Tomato.jpg';
import Corn from '../assets/Corn.jpg';
import Pepper from '../assets/Pepper.jpg';
import Apple from '../assets/Apple.jpg';
import Peach from '../assets/Peach.jpg';
import Grapes from '../assets/Grapes.jpg';

const SupportedCrops = () => {
    const [activeTab, setActiveTab] = useState('Vegetables');

    // Map of crops to their corresponding images
    const cropImages = {
        Potato,
        Tomato,
        Corn,
        Pepper,
        Apple,
        Peach,
        Grapes,
    };

    const fruits = ['Apple', 'Peach', 'Grapes'];
    const vegetables = ['Potato', 'Tomato', 'Corn', 'Pepper'];

    const renderCropCards = (crops, type) => {
        return crops.map((crop) => (
            <Link
                key={crop}
                href={`/${type.toLowerCase()}/${crop.toLowerCase()}`}
                className="relative overflow-hidden rounded-lg shadow-md aspect-square group"
            >
                <Image
                    src={cropImages[crop]}
                    alt={crop}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-100 opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-semibold mb-2">{crop}</h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to identify diseases in {crop.toLowerCase()} leaves
                    </p>
                </div>
            </Link>
        ));
    };

    return (
        <section className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Supported Crops</h2>
            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'Fruits'
                            ? 'text-white bg-green-700'
                            : 'text-green-700 bg-white hover:bg-green-50'
                            }`}
                        onClick={() => setActiveTab('Fruits')}
                    >
                        Fruits
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'Vegetables'
                            ? 'text-white bg-green-700'
                            : 'text-green-700 bg-white hover:bg-green-50'
                            }`}
                        onClick={() => setActiveTab('Vegetables')}
                    >
                        Vegetables
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {activeTab === 'Fruits' ? renderCropCards(fruits, 'fruits') : renderCropCards(vegetables, 'vegetables')}
            </div>
        </section>
    );
};

export default SupportedCrops;
