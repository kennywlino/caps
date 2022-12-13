'use strict';

const eventPool = require('../eventPool');

const { generateOrder, thankDriver } = require('./handlers');

eventPool.on('DELIVERED', thankDriver);

setInterval(() => {
    console.log('------New Pickup Order-------');
    generateOrder();
}, 5000);

module.exports = { generateOrder, thankDriver }