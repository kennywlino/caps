'use strict';

require('dotenv').config();

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002; // process.env not working?

// instance of a listening event server at PORT
const server = new Server(3001);

// defining a namespace
const caps = server.of('/caps');

// defining logger to log each event
function logger(event, payload) {
    const time = new Date();
    console.log('EVENT:', {event, time, payload});
}

caps.on('connection', (socket) => {
    console.log('Socket connected to CAPS namespace', socket.id);

    socket.on('PICKUP', (payload) => {
        logger('PICKUP', payload);
        socket.broadcast.emit('PICKUP', payload);
    });
    socket.on('IN_TRANSIT', (payload) => {
        logger('IN_TRANSIT', payload);
        socket.broadcast.emit('IN_TRANSIT', payload);
    });
    socket.on('DELIVERED', (payload) =>  {
        logger('DELIVERED', payload);
        socket.broadcast.emit('DELIVERED', payload);
    });
});