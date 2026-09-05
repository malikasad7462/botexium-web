'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Country {
  name: string;
  code: string;
}

const countries: Country[] = [
  { name: 'Pakistan', code: 'pk' },
  { name: 'Afghanistan', code: 'af' },
  { name: 'United Arab Emirates', code: 'ae' },
  { name: 'Saudi Arabia', code: 'sa' },
  { name: 'Qatar', code: 'qa' },
  { name: 'Oman', code: 'om' },
  { name: 'Bahrain', code: 'bh' },
  { name: 'Kuwait', code: 'kw' },
  { name: 'United Kingdom', code: 'gb' },
  { name: 'United States', code: 'us' },
  { name: 'Canada', code: 'ca' },
  { name: 'Australia', code: 'au' },
  { name: 'Germany', code: 'de' },
  { name: 'France', code: 'fr' },
  { name: 'Turkey', code: 'tr' },
  { name: 'Malaysia', code: 'my' },
  { name: 'Indonesia', code: 'id' },
  { name: 'India', code: 'in' },
  { name: 'Bangladesh', code: 'bd' },
];

interface CountrySelectProps {
  value: string;
  onChange: (country: string) => void;
  className?: string;
}

export function CountrySelect({ value, onChange, className = '' }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    countries.find(c => c.name === value) || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Close dropdown when pressing Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    onChange(country.name);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white outline-none transition hover:bg-white/[0.06] focus:border-cyan-400/40"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3">
          {selectedCountry && (
            <svg className="w-6 h-6 flex-shrink-0 rounded-sm">
              <use href={`/flags.svg#${selectedCountry.code}`} />
            </svg>
          )}
          <span className="text-sm">
            {selectedCountry ? selectedCountry.name : 'Select Country'}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-cyan-300' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-[#0b1220] p-1 shadow-2xl shadow-black/40">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => handleSelect(country)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition ${
                selectedCountry?.code === country.code
                  ? 'bg-cyan-400/[0.10] text-cyan-300'
                  : 'text-gray-300 hover:bg-white/[0.06] hover:text-white'
              }`}
              role="option"
              aria-selected={selectedCountry?.code === country.code}
            >
              <span className="flex items-center gap-3">
                <svg className="w-6 h-6 flex-shrink-0 rounded-sm">
                  <use href={`/flags.svg#${country.code}`} />
                </svg>
                <span>{country.name}</span>
              </span>
              {selectedCountry?.code === country.code && (
                <Check className="w-4 h-4 text-cyan-300 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}