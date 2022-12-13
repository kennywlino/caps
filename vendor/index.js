'use strict';

const eventPool = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();

eventPool.on('DELIVERED', thankDriver);

function generateOrder(){
    let payload = {
        'store' : '1-206-flowers',
        'orderId' : chance.guid(),
        'customer': chance.name(),
        'address': chance.address(),
    };

    console.log('Vendor: Order for pick-up');
    eventPool.emit('PICKUP', payload);
}

function thankDriver(payload){
    console.log('Vendor: Thank you for delivering to:', payload.customer);
}

setInterval(() => {
    console.log('------New Pickup Order-------');
    generateOrder();
}, 5000);