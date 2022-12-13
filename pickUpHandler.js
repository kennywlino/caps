'use strict';

let eventPool = require('./eventPool');

module.exports = (payload) => {
    console.log('Received package:', payload);
    eventPool.emit('IN-TRANSIT', payload);
}