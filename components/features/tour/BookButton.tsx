'use client';

interface BookButtonProps {
  className?: string;
}

const BookButton = ({ className = '' }: BookButtonProps) => {
  return (
    <button 
      onClick={() => {}} 
      className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-neutral-50 font-medium py-4 rounded-xl mt-6 transition-colors ${className}`}
    >
      Book Now
    </button>
  );
};

export default BookButton; 