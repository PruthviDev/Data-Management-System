import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalFilter, setFilteredData, setCurrentPage } from '../../store/tableSlice';

const GlobalFilter = () => {
  const dispatch = useDispatch();
  const { originalData, globalFilter } = useSelector(state => state.table);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    dispatch(setGlobalFilter(value));
    
    const filtered = originalData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    dispatch(setFilteredData(filtered));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="w-full md:w-64">
      <input
        type="text"
        value={globalFilter}
        onChange={handleFilterChange}
        placeholder="Search all columns..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default GlobalFilter;