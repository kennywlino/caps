'use strict';

// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001/caps');

let socket = require('../socket-client');

const{ pickupInTransit, deliveryHandler } = require('./handlers');

socket.on('PICKUP', driverHandler);
socket.emit('GET_PICKUPS', {vendorId: '1-206-flowers'});
socket.emit('GET_PICKUPS', {vendorId: 'acme-widgets'});

function driverHandler(payload) {
  setTimeout(() => {
    pickupInTransit(socket)(payload);
  }, 1000);

  setTimeout(() => {
    deliveryHandler(socket)(payload); 
  }, 1000);
}
