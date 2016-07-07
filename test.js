/**
 * Test the Batcher
 *
 * @author: Chris Moyer <cmoyer@aci.info>
 */
'use strict';

var Batcher = require('./index');

var batch = new Batcher(1500);

batch.on('ready', function(vals){
	console.log(vals);
	if(vals.length !== 4){
		throw new Error('Incorrect Vals');
	}
});

batch.push('Initial Value');

setTimeout(function(){
	batch.push('Some other value');
}, 100);

setTimeout(function(){
	batch.push(['List', 'Value']);
}, 500);

setTimeout(function(){
	batch.push({
		some: 'Object',
		val: [
			'More',
			'Complex',
			5,
		],
	});
}, 1000);

