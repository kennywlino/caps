'use strict';

const Chance = require('chance');

const chance = new Chance();

const eventPool = require('./eventPool');

// handlers
const pickUpHandler = require('./pickUpHandler');
const inTransitHandler = require('./inTransitHandler');
const deliveredHandler = require('./deliveredHandler');

eventPool.on('PICKUP', pickUpHandler);
eventPool.on('IN-TRANSIT', inTransitHandler);
eventPool.on('DELIVERED', deliveredHandler);

// simulating pick-up request
setInterval(() => {
    let payload = {
        'store' : '1-206-flowers',
        'orderId' : chance.guid(),
        'customer': chance.name(),
        'address': chance.address()
    };
    eventPool.emit('PICKUP', payload);
}, 20000);
