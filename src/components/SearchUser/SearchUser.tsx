import React, { useState } from 'react';
import './style.scss';

interface SearchUserProps {
  onSearchChange: (term: string) => void;
}

export default function SearchUser({ onSearchChange }: SearchUserProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={handleChange}
      className="user-search-input"
    />
  );
}
