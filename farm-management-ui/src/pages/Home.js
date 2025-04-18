import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import CropIcon from '@mui/icons-material/Crop';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to Farm Management System
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
        Smart solutions for modern farming
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <ScienceIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography gutterBottom variant="h5" component="h2">
                Fertilizer Prediction
              </Typography>
              <Typography>
                Get precise fertilizer recommendations based on soil conditions, crop type, and environmental factors.
                Our AI-powered system helps you optimize your fertilizer usage for better yields.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large" component={RouterLink} to="/fertilizer" color="primary">
                Try Fertilizer Prediction
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <CropIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography gutterBottom variant="h5" component="h2">
                Crop Rotation
              </Typography>
              <Typography>
                Plan your crop rotation strategy with our intelligent system. Get recommendations for the best
                crop sequences based on soil health, climate conditions, and market demand.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large" component={RouterLink} to="/crop-rotation" color="primary">
                Try Crop Rotation
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home; 