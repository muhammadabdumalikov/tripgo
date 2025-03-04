'use client';

interface BookButtonProps {
  className?: string;
}

const BookButton = ({ className = '' }: BookButtonProps) => {
  return (
    <button 
      onClick={() => {}} 
      className={`w-full bg-primary hover:bg-primary-700 text-neutral-50 font-medium py-4 rounded-xl mt-6 transition-colors ${className}`}
    >
      Book Now
    </button>
  );
};

export default BookButton; 