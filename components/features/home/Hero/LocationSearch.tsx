'use client';
import { useState, useEffect, useRef } from "react";
import { GrLocation } from "react-icons/gr";

interface LocationSearchProps {
  onLocationSelect?: (location: string) => void;
}

interface LocationItem {
  id: number;
  name: string;
  address: string;
}

const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<LocationItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locationSearchContent = [
    { id: 1, name: "Nefrit Ko'li", address: "Tashkent, Uzbekistan" },
    { id: 2, name: "Gulkam Sharsharasi", address: "Tashkent, Uzbekistan" },
    { id: 3, name: "Tuzkon ko'li", address: "Jizzax, Uzbekistan" },
    { id: 4, name: "Issiqko'l", address: "Bishkek, Kyrgyzstan" },
    { id: 5, name: "Issiqko'l", address: "Bishkek, Kyrgyzstan" },
    { id: 6, name: "Issiqko'l", address: "Bishkek, Kyrgyzstan" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOptionClick = (item: any) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    setIsOpen(false);
    onLocationSelect?.(item.name);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onLocationSelect?.(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="w-full relative">
      {/* Input Field */}
      <div
        className="flex flex-col cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm font-medium text-gray-800">Location</p>
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full text-sm outline-none placeholder:text-gray-400 text-gray-600 focus:text-gray-800 cursor-pointer mt-1"
          value={searchValue}
          onChange={onInputChange}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-[calc(100vw-3rem)] md:w-96 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 mt-4 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] max-w-md border border-gray-100 overflow-hidden z-50">
          <ul className="py-2 max-h-[320px] overflow-y-auto">
            {locationSearchContent.map((item) => (
              <li
                key={item.id}
                className={`flex items-center px-6 py-3.5 cursor-pointer 
                  ${selectedItem?.id === item.id 
                    ? "bg-[#febd2d]/10" 
                    : "hover:bg-[#febd2d]/5"}`}
                onClick={() => handleOptionClick(item)}
              >
                <div className="w-8 h-8 rounded-lg bg-[#febd2d]/10 flex items-center justify-center flex-shrink-0">
                  <GrLocation className="text-[#febd2d] text-lg" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.address}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
