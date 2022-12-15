'use strict';


const { generateOrder, thankDriver } = require('./handlers');

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const requestPickup = generateOrder(socket);

let vendorId = 'acme-widgets';

// JOINs the 1-206-flowers room
socket.emit('JOIN', vendorId);

socket.emit('GET_DELIVERED', { vendorId });

socket.on('DELIVERED', thankDriver);

setInterval(() => {
  console.log('------New Pickup Order-------');
  requestPickup();
}, 1000);