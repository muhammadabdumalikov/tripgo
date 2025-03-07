'use client';

interface BookButtonProps {
  className?: string;
  tour?: {
    title: string;
    price: string | number;
    location?: string;
  };
}

const BookButton = ({ className = '', tour }: BookButtonProps) => {
  const handleShare = () => {
    const message = tour 
      ? `🎉 I want to book this tour!\n\n🏷 ${tour.title}\n💰 $${tour.price}\n📍 ${tour.location || ''}`
      : '🎉 I want to book a tour!';

    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const handleBookNow = () => {
    const message = tour 
      ? `Hello! I would like to book this tour:\n\n${tour.title}\n$${tour.price}\n${tour.location || ''}`
      : 'Hello! I would like to book a tour!';

    const telegramUrl = `https://t.me/muhammadabdumalik?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={handleBookNow}
        className={`w-full bg-[#febd2d] hover:bg-[#e5a827] text-black font-medium py-4 rounded-xl transition-colors ${className}`}
      >
        Book Now
      </button>
      <button 
        onClick={handleShare}
        className="w-full bg-[#229ED9] hover:bg-[#1d8abf] text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.43 8.43l-7.17 7.17c-.2.2-.51.2-.71 0l-3.17-3.17c-.2-.2-.2-.51 0-.71.2-.2.51-.2.71 0l2.59 2.59 6.59-6.59c.2-.2.51-.2.71 0 .19.2.19.51 0 .71z"/>
        </svg>
        Share on Telegram
      </button>
    </div>
  );
};

export default BookButton; 