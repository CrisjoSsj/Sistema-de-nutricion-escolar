import React, { useState, useMemo } from 'react';

// Hook para paginación
export function usePagination(data, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);
  const totalItems = data.length;

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  const firstPage = () => goToPage(1);
  const lastPage = () => goToPage(totalPages);

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    paginatedData,
    setPageSize,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}

// Componente de tabla mejorada
export default function DataTable({
  data = [],
  columns = [],
  loading = false,
  emptyMessage = 'No hay datos para mostrar',
  sortable = true,
  selectable = false,
  onRowSelect,
  onRowClick,
  pageSize = 10,
  showPagination = true,
  className = ''
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Ordenamiento
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Paginación
  const {
    currentPage,
    totalPages,
    totalItems,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    setPageSize
  } = usePagination(sortedData, pageSize);

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const handleSort = (key) => {
    if (!sortable) return;

    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRowSelect = (rowId, isSelected) => {
    const newSelected = new Set(selectedRows);
    if (isSelected) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);
    onRowSelect && onRowSelect(Array.from(newSelected));
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const allIds = paginatedData.map(row => row.id);
      setSelectedRows(new Set(allIds));
      onRowSelect && onRowSelect(allIds);
    } else {
      setSelectedRows(new Set());
      onRowSelect && onRowSelect([]);
    }
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="data-table-loading">
        <div className="table-skeleton">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="skeleton-row">
              {columns.map((col, j) => (
                <div key={j} className="skeleton-cell"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="data-table-empty">
        <div className="empty-icon">📋</div>
        <p className="empty-message">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`data-table ${className}`}>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {selectable && (
                <th className="select-column">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`${column.sortable !== false && sortable ? 'sortable' : ''} ${column.className || ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  <div className="th-content">
                    <span>{column.title}</span>
                    {column.sortable !== false && sortable && (
                      <span className="sort-icon">{getSortIcon(column.key)}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={row.id || index}
                className={`${selectedRows.has(row.id) ? 'selected' : ''} ${onRowClick ? 'clickable' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {selectable && (
                  <td className="select-column">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleRowSelect(row.id, e.target.checked);
                      }}
                    />
                  </td>
                )}
                {columns.map(column => (
                  <td key={column.key} className={column.className || ''}>
                    {column.render 
                      ? column.render(getNestedValue(row, column.key), row)
                      : getNestedValue(row, column.key)
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPagination && totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={goToPage}
          onPageSizeChange={setPageSize}
          onNext={nextPage}
          onPrev={prevPage}
          hasNext={hasNextPage}
          hasPrev={hasPrevPage}
        />
      )}
    </div>
  );
}

// Componente de paginación
export function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}) {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Número de páginas a mostrar
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);

    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="table-pagination">
      <div className="pagination-info">
        <span>
          Mostrando {startItem} - {endItem} de {totalItems} elementos
        </span>
        
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="page-size-select"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={25}>25 por página</option>
          <option value={50}>50 por página</option>
        </select>
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={onPrev}
          disabled={!hasPrev}
        >
          ← Anterior
        </button>

        {getPageNumbers().map(page => (
          <button
            key={page}
            className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={onNext}
          disabled={!hasNext}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}