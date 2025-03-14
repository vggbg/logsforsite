const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// API токен за Render
const RENDER_API_TOKEN = 'rnd_BzWfpgsmGbUAUZd4rgZKtoTINN5V';

// Идентификатори на услуги
const SERVICE_ID_1 = 'srv-cv8kd0i3esus73dft3lg';
const SERVICE_ID_2 = 'srv-cv8octogph6c73ae6a6g';

// Сервиране на статични файлове (напр. index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Рут за логовете
app.get('/logs', async (req, res) => {
    try {
        console.log('Запитване за логовете получено.');

        const logs1 = await getLogs(SERVICE_ID_1);
        console.log(`Логове за услуга ${SERVICE_ID_1} извлечени успешно.`);

        const logs2 = await getLogs(SERVICE_ID_2);
        console.log(`Логове за услуга ${SERVICE_ID_2} извлечени успешно.`);

        res.json({
            service1: logs1,
            service2: logs2
        });
    } catch (error) {
        console.error('Грешка при извличане на логовете:', error.response ? error.response.data : error.message);
        res.status(500).json({
            message: 'Грешка при извличане на логовете',
            details: error.response ? error.response.data : error.message
        });
    }
});

// Хелпър функция за извличане на логовете от Render API
async function getLogs(serviceId) {
    try {
        console.log(`Извличане на логове за услуга ${serviceId}...`);
        const response = await axios.get(`https://api.render.com/v1/services/${serviceId}/logs`, {
            headers: {
                'Authorization': `Bearer ${RENDER_API_TOKEN}`
            }
        });
        console.log(`Успешно извлечени логове за услуга ${serviceId}.`);
        return response.data;
    } catch (error) {
        console.error(`
