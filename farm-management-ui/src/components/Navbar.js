import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScienceIcon from '@mui/icons-material/Science';
import RotateRightIcon from '@mui/icons-material/RotateRight';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <AgricultureIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Farm Management System
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/fertilizer"
            startIcon={<ScienceIcon />}
          >
            Fertilizer Prediction
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/crop-rotation"
            startIcon={<RotateRightIcon />}
          >
            Crop Rotation
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 