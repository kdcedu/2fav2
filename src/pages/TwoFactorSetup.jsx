import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { vi } from '../translations/vi';

const steps = [vi.steps.enterPhone, vi.steps.verifyCode, vi.steps.complete];

const TwoFactorSetup = () => {
  const navigate = useNavigate();
  const { user, setup2FA, confirm2FASetup, is2FAEnabled } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!/^\+?[1-9]\d{1,14}(\.\d+)*$/.test(phoneNumber)) {
      setError(vi.invalidPhoneNumber);
      return;
    }

    const code = setup2FA(phoneNumber);
    setGeneratedCode(code);
    setShowCodeDialog(true);
    setActiveStep(1);
  };

  const handleVerification = (e) => {
    e.preventDefault();
    setError('');

    if (confirm2FASetup(verificationCode)) {
      setActiveStep(2);
    } else {
      setError(vi.invalidVerificationCode);
    }
  };

  const handleComplete = () => {
    navigate('/security');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handlePhoneSubmit}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {vi.enterPhoneInstruction}
            </Typography>
            <TextField
              fullWidth
              label={vi.phoneNumber}
              variant="outlined"
              placeholder="+1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              {vi.next}
            </Button>
          </form>
        );

      case 1:
        return (
          <form onSubmit={handleVerification}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {vi.enterVerificationCode}
            </Typography>
            <TextField
              fullWidth
              label={vi.verificationCode}
              variant="outlined"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              {vi.verify}
            </Button>
          </form>
        );

      case 2:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
              {vi.twoFactorEnabled}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {vi.twoFactorEnabledDetail}
            </Typography>
            <Button variant="contained" onClick={handleComplete} fullWidth>
              {vi.done}
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" component="h1">
              {vi.setupTwoFactor}
            </Typography>
            <Button
              startIcon={showInstructions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              endIcon={<InfoIcon />}
              onClick={() => setShowInstructions(!showInstructions)}
              sx={{ textTransform: 'none' }}
            >
              {showInstructions ? vi.hideInstructions : vi.showInstructions}
            </Button>
          </Box>

          <Collapse in={showInstructions}>
            <Box sx={{ mb: 4, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              {!is2FAEnabled ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    {vi.howToSetup}
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {vi.setupStep1}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, ml: 3 }}>
                      {vi.setupStep1Detail}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                      {vi.setupStep2}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, ml: 3 }}>
                      {vi.setupStep2Detail}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                      {vi.setupStep3}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, ml: 3 }}>
                      {vi.setupStep3Detail}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="h6" gutterBottom>
                    {vi.testSetup}
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {vi.testStep1}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, ml: 3 }}>
                      {vi.testStep1Detail}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                      {vi.testStep2}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, ml: 3 }}>
                      {vi.testStep2Detail}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                      {vi.testStep3}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, ml: 3 }}>
                      {vi.testStep3Detail}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                      {vi.testStep4}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, ml: 3 }}>
                      {vi.testStep4Detail}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 4, fontStyle: 'italic' }}>
                      {vi.verificationSuccessDetail}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </Collapse>

          <Stepper activeStep={activeStep} sx={{ my: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {renderStepContent(activeStep)}
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

export default TwoFactorSetup;