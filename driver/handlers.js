'use strict';

const pickupInTransit = (socket) => (payload) =>{
    console.log('Driver picked up order:', payload.orderId);
    socket.emit('IN_TRANSIT', payload)
}

const deliveryHandler = (socket) => (payload) => {
    console.log('Driver delivered order:', payload.orderId);
    socket.emit('DELIVERED', payload);
}

module.exports = { pickupInTransit, deliveryHandler };