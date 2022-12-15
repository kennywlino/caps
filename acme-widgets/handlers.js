'use strict';

// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001/caps');

const Chance = require('chance');
const chance = new Chance();

const generateOrder = (socket) => (payload = null) => {
  payload = payload ? payload : {
    'vendorId' : '1-206-flowers',
    'orderId' : chance.guid(),
    'customer': chance.name(),
    'address': chance.address(),
  };

  console.log('Vendor: Order for pick-up');
  socket.emit('PICKUP', payload);
};

const thankDriver = (payload) => {
  console.log('Vendor: Thank you for delivering to:', payload.customer);
};

module.exports = { generateOrder, thankDriver };