'use client';

import { useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <button 
      onClick={toggleFavorite}
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center group shadow-sm hover:bg-gray-50 transition-all duration-300"
    >
      {isFavorite ? (
        <MdFavorite 
          className="w-6 h-6 text-red-500 transform transition-all duration-300 scale-100 group-hover:scale-110" 
        />
      ) : (
        <MdFavoriteBorder 
          className="w-6 h-6 text-gray-400 transform transition-all duration-300 scale-100 group-hover:scale-110" 
        />
      )}
    </button>
  );
} 