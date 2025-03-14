const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Статични файлове
app.use(express.static(path.join(__dirname, 'public')));

// Рут за логовете
app.get('/logs', async (req, res) => {
    console.log('Получено запитване за логовете.');

    // Фиксирани отговори за тестване
    const logs1 = { message: "Логовете за тази услуга не са налични. Проверете Render Dashboard." };
    const logs2 = { message: "Логовете за тази услуга не са налични. Проверете Render Dashboard." };

    console.log(`Логове за услуга srv-cv8kd0i3esus73dft3lg:`, logs1);
    console.log(`Логове за услуга srv-cv8octogph6c73ae6a6g:`, logs2);

    res.json({
        service1: logs1,
        service2: logs2
    });
});

// Рут за фиктивна основна информация на услугите
app.get('/services/:serviceId', (req, res) => {
    const serviceId = req.params.serviceId;
    console.log(`Получено запитване за информация на услуга ${serviceId}.`);

    // Връща фиктивна информация за услугата
    res.json({
        id: serviceId,
        name: `Service ${serviceId}`,
        status: "active",
        details: "Това е фиктивна информация за тестване."
    });
});

// Стартиране на сървъра
app.listen(PORT, () => {
    console.log(`Сървърът е стартиран на порт ${PORT}`);
});
