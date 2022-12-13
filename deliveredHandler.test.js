'use strict';

const eventPool = require('./eventPool');
const deliveredHandler = require('./deliveredHandler');

jest.mock('./eventPool.js', () => {
    return {
        on: jest.fn(),
        emit: jest.fn(),
    };
});
console.log = jest.fn();

describe('Delivered Handler', () => {
    test('emit delivered event to notify status', () => {
        let payload = {
            'store' : '1-206-flowers',
            'orderId' : 12345,
            'customer': 'Nemo',
            'address': '123 Wallaby Lane'
        };
        deliveredHandler(payload);
        expect(console.log).toHaveBeenCalledWith('Package delivered:', payload);
    });
})