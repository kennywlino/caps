'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

setInterval(() => {
    const brightness = Math.floor(Math.random() * 100);
  
    console.log('Brightness is: ', brightness);
    socket.emit('SUNLIGHT', { brightness });
  }, 2000);