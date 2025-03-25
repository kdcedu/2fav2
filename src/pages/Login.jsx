import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { vi } from '../translations/vi';

const Login = () => {
  const { login, verify2FACode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login({ email, password });
      if (result.requiresTwoFactor) {
        setShowVerification(true);
        setGeneratedCode(result.code);
        setShowCodeDialog(true);
      }
    } catch (err) {
      setError(vi.invalidCredentials);
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const handleVerification = (e) => {
    e.preventDefault();
    setError('');

    if (verify2FACode(verificationCode)) {
      setShowVerification(false);
      setVerificationCode('');
      setShowSuccess(true);
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      setError(vi.invalidVerificationCode);
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Card sx={{ maxWidth: 400, mx: 'auto' }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              {showVerification ? vi.twoStepVerification : vi.signIn}
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {showSuccess && (
            <Alert severity="success" sx={{ mb: 2, p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {vi.verificationSuccess}
              </Typography>
              <Typography variant="body2">
                {vi.verificationSuccessMessage}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {vi.verificationSuccessDetail}
              </Typography>
            </Alert>
          )}

          {!showVerification ? (
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label={vi.email}
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label={vi.password}
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {vi.signIn}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerification}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {vi.verificationCodeSent}
              </Typography>
              <TextField
                fullWidth
                label={vi.verificationCode}
                variant="outlined"
                margin="normal"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {vi.verify}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={showCodeDialog}
        onClose={() => setShowCodeDialog(false)}
      >
        <DialogTitle>{vi.verificationCode}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {vi.simulationCode}
            <Typography variant="h4" sx={{ mt: 2, textAlign: 'center' }}>
              {generatedCode}
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Login;