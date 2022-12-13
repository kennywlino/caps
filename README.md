# LAB - Class 11

## Project: Event Driven Applications

## Author: Kenny W. Lino

## Problem Domain

In this lab, we start implementing an application called "The Code Academy Parcel Service". This system mimics a supply chain by simulating a delivery system that has vendors that can request deliveries and drivers that can deliver them.

Using event-driven programming, we set up events such as the pick-up request from a vendor to trigger a notification for the driver.

### Links and Resources

- [Main PR from events](https://github.com/kennywlino/caps/pull/1)

### Setup

#### How to initialize/run your application

- `node hub.js`


### Features / Routes

- `eventPool.js` -- sets up the eventPool from the `events` module
- `hub.js` -- main file that triggers the first action of PICKUP and handles the event pool
- `pickUpHandler.js` -- handler for picking up orders
- `inTransitHandler.js` -- handler for indicating in transit orders
- `deliveredHandler.js` -- handler for indicating delivered orders

### Tests

- How do you run tests?
  - `npm test`

- Any tests of note?

  <handler>.test.js -- each file tests whether the payload has `console.log()` and emits the right event

#### UML

![Class-08 UML](./assets/CLASS-11_%20Event%20Driven%20Applications.jpeg)
