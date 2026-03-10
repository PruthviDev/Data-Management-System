import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { store } from './store/store';
import DataTable from './components/Table/DataTable';
import DataEntryForm from './components/Form/DataEntryForm';
import Home from './components/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Data Management System</h1>
                  <p className="mt-2 text-blue-100">Manage your records with ease</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Bar */}
            <nav className="bg-blue-900 bg-opacity-50 mt-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-8">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-3 py-4 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-white border-b-2 border-white'
                          : 'text-blue-100 hover:text-white'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/add-record"
                    className={({ isActive }) =>
                      `px-3 py-4 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-white border-b-2 border-white'
                          : 'text-blue-100 hover:text-white'
                      }`
                    }
                  >
                    Add New Record
                  </NavLink>
                  <NavLink
                    to="/view-records"
                    className={({ isActive }) =>
                      `px-3 py-4 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-white border-b-2 border-white'
                          : 'text-blue-100 hover:text-white'
                      }`
                    }
                  >
                    View Records
                  </NavLink>
                </div>
              </div>
            </nav>
          </header>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-record" element={<DataEntryForm />} />
              <Route path="/view-records" element={<DataTable />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;