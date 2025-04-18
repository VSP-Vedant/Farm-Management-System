import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { predictFertilizer } from '../services/apiService';

const soilTypes = ['Sandy', 'Loamy', 'Black', 'Red', 'Clayey'];
const cropTypes = ['Maize', 'Sugarcane', 'Cotton', 'Tobacco', 'Paddy', 'Barley', 'Wheat', 'Millets', 'Oil seeds', 'Pulses', 'Ground Nuts'];

function FertilizerPrediction() {
  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
    moisture: '',
    soil_type: '',
    crop_type: '',
    nitrogen: '',
    potassium: '',
    phosphorous: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await predictFertilizer(formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while making the prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Fertilizer Prediction
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Enter the following details to get fertilizer recommendations for your crops
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Temperature (°C)"
                name="temperature"
                type="number"
                value={formData.temperature}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Humidity (%)"
                name="humidity"
                type="number"
                value={formData.humidity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Moisture (%)"
                name="moisture"
                type="number"
                value={formData.moisture}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Soil Type"
                name="soil_type"
                value={formData.soil_type}
                onChange={handleChange}
                required
              >
                {soilTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Crop Type"
                name="crop_type"
                value={formData.crop_type}
                onChange={handleChange}
                required
              >
                {cropTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nitrogen (N)"
                name="nitrogen"
                type="number"
                value={formData.nitrogen}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Potassium (K)"
                name="potassium"
                type="number"
                value={formData.potassium}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phosphorous (P)"
                name="phosphorous"
                type="number"
                value={formData.phosphorous}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ minWidth: 200 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Get Recommendation'}
            </Button>
          </Box>
        </form>

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {result && (
          <Alert severity="success" sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Recommended Fertilizer:</strong> {result.recommended_fertilizer}
            </Typography>
            <Typography variant="body2">
              <strong>Application Rate:</strong> {result.application_rate}
            </Typography>
            <Typography variant="body2">
              <strong>Frequency:</strong> {result.frequency}
            </Typography>
            {result.notes && (
              <Typography variant="body2">
                <strong>Notes:</strong> {result.notes}
              </Typography>
            )}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}

export default FertilizerPrediction; 