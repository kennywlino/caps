'use strict';

const eventPool = require('./eventPool');
const inTransitHandler = require('./inTransitHandler');

jest.mock('./eventPool.js', () => {
    return {
        on: jest.fn(),
        emit: jest.fn(),
    };
});
console.log = jest.fn();

describe('In Transit Handler', () => {
    test('emit in transit event to notify status', () => {
        let payload = {
            'store' : '1-206-flowers',
            'orderId' : 12345,
            'customer': 'Nemo',
            'address': '123 Wallaby Lane'
        };
        inTransitHandler(payload);
        expect(console.log).toHaveBeenCalledWith('Package in-transit:', payload);
        expect(eventPool.emit).toHaveBeenCalledWith('DELIVERED', payload);
    });
})