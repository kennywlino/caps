'use strict';


const { generateOrder, thankDriver } = require('./handlers');

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const requestPickup = generateOrder(socket);

socket.on('DELIVERED', thankDriver);

setInterval(() => {
    console.log('------New Pickup Order-------');
    requestPickup();
}, 3000);