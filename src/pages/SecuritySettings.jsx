import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Grid,
  Paper,
  Avatar,
  Drawer,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  Security as SecurityIcon,
  PhoneAndroid as PhoneIcon,
  ChevronRight as ChevronRightIcon,
  AccountCircle as AccountIcon,
  Dashboard as DashboardIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { vi } from '../translations/vi';

const SecuritySettings = () => {
  const navigate = useNavigate();
  const { user, is2FAEnabled, logout } = useAuth();
  const [showInstructions, setShowInstructions] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const drawerWidth = 240;
  const sidebarItems = [
    { icon: <DashboardIcon />, text: vi.dashboard },
    { icon: <SecurityIcon />, text: vi.security, active: true },
    { icon: <AccountIcon />, text: vi.personalInfo },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {user.email.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="subtitle1" noWrap>
            {user.email}
          </Typography>
        </Box>
        <Divider />
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              key={item.text}
              sx={{
                bgcolor: item.active ? 'rgba(66, 133, 244, 0.08)' : 'transparent',
                borderTopRightRadius: '24px',
                borderBottomRightRadius: '24px',
              }}
            >
              <ListItemIcon
                sx={{
                  color: item.active ? 'primary.main' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    color: item.active ? 'primary.main' : 'inherit',
                    fontWeight: item.active ? 500 : 400,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <SecurityIcon color="primary" sx={{ mr: 2 }} />
            <Typography variant="h5" component="h1">
              {vi.securitySettings}
            </Typography>
          </Box>

          <Card sx={{ mb: 4, borderRadius: 2, maxWidth: 'none' }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: 'space-between',
                      gap: { xs: 2, sm: 3 }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                      <Box
                        sx={{
                          mr: 2,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: is2FAEnabled ? 'success.light' : 'action.selected',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <PhoneIcon
                          sx={{
                            color: is2FAEnabled ? 'success.main' : 'action.active',
                            fontSize: '28px'
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            mb: 0.5
                          }}
                        >
                          {vi.twoFactorAuth}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: is2FAEnabled ? 'success.main' : 'text.secondary',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          {is2FAEnabled ? vi.enabled : vi.notEnabled}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant={is2FAEnabled ? 'outlined' : 'contained'}
                      onClick={() => navigate('/2fa-setup')}
                      endIcon={<ChevronRightIcon />}
                      sx={{
                        minWidth: { xs: '100%', sm: 'auto' },
                        py: 1,
                        px: 3
                      }}
                    >
                      {is2FAEnabled ? vi.manage : vi.setUp}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={showInstructions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              endIcon={<InfoIcon />}
              onClick={() => setShowInstructions(!showInstructions)}
              sx={{ textTransform: 'none' }}
            >
              {showInstructions ? vi.hideInstructions : vi.showInstructions}
            </Button>
            <Collapse in={showInstructions}>
              <Paper sx={{ mt: 2, p: 3, bgcolor: 'grey.50' }}>
                {is2FAEnabled ? (
                  <>
                    <Typography variant="h6" gutterBottom>
                      {vi.testSetup}
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={vi.testStep1}
                          secondary={vi.testStep1Detail}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={vi.testStep2}
                          secondary={vi.testStep2Detail}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={vi.testStep3}
                          secondary={vi.testStep3Detail}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="4. Complete sign in"
                          secondary="Enter the code to complete the sign in process"
                        />
                      </ListItem>
                    </List>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom>
                      {vi.howToSetup}
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={vi.setupStep1}
                          secondary={vi.setupStep1Detail}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={vi.setupStep2}
                          secondary={vi.setupStep2Detail}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={vi.setupStep3}
                          secondary={vi.setupStep3Detail}
                        />
                      </ListItem>
                    </List>
                  </>
                )}
              </Paper>
            </Collapse>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={logout} color="inherit">
              {vi.signOut}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SecuritySettings;