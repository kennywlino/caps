'use strict';

let eventPool = require('./eventPool');

module.exports = (payload) => {
    console.log('Package in-transit:', payload);
    eventPool.emit('DELIVERED', payload);
}