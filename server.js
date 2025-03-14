const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// API токен за Render
const RENDER_API_TOKEN = 'rnd_BzWfpgsmGbUAUZd4rgZKtoTINN5V';

// Услуги
const SERVICE_ID_1 = 'srv-cv8kd0i3esus73dft3lg';
const SERVICE_ID_2 = 'srv-cv8octogph6c73ae6a6g';

// Сервиране на статични файлове
app.use(express.static(path.join(__dirname, 'public')));

// Рут за логовете
app.get('/logs', async (req, res) => {
    try {
        console.log('Получено запитване за логовете.');

        // Опитайте да извлечете логовете за услугите
        const logs1 = await getLogs(SERVICE_ID_1);
        console.log(`Логове за услуга ${SERVICE_ID_1}:`, logs1);

        const logs2 = await getLogs(SERVICE_ID_2);
        console.log(`Логове за услуга ${SERVICE_ID_2}:`, logs2);

        res.json({
            service1: logs1,
            service2: logs2
        });
    } catch (error) {
        console.error('Грешка при извличане на логовете:', error.response ? error.response.data : error.message);
        res.status(500).json({
            message: 'Неуспешно извличане на логовете',
            details: error.response ? error.response.data : error.message
        });
    }
});

// Хелпър функция за извличане на логовете
async function getLogs(serviceId) {
    try {
        console.log(`Опит за извличане на логове за услуга ${serviceId}...`);
        const response = await axios.get(`https://api.render.com/v1/services/${serviceId}/logs`, {
            headers: { 'Authorization': `Bearer ${RENDER_API_TOKEN}` }
        });
        console.log(`Успешно извлечени логове за услуга ${serviceId}.`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Логовете за услуга ${serviceId} не са налични.`);
            return { message: "Логовете за тази услуга не са налични. Проверете конфигурацията или ограниченията на Render." };
        }
        if (error.response && error.response.status === 401) {
            console.error(`Грешка: Нямате достъп до логовете за услуга ${serviceId}.`);
            return { message: "Нямате права за достъп до логовете за тази услуга." };
        }
        console.error(`Непозната грешка за услуга ${serviceId}:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

// Стартиране на сървъра
app.listen(PORT, () => {
    console.log(`Сървърът е стартиран на порт ${PORT}`);
});
