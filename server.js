const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// API токен и ID на услуги
const RENDER_API_TOKEN = 'rnd_BzWfpgsmGbUAUZd4rgZKtoTINN5V';
const SERVICE_ID_1 = 'srv-cv8kd0i3esus73dft3lg';
const SERVICE_ID_2 = 'srv-cv8octogph6c73ae6a6g';

// Статични файлове
app.use(express.static(path.join(__dirname, 'public')));

app.get('/logs', async (req, res) => {
    try {
        const logs1 = await getLogs(SERVICE_ID_1);
        const logs2 = await getLogs(SERVICE_ID_2);
        res.json({ service1: logs1, service2: logs2 });
    } catch (error) {
        console.error('Грешка при извличане на логовете:', error);
        res.status(500).json({ error: 'Неуспешно извличане на логовете' });
    }
});

async function getLogs(serviceId) {
    try {
        const response = await axios.get(`https://api.render.com/v1/services/${serviceId}/logs`, {
            headers: { 'Authorization': `Bearer ${RENDER_API_TOKEN}` }
        });
        return response.data;
    } catch (error) {
        console.error(`Грешка за услуга ${serviceId}:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

app.listen(PORT, () => {
    console.log(`Сървърът стартира на порт ${PORT}`);
});
