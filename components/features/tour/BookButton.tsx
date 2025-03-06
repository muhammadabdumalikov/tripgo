'use client';

interface BookButtonProps {
  className?: string;
}

const BookButton = ({ className = '' }: BookButtonProps) => {
  return (
    <button 
      onClick={() => {}} 
      className={`w-full bg-[#febd2d] hover:bg-[#e5a827] text-black font-medium py-4 rounded-xl mt-6 transition-colors ${className}`}
    >
      Book Now
    </button>
  );
};

export default BookButton; 