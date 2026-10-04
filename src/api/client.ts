import axios from 'axios';

// Ensure this matches the port your .NET API runs on (usually 5000/5001 or dynamic from launchSettings.json)
const apiClient = axios.create({
  baseURL: 'http://localhost:5009/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
