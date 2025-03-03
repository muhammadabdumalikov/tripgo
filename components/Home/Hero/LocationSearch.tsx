'use client';
import { useState, useEffect, useRef } from "react";
import { GrLocation } from "react-icons/gr";

interface LocationSearchProps {
  onLocationSelect?: (location: string) => void;
}

const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const locationSearchContent = [
    { id: 1, name: "Nefrit Ko'li", address: "Tashkent, Uzbekistan" },
    { id: 2, name: "Gulkam Sharsharasi", address: "Tashkent, Uzbekistan" },
    { id: 3, name: "Tuzkon ko'li", address: "Jizzax, Uzbekistan" },
    { id: 4, name: "Issiqko'l", address: "Bishkek, Kyrgyzstan" },
    { id: 5, name: "Issiqko'l", address: "Bishkek, Kyrgyzstan" },
    { id: 6, name: "Issiqko'l", address: "Bishkek, Kyrgyzstan" },
  ];

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
    <div ref={dropdownRef} className="w-full">
      {/* Input Field */}
      <div
        className="flex flex-col"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm font-medium">Location</p>
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full text-sm outline-none placeholder:text-gray-600"
          value={searchValue}
          onChange={onInputChange}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-96 mt-8 bg-white rounded-2xl shadow-lg max-w-md">
          <ul className="py-2">
            {locationSearchContent.map((item) => (
              <li
                key={item.id}
                className={`flex items-center px-6 py-3 hover:bg-gray-100 cursor-pointer transition ${
                  selectedItem?.id === item.id ? "bg-gray-50" : ""
                }`}
                onClick={() => handleOptionClick(item)}
              >
                <GrLocation className="text-blue-500 text-lg flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.address}</p>
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
