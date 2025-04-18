import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <AgricultureIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Farm Management System
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/fertilizer">
            Fertilizer Prediction
          </Button>
          <Button color="inherit" component={RouterLink} to="/crop-rotation">
            Crop Rotation
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 