'use strict';

require('dotenv').config();

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002; 
const Queue = require('./lib/queue');

const pickUpQueue = new Queue();
const deliveredQueue = new Queue();

// instance of a listening event server at PORT
const server = new Server(PORT);

// defining a namespace
const caps = server.of('/caps');

// defining logger to log each event
function logger(event, payload) {
  const time = new Date();
  console.log('EVENT:', {event, time, payload});
}

caps.on('connection', (socket) => {
  console.log('Socket connected to CAPS namespace', socket.id);

  socket.on('JOIN', (vendorId) => {
    socket.join(vendorId);
    console.log(`Joined room: ${vendorId}`);
    socket.emit('JOIN', vendorId);
  });

  socket.on('PICKUP', (payload) => {
    logger('PICKUP', payload);
    let currentQueue = pickUpQueue.read(payload.vendorId);
    if(!currentQueue){
      // queueKey === payload.queueId
      let vendorKey = pickUpQueue.store(payload.vendorId, new Queue()); 
      currentQueue = pickUpQueue.read(vendorKey);
    }
    // store the payload (i.e. package) at the orderID key
    currentQueue.store(payload.orderId, payload);
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN_TRANSIT', (payload) => {
    logger('IN_TRANSIT', payload);
    socket.broadcast.emit('IN_TRANSIT', payload);
  });


  socket.on('DELIVERED', (payload) =>  {
    let currentQueue = deliveredQueue.read(payload.vendorId);
    if(!currentQueue){
      // queueKey === payload.queueId
      let vendorKey = deliveredQueue.store(payload.vendorId, new Queue()); 
      currentQueue = deliveredQueue.read(vendorKey);
    }
    // store the payload (i.e. package) at the orderID key
    currentQueue.store(payload.orderId, payload);
    // console.log('in DELIVERED:', currentQueue);
    logger('DELIVERED', payload);
    socket.broadcast.emit('DELIVERED', payload);
  });

  socket.on('GET_PICKUPS', (payload) => {
    let currentQueue = pickUpQueue.read(payload.vendorId);
    // console.log('Currently in: GET_PICKUPS with', payload.vendorId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(orderId => {
        socket.emit('PICKUP', currentQueue.read(orderId));
      });
    }
  });

  socket.on('GET_DELIVERED', (payload) => {
    let currentQueue = deliveredQueue.read(payload.vendorId);
    // console.log('Currently in: GET_DELIVERED with', payload.vendorId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(orderId => {
        socket.emit('DELIVERED', currentQueue.read(orderId));
      });
    }
  });
});