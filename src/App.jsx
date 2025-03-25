import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';

// Pages
import Login from './pages/Login';
import SecuritySettings from './pages/SecuritySettings';
import TwoFactorSetup from './pages/TwoFactorSetup';

// Context
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/security" element={<SecuritySettings />} />
            <Route path="/2fa-setup" element={<TwoFactorSetup />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Container>
      </Box>
    </AuthProvider>
  );
};

export default App;