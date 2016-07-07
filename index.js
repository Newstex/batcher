/**
 * Allows batching tasks to run in specific intervals
 *
 * @author: Chris Moyer <cmoyer@aci.info>
 */
'use strict';
var events = require('events');
var util = require('util');

/**
 * Create a new Batcher
 *
 * @param wait_time: Time to wait before sending the values in the queue (ms)
 */
function Batcher(wait_time){
	this.queue = [];
	this.wait_time = wait_time;
	this.timer = null;
	events.EventEmitter.call(this);
}
util.inherits(Batcher, events.EventEmitter);

/**
 * Send events if there are any in the queue
 */
Batcher.prototype.send = function send(){
	// Clear the timer
	this.timer = null;
	if(this.queue && this.queue.length > 0){
		// Execute the ready emitter
		this.emit('ready', this.queue);
		// Clear the queue
		this.queue = [];
	}
};

/**
 * Add a new item to the queue
 */
Batcher.prototype.push = function push(val){
	this.queue.push(val);
	// Start a new timer if one doesn't already exist
	// We start it here instead of using setInterval.unref()
	// so we make sure our events are ALWAYS processed,
	// even if the application exists.
	if(this.timer === undefined || this.timer === null){
		this.timer = setTimeout(this.send.bind(this), this.wait_time);
	}
};

module.exports = Batcher;
