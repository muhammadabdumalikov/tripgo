import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface Story {
  id: number;
  name: string;
  image: string;
}

const stories: Story[] = [
  {
    id: 1,
    name: 'Sarah',
    image: '/images/reviewer.png',
  },
  {
    id: 2,
    name: 'Michael',
    image: '/images/bg2.jpg',
  },
  {
    id: 3,
    name: 'Emma',
    image: '/images/reviewer.png',
  },
  {
    id: 4,
    name: 'Jessica',
    image: '/images/reviewer.png',
  },
  {
    id: 5,
    name: 'David',
    image: '/images/reviewer.png',
  },
];

const Stories = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openStory = (story: Story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const closeStory = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  return (
    <>
      <section className="mt-12 py-8 w-[90%] xl:w-[80%] mx-auto mb-8">
        <div className="w-full flex justify-between items-center mb-4 pt-4">
          <h2 className="text-2xl font-bold">Travel Stories</h2>
        </div>
        
        <div className="w-full pt-2 pb-8 flex items-center space-x-14 overflow-x-auto">
          {stories.map((story) => (
            <div 
              key={story.id} 
              className="flex flex-col items-center group cursor-pointer flex-shrink-0"
              onClick={() => openStory(story)}
            >
              <div className="relative w-28 h-28 mb-2">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 p-1 
                              transform transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={story.image}
                        alt={`${story.name}'s story`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 whitespace-nowrap">
                {story.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedStory && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center">
            <button 
              onClick={closeStory}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-[10000]"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative w-full h-full max-w-4xl max-h-[90vh] mx-auto my-8">
              <div className="absolute top-0 left-0 right-0 p-4 z-[10000] flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <Image
                      src={selectedStory.image}
                      alt={selectedStory.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-white font-medium">{selectedStory.name}</span>
                </div>
              </div>
              
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={selectedStory.image}
                    alt={selectedStory.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default Stories; 