const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Your Render API token
const RENDER_API_TOKEN = 'rnd_BzWfpgsmGbUAUZd4rgZKtoTINN5V';

// Service IDs for the two services
const SERVICE_ID_1 = 'srv-cv8kd0i3esus73dft3lg';
const SERVICE_ID_2 = 'srv-cv8octogph6c73ae6a6g';

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Route for logs
app.get('/logs', async (req, res) => {
    try {
        const logs1 = await getLogs(SERVICE_ID_1);
        const logs2 = await getLogs(SERVICE_ID_2);

        res.json({
            service1: logs1,
            service2: logs2
        });
    } catch (error) {
        console.error('Error fetching logs:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching logs', details: error.response ? error.response.data : error.message });
    }
});

// Helper function to fetch logs from Render API
async function getLogs(serviceId) {
    try {
        const response = await axios.get(`https://api.render.com/v1/services/${serviceId}/logs`, {
            headers: {
                'Authorization': `Bearer ${RENDER_API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching logs for service ${serviceId}:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
