import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortConfig, setFilteredData } from '../../store/tableSlice';
import { exportToExcel } from '../../utils/exportUtils';
import GlobalFilter from '../Filter/GlobalFilter';
import Pagination from './Pagination';
import { tableColumns } from '../../utils/dummyData';

const DataTable = () => {
  const dispatch = useDispatch();
  const { 
    originalData, 
    filteredData, 
    currentPage, 
    itemsPerPage, 
    sortConfig,
    globalFilter 
  } = useSelector(state => state.table);

  useEffect(() => {
    let data = [...originalData];
    
    if (globalFilter) {
      data = data.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
    }
    
    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    dispatch(setFilteredData(data));
  }, [originalData, globalFilter, sortConfig, dispatch]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    dispatch(setSortConfig({ key, direction }));
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handleExport = () => {
    const dataToExport = globalFilter ? filteredData : originalData;
    exportToExcel(dataToExport, 'filtered-data.xlsx');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <GlobalFilter />
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableColumns.map(column => (
                    <th
                      key={column.key}
                      onClick={() => handleSort(column.key)}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        {column.label}
                        <span className="text-gray-400">
                          {sortConfig.key === column.key ? (
                            sortConfig.direction === 'asc' ? '↑' : '↓'
                          ) : '↕'}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentPageData().map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {tableColumns.map(column => (
                      <td key={`${item.id}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination totalItems={filteredData.length} />
    </div>
  );
};

export default DataTable;