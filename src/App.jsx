import { Routes, Route, Navigate } from 'react-router-dom';

import RTLLayout from 'layouts/rtl';
import AdminLayout from 'layouts/admin';
import AuthLayout from 'layouts/auth';
import OthersError from 'views/admin/main/others/404';
import 'assets/css/Plugins.css';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthStore } from './stores/useAuthStore.js';
import axios from 'lib/axios';

const PendingSellerPage = () => {
  const { logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear axios headers
    delete axios.defaults.headers.common['Authorization'];
    
    // Force redirect after a small delay
    setTimeout(() => {
      window.location.href = '/auth/sign-in/centered';
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-yellow-100 mb-6">
            <svg className="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Account Under Review
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your seller account is currently being reviewed by our team.
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              Our team is reviewing your documents and information. You will be notified once your account is approved.
            </p>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                isLoggingOut 
                  ? 'bg-red-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // Create a new context
  const [themeApp, setThemeApp] = useState({
    '--background-100': '#FFFFFF',
    '--background-900': '#070f2e',
    '--shadow-100': 'rgba(112, 144, 176, 0.08)',
    '--color-50': '#E9E3FF',
    '--color-100': '#C0B8FE',
    '--color-200': '#A195FD',
    '--color-300': '#8171FC',
    '--color-400': '#7551FF',
    '--color-500': '#422AFB',
    '--color-600': '#3311DB',
    '--color-700': '#2111A5',
    '--color-800': '#190793',
    '--color-900': '#11047A',
  });
  const [mini, setMini] = useState(false);

  // When the theme state changes, this effect will update the CSS variables in the document's root element
  useEffect(() => {
    let color;
    for (color in themeApp) {
      document.documentElement.style.setProperty(color, themeApp[color]);
    }
    //eslint-disable-next-line
  }, [themeApp]);

  // const { user } = useAuthStore();

    const { user, initialize, isInitialized } = useAuthStore();

    useEffect(() => {
        initialize();
    }, [initialize]);

    if (!isInitialized) return null; // Wait until rehydration finishes

  const renderUserLayout = () => {
    if (!user) {
      return <Navigate to="/auth/sign-in/centered" replace />;
    }

    if (user.role === 'admin') {
      return (
        <AdminLayout
          setMini={setMini}
          mini={mini}
          theme={themeApp}
          setTheme={setThemeApp}
        />
      );
    }

    if (user.role === 'seller') {
      if (user.verificationStatus === 'pending') {
        return <PendingSellerPage />;
      } else if (user.verificationStatus === 'approved') {
        return (
          <AdminLayout
            setMini={setMini}
            mini={mini}
            theme={themeApp}
            setTheme={setThemeApp}
          />
        );
      }
    }

    return <Navigate to="/auth/sign-in/centered" replace />;
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route
        path="admin/*"
        element={renderUserLayout()}
      />
      <Route
        path="rtl/*"
        element={
          <RTLLayout
            setMini={setMini}
            mini={mini}
            theme={themeApp}
            setTheme={setThemeApp}
          />
        }
      />
      <Route path="/" element={<Navigate to="/admin/dashboards/welkome" replace />} />
      <Route path="*" element={<OthersError />} />
    </Routes>
    </>
  );
};

export default App;
