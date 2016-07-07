# batcher
Re-usable pattern to allow batching up data into a Queue and executing a custom function later.

This is designed for use with APIs that allow submitting multiple records at once, such as the AppEnlight libraries for APM, Log, and error tracking.

## Usage

Initialize a batcher:

```
var Batcher = require('batcher');

var batch = new Batcher(5000); // Delay in seconds before executing the "ready" event

// Function will be called in 5 seconds with any values that have been pushed to it
// as long as the values aren't empty.
// After being read once, they won't be processed again.
batch.on('ready', function(vals){
	console.log('Process values', vals);
});

batch.push('foo');
batch.push([ 'complex', 'objects', 'allowed']);
```
