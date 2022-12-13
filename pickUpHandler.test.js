'use strict';

const eventPool = require('./eventPool');
const pickUpHandler = require('./pickUpHandler');

jest.mock('./eventPool.js', () => {
    return {
        on: jest.fn(),
        emit: jest.fn(),
    };
});
console.log = jest.fn();

describe('Pick Up Handler', () => {
    test('emit pick-up event to get package', () => {
       let payload = {
            'store' : '1-206-flowers',
            'orderId' : 12345,
            'customer': 'Nemo',
            'address': '123 Wallaby Lane'
        };
        pickUpHandler(payload);
        expect(console.log).toHaveBeenCalledWith('Received package:', payload);
        expect(eventPool.emit).toHaveBeenCalledWith('IN-TRANSIT', payload);
    });
})