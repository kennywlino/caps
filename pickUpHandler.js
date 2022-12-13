'use strict';

let eventPool = require('./eventPool');

module.exports = (payload) => {
    setTimeout(() => {
        console.log('Received package:', payload);
        eventPool.emit('IN-TRANSIT', payload);
    }, 5000);
}