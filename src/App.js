import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageContainer from './components/PageContainer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageContainer>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/balance' />
          </Routes>
        </PageContainer>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}
