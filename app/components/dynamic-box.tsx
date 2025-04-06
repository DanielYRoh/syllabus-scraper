"use client"

import { useState } from "react";

const DynamicBox: React.FC = () => {
  const [boxes, setBoxes] = useState<string[]>([]);

  const handleAddBox = () => {
    setBoxes([...boxes, `Box ${boxes.length + 1}`]);
  };

  const handleDeleteBox = (indexToDelete: number) => {
    const updatedBoxes = boxes.filter((_, i) => i !== indexToDelete);
    setBoxes(updatedBoxes);
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
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-sm font-medium text-gray-700">{box}</h2>
            <button
              onClick={() => handleDeleteBox(index)}
              className="relative bottom-5 left-48 px-2 py-1 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
            >
                ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicBox;
