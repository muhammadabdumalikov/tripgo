'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Category {
  label: string;
  icon: string;
}

const categories: Category[] = [
  { label: 'Cabins', icon: '/icons/cabin.svg' },
  { label: 'Icons', icon: '/icons/landmark.svg' },
  { label: 'Amazing views', icon: '/icons/view.svg' },
  { label: 'Beachfront', icon: '/icons/beach.svg' },
  { label: 'OMG!', icon: '/icons/omg.svg' },
  { label: 'Caves', icon: '/icons/cave.svg' },
  { label: 'Treehouses', icon: '/icons/treehouse.svg' },
  { label: 'Mansions', icon: '/icons/mansion.svg' },
  { label: 'Tiny homes', icon: '/icons/tiny-home.svg' },
  { label: 'Lakefront', icon: '/icons/lake.svg' },
  { label: 'Amazing pools', icon: '/icons/pool.svg' },
  { label: 'Play', icon: '/icons/play.svg' },
  { label: 'Countryside', icon: '/icons/countryside.svg' },
];

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Cabins');

  return (
    <div className="flex items-center gap-8 overflow-x-auto pb-4 pt-2">
      {categories.map((category) => (
        <button
          key={category.label}
          onClick={() => setSelectedCategory(category.label)}
          className={`flex min-w-fit flex-col items-center gap-2 border-b-2 pb-2 transition-all ${
            selectedCategory === category.label
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-black'
          }`}
        >
          <div className="relative h-6 w-6">
            <Image
              src={category.icon}
              alt={category.label}
              fill
              className="object-contain opacity-70"
            />
          </div>
          <span className="text-xs font-medium">{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter; 