'use strict';

const { pickupInTransit, deliveryHandler } = require('./handlers');
const eventPool = require('../eventPool');

jest.mock('../eventPool.js', () => {
    return {
        on: jest.fn(),
        emit: jest.fn(),
    };
});
console.log = jest.fn();

describe('Driver', () => {
    const payload = {
        'store' : '1-206-flowers',
        'orderId' : 12345,
        'customer': 'Nemo',
        'address': '123 Wallaby Lane'
    };
    test('picks up order and emits in transit', () => {
        pickupInTransit(payload);
        expect(console.log).toHaveBeenCalledWith('Driver picked up order:', payload.orderId);
        expect(eventPool.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
    });

    test('delivers order', () => {
        deliveryHandler(payload);
        expect(console.log).toHaveBeenCalledWith('Driver delivered order:', payload.orderId);
        expect(eventPool.emit).toHaveBeenCalledWith('DELIVERED', payload);
    })
});