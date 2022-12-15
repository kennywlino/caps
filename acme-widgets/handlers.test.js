'use strict';

const { generateOrder, thankDriver } = require('./handlers');
let socket = require('../socket-client');

jest.mock('../socket-client', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Vendor', () => {
  test('emits an order', () => {
    const payload = {
      'store' : '1-206-flowers',
      'orderId' : 12345,
      'customer': 'Nemo',
      'address': '123 Wallaby Lane',
    };
    generateOrder(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Vendor: Order for pick-up');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP', payload);
  });

  test('thanks the driver', () => {
    thankDriver({customer: 'Nemo'});
    expect(console.log).toHaveBeenCalledWith('Vendor: Thank you for delivering to:', 'Nemo');
  });
});