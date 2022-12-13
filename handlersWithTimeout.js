'use strict';

const pickUpHandler = require('./pickUpHandler');
const inTransitHandler = require('./inTransitHandler');
const deliveredHandler = require('./deliveredHandler');

module.exports = {
    pickUpHandler: (payload) => {
        setTimeout(() => {
            pickUpHandler(payload);
        }, 5000);
    },

    inTransitHandler: (payload) => {
        setTimeout(() => {
            inTransitHandler(payload);
        }, 5000);
    },
    
    deliveredHandler: (payload) => {
        setTimeout(() => {
            deliveredHandler(payload);
        }, 5000);
    },
}