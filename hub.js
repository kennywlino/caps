'use strict';

const Chance = require('chance');
const chance = new Chance();

const eventPool = require('./eventPool');
const driver = require('./driver');
const vendor = require('./vendor');

// defining logger to log per event
function logger(event, payload) {
    const time = new Date();
    console.log('EVENT:', {event, time, payload});
}

eventPool.on('PICKUP', (payload) => logger('PICKUP', payload));
eventPool.on('IN_TRANSIT', (payload) => logger('IN_TRANSIT', payload));
eventPool.on('DELIVERED', (payload) => logger('DELIVERED', payload));
