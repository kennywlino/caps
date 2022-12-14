'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

const{ pickupInTransit, deliveryHandler } = require('./handlers');

socket.on('PICKUP', driverHandler);

function driverHandler(payload) {
    setTimeout(() => {
        pickupInTransit(socket)(payload);
    }, 1000);

    setTimeout(() => {
       deliveryHandler(socket)(payload); 
    }, 1000);
}
