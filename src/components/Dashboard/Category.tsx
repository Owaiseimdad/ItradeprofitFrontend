// src/components/CategoryDropdown.tsx

import React from 'react'

interface CategoryDropdownProps {
  selectedOption: string
  onChange: (value: string) => void
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedOption,
  onChange,
}) => {
  return (
    <div className="category-dropdown">
      <label htmlFor="category-dropdown" className="dropdown-label">
        Category:
      </label>
      <select
        id="category-dropdown"
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
        className="dashboard-dropdown"
        aria-label="Category"
      >
        <option value="Overall">Overall</option>
        <option value="Equity">Equity</option>
        <option value="Futures & Options">Futures & Options</option>
      </select>
    </div>
  )
}

export default CategoryDropdown
