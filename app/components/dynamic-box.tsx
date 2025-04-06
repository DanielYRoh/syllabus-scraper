"use client"

import { useState } from "react";

const DynamicBox: React.FC = () => {
  const [boxes, setBoxes] = useState<string[]>([]);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  const handleAddBox = () => {
    setBoxes([...boxes, `Box ${boxes.length + 1}`]);
  };

  const handleDeleteBox = (indexToDelete: number) => {
    const updatedBoxes = boxes.filter((_, i) => i !== indexToDelete);
    setBoxes(updatedBoxes);
  };

  const toggleDropdown = (index: number) => {
    setDropdownIndex((dropdownIndex) => (dropdownIndex === index ? null : index));
  };

  return (
    <div>
      <button
        onClick={handleAddBox}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 mb-4"
      >
        + Add Box
      </button>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition relative"
          >
            <h2 className="text-sm font-medium text-gray-700">{box}</h2>
  
            <button
              onClick={() => toggleDropdown(index)}
              className="absolute top-2 right-2 text-black text-2xl"
            >
              ⋮
            </button>
  
            {dropdownIndex === index && (
              <div className="absolute top-10 right-2 bg-white shadow-lg rounded-lg p-2 z-10">
                <button
                  onClick={() => alert(`Option 1 for ${box}`)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Send Email
                </button>
                <button
                  onClick={() => alert(`Option 2 for ${box}`)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Google Calendar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
  export default DynamicBox;