# Interval.js

> Object-oriented JavaScript `setInterval()` wrapper.

----

# "Hello World!" example

Starting the interval is very straightforward.
As an example, below code creates an `Interval` object that
will log "Hello World!" every 100 milliseconds to the console.

```
var hello_world_printer = (new Interval(100, function () {
    console.log("Hello World!");
}));
```

Stopping the interval is equally easy:

```
hello_world_printer.cancel();
```

----

## Restarting intervals

Interval.js intervals can be restarted.
Each iteration, the function registered in the interval receives
the iteration counter as its only parameter.
A call to `.restart()` resets this counter to `0`.

```
var restarting = (new Interval(100, function (i) {
    console.log('iteration ' + i);
}));

// about 500ms pass...

restarting.restart();
```

The console output should be:

```
iteration 0
iteration 1
iteration 2
iteration 2
iteration 3
// here the interval is restarted by 'restarting.restart()'
iteration 0
iteration 1
iteration 2
...
```

----

## Time helpers

Three helper functions are available, for creating intervals that
fire every *n* milliseconds, seconds, or minutes:

```
// fires every 100ms
Interval.milliseconds(100)(function () { /* ... */ });

// fires every 30s
Interval.seconds(30)(function () { /* ... */ });

// fires every minute
Interval.minutes(1)(function () { /* ... */ });
```
