import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Owners
export const getOwners = () => axios.get(`${API_BASE_URL}/owners`);
export const addOwner = (ownerData) => axios.post(`${API_BASE_URL}/owner`, ownerData);

// Farms
export const getFarms = () => axios.get(`${API_BASE_URL}/farms`);
export const addFarm = (farmData) => axios.post(`${API_BASE_URL}/farm`, farmData);

// Workers
export const getWorkers = () => axios.get(`${API_BASE_URL}/workers`);
export const addWorker = (workerData) => axios.post(`${API_BASE_URL}/worker`, workerData);

// Vehicles
export const getVehicles = () => axios.get(`${API_BASE_URL}/vehicles`);
export const addVehicle = (vehicleData) => axios.post(`${API_BASE_URL}/vehicle`, vehicleData);

// Inventory
export const getInventory = () => axios.get(`${API_BASE_URL}/inventory`);
export const addInventory = (inventoryData) => axios.post(`${API_BASE_URL}/inventory`, inventoryData);

// Livestock
export const getLivestock = () => axios.get(`${API_BASE_URL}/livestock`);
export const addLivestock = (livestockData) => axios.post(`${API_BASE_URL}/livestock`, livestockData);

// ML Predictions
export const predictFertilizer = (data) => axios.post(`${API_BASE_URL}/predict-fertilizer`, data);
export const predictCropRotation = (data) => axios.post(`${API_BASE_URL}/predict-croprotation`, data); 