import React, { useState } from 'react';

interface USWDSSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: 'small' | 'big';
  className?: string;
  label?: string;
}

const USWDSSearch: React.FC<USWDSSearchProps> = ({
  onSearch,
  placeholder = 'Search',
  size = 'small',
  className = '',
  label = 'Search'
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const searchClasses = ['usa-search'];
  
  if (size === 'small') {
    searchClasses.push('usa-search--small');
  } else if (size === 'big') {
    searchClasses.push('usa-search--big');
  }
  
  if (className) {
    searchClasses.push(className);
  }

  return (
    <form className={searchClasses.join(' ')} role="search" onSubmit={handleSubmit}>
      <label className="usa-sr-only" htmlFor="search-field">
        {label}
      </label>
      <input
        className="usa-input"
        id="search-field"
        type="search"
        name="search"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      <button className="usa-button" type="submit">
        <span className="usa-sr-only">Search</span>
      </button>
    </form>
  );
};

export default USWDSSearch;
