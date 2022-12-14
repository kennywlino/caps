'use strict';

const { pickupInTransit, deliveryHandler } = require('./handlers');
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

jest.mock('socket', () => {
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
        pickupInTransit(socket)(payload);
        expect(console.log).toHaveBeenCalledWith('Driver picked up order:', payload.orderId);
        expect(socket.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
    });

    test('delivers order', () => {
        deliveryHandler(socket)(payload);
        expect(console.log).toHaveBeenCalledWith('Driver delivered order:', payload.orderId);
        expect(socket.emit).toHaveBeenCalledWith('DELIVERED', payload);
    })
});