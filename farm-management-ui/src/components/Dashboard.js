import React, { useState, useEffect } from 'react';
import { 
  getOwners, 
  getFarms, 
  getWorkers, 
  getVehicles, 
  getInventory, 
  getLivestock,
  addOwner,
  addFarm
} from '../services/apiService';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const [data, setData] = useState({
    owners: [],
    farms: [],
    workers: [],
    vehicles: [],
    inventory: [],
    livestock: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [formData, setFormData] = useState({});

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setFormData({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
    setFormData({});
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      let response;
      switch (dialogType) {
        case 'owner':
          response = await addOwner(formData);
          break;
        case 'farm':
          response = await addFarm(formData);
          break;
        // Add other cases for different types
      }
      if (response) {
        fetchData(); // Refresh data
        handleCloseDialog();
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const fetchData = async () => {
    try {
      const [
        ownersRes,
        farmsRes,
        workersRes,
        vehiclesRes,
        inventoryRes,
        livestockRes
      ] = await Promise.all([
        getOwners(),
        getFarms(),
        getWorkers(),
        getVehicles(),
        getInventory(),
        getLivestock()
      ]);

      setData({
        owners: ownersRes.data,
        farms: farmsRes.data,
        workers: workersRes.data,
        vehicles: vehiclesRes.data,
        inventory: inventoryRes.data,
        livestock: livestockRes.data
      });
      setLoading(false);
    } catch (err) {
      setError('Error fetching data: ' + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderDialog = () => {
    switch (dialogType) {
      case 'owner':
        return (
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Owner</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contact_number"
                    value={formData.contact_number || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={2}
                    value={formData.address || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Add Owner
              </Button>
            </DialogActions>
          </Dialog>
        );
      // Add other cases for different forms
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Farm Management Dashboard</Typography>
      
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Owners</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('owner')}
          >
            Add Owner
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.owners.map((owner) => (
                <TableRow key={owner.owner_id}>
                  <TableCell>{owner.full_name}</TableCell>
                  <TableCell>{owner.email}</TableCell>
                  <TableCell>{owner.contact_number}</TableCell>
                  <TableCell>{owner.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>Farms</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>Soil Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.farms.map((farm) => (
                <TableRow key={farm.farm_id}>
                  <TableCell>{farm.farm_name}</TableCell>
                  <TableCell>{farm.location}</TableCell>
                  <TableCell>{farm.area}</TableCell>
                  <TableCell>{farm.soil_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>Inventory</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.inventory.map((item) => (
                <TableRow key={item.inventory_id}>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity} {item.unit}</TableCell>
                  <TableCell>₹{item.cost_per_unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {renderDialog()}
    </Box>
  );
};

export default Dashboard; 