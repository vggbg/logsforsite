const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Your Render API token
const RENDER_API_TOKEN = 'rnd_BzWfpgsmGbUAUZd4rgZKtoTINN5V';

// Service IDs for the two services
const SERVICE_ID_1 = 'srv-cv8kd0i3esus73dft3lg';
const SERVICE_ID_2 = 'srv-cv8octogph6c73ae6a6g';

app.get('/logs', async (req, res) => {
    try {
        const logs1 = await getLogs(SERVICE_ID_1);
        const logs2 = await getLogs(SERVICE_ID_2);

        res.send(`
            <html>
            <head>
                <title>Service Logs</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    pre { background-color: #f4f4f4; padding: 10px; border: 1px solid #ddd; }
                </style>
            </head>
            <body>
                <h1>Logs for Service 1</h1>
                <pre>${logs1}</pre>
                <h1>Logs for Service 2</h1>
                <pre>${logs2}</pre>
            </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send('Error fetching logs');
    }
});

async function getLogs(serviceId) {
    const response = await axios.get(`https://api.render.com/v1/services/${serviceId}/logs`, {
        headers: {
            'Authorization': `Bearer ${RENDER_API_TOKEN}`
        }
    });
    return response.data;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
