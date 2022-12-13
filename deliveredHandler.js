'use strict';

let eventPool = require('./eventPool');

module.exports = (payload) => {
    console.log('Package delivered:', payload);
}