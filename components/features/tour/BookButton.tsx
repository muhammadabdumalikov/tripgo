'use client';

interface BookButtonProps {
  className?: string;
}

const BookButton = ({ className = '' }: BookButtonProps) => {
  return (
    <button 
      onClick={() => {}} 
      className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 rounded-xl mt-6 transition-colors ${className}`}
    >
      Book Now
    </button>
  );
};

export default BookButton; 