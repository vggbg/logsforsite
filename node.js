const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Обработване на WebSocket връзки
io.on('connection', (socket) => {
    console.log('Клиент се свърза чрез WebSocket.');

    // Симулиране на получаване на логове от услуга 1
    setInterval(() => {
        socket.emit('log', { service: 'srv-cv8kd0i3esus73dft3lg', message: 'Това е лог от услуга 1' });
    }, 5000);

    // Симулиране на получаване на логове от услуга 2
    setInterval(() => {
        socket.emit('log', { service: 'srv-cv8octogph6c73ae6a6g', message: 'Това е лог от услуга 2' });
    }, 7000);

    // Обработване на прекъсване на връзката
    socket.on('disconnect', () => {
        console.log('Клиентът прекъсна връзката.');
    });
});

// Уеб страница за визуализация
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Стартиране на сървъра
server.listen(PORT, () => {
    console.log(`Сървърът работи на порт ${PORT}`);
});
