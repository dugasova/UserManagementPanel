import React from 'react';
import './style.scss';

interface FilterByRoleProps {
  onRoleChange: (role: string) => void;
}

export default function FilterByRole({ onRoleChange }: FilterByRoleProps) {
  const roles = ['all', 'admin', 'moderator', 'user'];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onRoleChange(e.target.value);
  };

  return (
    <div className="filter-by-role-container">
      <label htmlFor="role-filter">Filter by Role:</label>
      <select id="role-filter" onChange={handleChange} className="role-filter-select">
        {roles.map(role => (
          <option key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
