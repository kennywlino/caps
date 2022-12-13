'use strict';

const eventPool = require('../eventPool');

eventPool.on('PICKUP', driverHandler);

function driverHandler(payload) {
    setTimeout(() => {
        console.log('Driver picked up order:', payload.orderId);
        eventPool.emit('IN_TRANSIT', payload)
    }, 2000);

    setTimeout(() => {
        console.log('Driver delivered order', payload.orderId);
        eventPool.emit('DELIVERED', payload);
    }, 2000);
}