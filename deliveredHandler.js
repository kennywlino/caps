'use strict';

let eventPool = require('./eventPool');

module.exports = (payload) => {
    setTimeout(() => {
        console.log('Package delivered:', payload);
    }, 5000);
}