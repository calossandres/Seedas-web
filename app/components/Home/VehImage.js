'use client';

import React, { useState } from 'react';

function VehImage({ images, setImages }) {
    const [previewImages, setPreviewImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);

        const preview = files.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...preview]);
    };

    const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="mt-4">
            <label className='block mb-2 font-semibold'>Sube imágenes del vehículo:</label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="p-2 border rounded w-full"
            />
            <div className="mt-2 grid grid-cols-3 gap-2">
                {previewImages.map((src, index) => (
                    <div key={index} className="relative">
                        <img src={src} alt={`Vehículo ${index}`} className="w-full h-20 object-cover rounded" />
                        <button
                            className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full p-1"
                            onClick={() => handleRemoveImage(index)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VehImage;
