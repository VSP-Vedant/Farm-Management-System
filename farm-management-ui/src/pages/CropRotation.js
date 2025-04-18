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
import { predictCropRotation } from '../services/apiService';

const regions = ['North', 'South', 'East', 'West'];
const seasons = ['Kharif', 'Rabi', 'Summer'];
const soilTypes = ['Sandy', 'Loamy', 'Black', 'Red', 'Clayey'];
const rotationSequences = ['1', '2', '3', '4', '5'];

function CropRotation() {
  const [formData, setFormData] = useState({
    region: '',
    season: '',
    soil_type: '',
    soil_ph: '',
    soil_nitrogen: '',
    soil_phosphorus: '',
    soil_potassium: '',
    soil_organic_matter: '',
    soil_moisture: '',
    avg_rainfall: '',
    solar_radiation: '',
    rotation_sequence: '',
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
      const response = await predictCropRotation(formData);
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
        Crop Rotation Prediction
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Enter the following details to get crop rotation recommendations
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
              >
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Season"
                name="season"
                value={formData.season}
                onChange={handleChange}
                required
              >
                {seasons.map((season) => (
                  <MenuItem key={season} value={season}>
                    {season}
                  </MenuItem>
                ))}
              </TextField>
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
                label="Soil pH"
                name="soil_ph"
                type="number"
                value={formData.soil_ph}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soil Nitrogen"
                name="soil_nitrogen"
                type="number"
                value={formData.soil_nitrogen}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soil Phosphorus"
                name="soil_phosphorus"
                type="number"
                value={formData.soil_phosphorus}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soil Potassium"
                name="soil_potassium"
                type="number"
                value={formData.soil_potassium}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soil Organic Matter (%)"
                name="soil_organic_matter"
                type="number"
                value={formData.soil_organic_matter}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soil Moisture (%)"
                name="soil_moisture"
                type="number"
                value={formData.soil_moisture}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Average Rainfall (mm)"
                name="avg_rainfall"
                type="number"
                value={formData.avg_rainfall}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Solar Radiation (BTU/sqft)"
                name="solar_radiation"
                type="number"
                value={formData.solar_radiation}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Rotation Sequence"
                name="rotation_sequence"
                value={formData.rotation_sequence}
                onChange={handleChange}
                required
              >
                {rotationSequences.map((seq) => (
                  <MenuItem key={seq} value={seq}>
                    {seq}
                  </MenuItem>
                ))}
              </TextField>
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
              <strong>Recommended Crop Sequence:</strong>
            </Typography>
            {result.recommended_sequence.map((item, index) => (
              <Typography key={index} variant="body2">
                {item.season}: <strong>{item.crop}</strong>
              </Typography>
            ))}
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Soil Benefits:</strong> {result.soil_benefits}
            </Typography>
            <Typography variant="body2">
              <strong>Expected Yield Increase:</strong> {result.expected_yield_increase}
            </Typography>
          </Alert>
        )}
      </Paper>
    </Container>
  );
}

export default CropRotation; 