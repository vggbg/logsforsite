const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Създаваме речник за разбираеми имена
const serviceNames = {
    'srv-cv8kd0i3esus73dft3lg': 'vggbgcombot',
    'srv-cv8octogph6c73ae6a6g': 'keepalliverender'
};

// Статични файлове (като index.html)
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket връзка
io.on('connection', (socket) => {
    console.log('Клиент се свърза чрез WebSocket.');

    // Симулирани логове от услуга 1
    setInterval(() => {
        socket.emit('log', { 
            service: serviceNames['srv-cv8kd0i3esus73dft3lg'], 
            message: 'Лог от услуга vggbgcombot: Всичко работи нормално.' 
        });
    }, 5000);

    // Симулирани логове от услуга 2
    setInterval(() => {
        socket.emit('log', { 
            service: serviceNames['srv-cv8octogph6c73ae6a6g'], 
            message: 'Лог от услуга keepalliverender: Проверка на функционалността.' 
        });
    }, 7000);

    socket.on('disconnect', () => {
        console.log('Клиентът прекъсна връзката.');
    });
});

// Стартиране на сървъра
server.listen(PORT, () => {
    console.log(`Сървърът е стартиран на порт ${PORT}`);
});
