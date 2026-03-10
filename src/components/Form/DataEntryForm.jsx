import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addRecord } from '../../store/tableSlice';
import { tableColumns } from '../../utils/dummyData';

const DataEntryForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    const newRecord = {
      id: Date.now(),
      ...data,
      salary: parseFloat(data.salary)
    };
    dispatch(addRecord(newRecord));
    reset();
    alert('Record added successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Record</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tableColumns.map(column => (
            <div key={column.key} className="space-y-1">
              <label htmlFor={column.key} className="block text-sm font-medium text-gray-700">
                {column.label} <span className="text-red-500">*</span>
              </label>
              
              {column.type === 'select' ? (
                <select
                  id={column.key}
                  {...register(column.key, { 
                    required: `${column.label} is required` 
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors[column.key] 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Select {column.label}</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              ) : (
                <input
                  type={column.type}
                  id={column.key}
                  {...register(column.key, { 
                    required: `${column.label} is required`,
                    ...(column.type === 'email' && {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    }),
                    ...(column.type === 'number' && {
                      min: {
                        value: 0,
                        message: "Value must be positive"
                      }
                    })
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors[column.key] 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300'
                  }`}
                />
              )}
              
              {errors[column.key] && (
                <p className="text-sm text-red-600 mt-1">{errors[column.key].message}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Add Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataEntryForm;