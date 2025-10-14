import React, { useState, useEffect, useRef } from 'react';

// Hook para búsqueda con debounce
export function useSearch(data, searchFields, debounceMs = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      const filtered = data.filter(item => {
        return searchFields.some(field => {
          const value = getNestedValue(item, field);
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
      
      setFilteredData(filtered);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, data, searchFields, debounceMs]);

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    isSearching
  };
}

// Componente de búsqueda con autocompletado
export default function SearchBox({
  placeholder = 'Buscar...',
  onSearch,
  suggestions = [],
  showSuggestions = false,
  value = '',
  onChange,
  onSelect,
  disabled = false,
  icon = '🔍',
  clearable = true,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionRefs = useRef([]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(showSuggestions && newValue.length > 0);
    
    if (onSearch) {
      onSearch(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (suggestion) => {
    onChange(typeof suggestion === 'string' ? suggestion : suggestion.label || suggestion.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    
    if (onSelect) {
      onSelect(suggestion);
    }
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`search-box ${className}`} ref={inputRef}>
      <div className="search-input-wrapper">
        <span className="search-icon">{icon}</span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(showSuggestions && value.length > 0)}
          disabled={disabled}
        />
        {clearable && value && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClear}
            tabIndex={-1}
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              ref={el => suggestionRefs.current[index] = el}
              className={`suggestion-item ${
                index === highlightedIndex ? 'highlighted' : ''
              }`}
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {typeof suggestion === 'string' ? (
                <span className="suggestion-text">{suggestion}</span>
              ) : (
                <div className="suggestion-content">
                  {suggestion.icon && (
                    <span className="suggestion-icon">{suggestion.icon}</span>
                  )}
                  <div className="suggestion-details">
                    <span className="suggestion-label">{suggestion.label}</span>
                    {suggestion.description && (
                      <span className="suggestion-description">{suggestion.description}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Componente de filtros avanzados
export function AdvancedFilters({
  filters,
  values,
  onChange,
  onReset,
  className = ''
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (filterName, value) => {
    onChange({ ...values, [filterName]: value });
  };

  const handleReset = () => {
    const resetValues = {};
    filters.forEach(filter => {
      resetValues[filter.name] = filter.type === 'checkbox' ? false : '';
    });
    onChange(resetValues);
    onReset && onReset();
  };

  const activeFiltersCount = Object.values(values).filter(value => 
    value !== '' && value !== false && value !== null && value !== undefined
  ).length;

  return (
    <div className={`advanced-filters ${className}`}>
      <div className="filters-header">
        <button
          type="button"
          className="filters-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="toggle-icon">{isExpanded ? '🔽' : '▶️'}</span>
          <span className="toggle-text">Filtros avanzados</span>
          {activeFiltersCount > 0 && (
            <span className="active-count">({activeFiltersCount})</span>
          )}
        </button>
        
        {activeFiltersCount > 0 && (
          <button
            type="button" 
            className="btn btn-outline btn-sm"
            onClick={handleReset}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="filters-content">
          <div className="filters-grid">
            {filters.map(filter => (
              <div key={filter.name} className="filter-item">
                <label className="filter-label">{filter.label}</label>
                
                {filter.type === 'select' ? (
                  <select
                    value={values[filter.name] || ''}
                    onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Todos</option>
                    {filter.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : filter.type === 'checkbox' ? (
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={values[filter.name] || false}
                      onChange={(e) => handleFilterChange(filter.name, e.target.checked)}
                    />
                    <span>{filter.checkboxLabel || 'Activar'}</span>
                  </label>
                ) : (
                  <input
                    type={filter.type || 'text'}
                    value={values[filter.name] || ''}
                    onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                    placeholder={filter.placeholder}
                    className="filter-input"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}