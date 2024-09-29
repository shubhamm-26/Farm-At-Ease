import { useState } from 'react';

const FruitDetails = ({ fruits, fruitData }) => {
    return (
        <div className='mr-4 w-[50%] mb-4 overflow-y-scroll bg-white shadow-lg rounded-lg p-6 border border-gray-200'>
            <h1 className="text-3xl font-bold text-center mb-4 text-green-700">
                {fruits.charAt(0).toUpperCase() + fruits.slice(1)}
            </h1>
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4 text-gray-800">
                Diseases
            </h2>
            {Object.entries(fruitData.diseases).map(([disease, info]) => (
                <div key={disease} className="mb-6">
                    <h3 className="text-xl font-medium text-green-700 cursor-pointer">
                        <Dropdown disease={disease} info={info} />
                    </h3>
                </div>
            ))}
            <h2 className="text-2xl font-semibold border-t pt-4 mt-6 text-gray-800">
                Best Practices
            </h2>
            <ul className="list-disc ml-5 space-y-1">
                {fruitData.best_practices.map((practice, index) => (
                    <li key={index} className="text-gray-600">{practice}</li>
                ))}
            </ul>
        </div>
    );
};

const Dropdown = ({ disease, info }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center p-2 border border-gray-300 rounded-lg mb-2 hover:bg-gray-100 cursor-pointer"
            >
                <span>{disease}</span>
                <span className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </div>
            {isOpen && (
                <div className="pl-4 text-gray-700">
                    <p>{info.description}</p>
                    <h4 className="font-semibold mt-2">Preventive Measures:</h4>
                    <ul className="list-disc ml-5 space-y-1">
                        {info.preventive_measures.map((measure, index) => (
                            <li key={index} className="text-gray-600">{measure}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FruitDetails;
