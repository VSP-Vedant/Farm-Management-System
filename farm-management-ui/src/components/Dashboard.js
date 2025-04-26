import React, { useState, useEffect } from 'react';
import { 
  getOwners, 
  getFarms, 
  getWorkers, 
  getVehicles, 
  getInventory, 
  getLivestock,
  addOwner,
  addFarm,
  addInventory
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
          // Convert area to number if it's a string
          const farmData = {
            ...formData,
            area: Number(formData.area)
          };
          response = await addFarm(farmData);
          break;
        case 'inventory':
          // Convert numeric fields to numbers
          const inventoryData = {
            ...formData,
            quantity: Number(formData.quantity),
            cost_per_unit: Number(formData.cost_per_unit)
          };
          response = await addInventory(inventoryData);
          break;
      }
      if (response) {
        fetchData(); // Refresh data
        handleCloseDialog();
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Error submitting form: ' + err.message);
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
      case 'farm':
        return (
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Farm</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Farm Name"
                    name="farm_name"
                    value={formData.farm_name || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Area"
                    name="area"
                    type="number"
                    value={formData.area || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Soil Type"
                    name="soil_type"
                    value={formData.soil_type || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Irrigation Type"
                    name="irrigation_type"
                    value={formData.irrigation_type || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Add Farm
              </Button>
            </DialogActions>
          </Dialog>
        );
      case 'inventory':
        return (
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Item Name"
                    name="item_name"
                    value={formData.item_name || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Unit"
                    name="unit"
                    value={formData.unit || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cost per Unit"
                    name="cost_per_unit"
                    type="number"
                    value={formData.cost_per_unit || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Supplier Name"
                    name="supplier_name"
                    value={formData.supplier_name || ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Purchase Date"
                    name="purchase_date"
                    type="date"
                    value={formData.purchase_date || ''}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Add Inventory
              </Button>
            </DialogActions>
          </Dialog>
        );
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
      
      {/* Owners Section */}
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

      {/* Farms Section */}
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Farms</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('farm')}
          >
            Add Farm
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Farm Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>Soil Type</TableCell>
                <TableCell>Irrigation Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.farms.map((farm) => (
                <TableRow key={farm.farm_id}>
                  <TableCell>{farm.farm_name}</TableCell>
                  <TableCell>{farm.location}</TableCell>
                  <TableCell>{farm.area}</TableCell>
                  <TableCell>{farm.soil_type}</TableCell>
                  <TableCell>{farm.irrigation_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Inventory Section */}
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Inventory</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('inventory')}
          >
            Add Inventory
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Cost per Unit</TableCell>
                <TableCell>Supplier Name</TableCell>
                <TableCell>Purchase Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.inventory.map((item) => (
                <TableRow key={item.inventory_id}>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.cost_per_unit}</TableCell>
                  <TableCell>{item.supplier_name}</TableCell>
                  <TableCell>{item.purchase_date}</TableCell>
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