'use strict';

let eventPool = require('./eventPool');

module.exports = (payload) => {
    setTimeout(() => {
        console.log('Package in-transit:', payload);
        eventPool.emit('DELIVERED', payload);
    }, 5000);
}