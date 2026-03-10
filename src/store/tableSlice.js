import { createSlice } from '@reduxjs/toolkit';
import { generateDummyData } from '../utils/dummyData';

const initialState = {
  originalData: generateDummyData(50), // Generate 50 dummy records
  filteredData: [],
  currentPage: 1,
  itemsPerPage: 10,
  sortConfig: { key: null, direction: 'asc' },
  globalFilter: '',
  loading: false,
  error: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
    setGlobalFilter: (state, action) => {
      state.globalFilter = action.payload;
    },
    addRecord: (state, action) => {
      state.originalData.push(action.payload);
      state.filteredData = applyFilters(state);
    },
    updateRecord: (state, action) => {
      const index = state.originalData.findIndex(record => record.id === action.payload.id);
      if (index !== -1) {
        state.originalData[index] = action.payload;
        state.filteredData = applyFilters(state);
      }
    },
    deleteRecord: (state, action) => {
      state.originalData = state.originalData.filter(record => record.id !== action.payload);
      state.filteredData = applyFilters(state);
    },
  },
});

// Helper function to apply filters
const applyFilters = (state) => {
  let data = [...state.originalData];
  
  // Apply global filter
  if (state.globalFilter) {
    const filterValue = state.globalFilter.toLowerCase();
    data = data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(filterValue)
      )
    );
  }
  
  // Apply sorting
  if (state.sortConfig.key) {
    data.sort((a, b) => {
      if (a[state.sortConfig.key] < b[state.sortConfig.key]) {
        return state.sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[state.sortConfig.key] > b[state.sortConfig.key]) {
        return state.sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  return data;
};

export const {
  setFilteredData,
  setCurrentPage,
  setSortConfig,
  setGlobalFilter,
  addRecord,
  updateRecord,
  deleteRecord,
} = tableSlice.actions;

export default tableSlice.reducer;