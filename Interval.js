/** Copyright (c) 2016 Posbit.pl
 *
 *  This code is free software, published under GNU LGPL license.
 *
 *  This source code may be embedded in source code of closed-source programs
 *  without requiring the source code of the program embedding Interval.js to
 *  be revealed.
 *  Any changes in the Interval.js code must be revealed, though.
 *
 *  For more information about copying and using the code email the maintainer.
 *  Email addresses may be found at https://github.com/posbit/Interval.js
 */

function Interval(delay, fn) {
    var id = 0; // ID of the interval, required for cancelling it later 
    var counter = 0; // counts how many times the interval has fired, reset to 0 by .cancel()
    var self = this;

    this.running = function () {
        /** Returns true if the Interval object is running, otherwise returns false.
         */
        return (id !== 0);
    };

    this.cancel = function () {
        /** Cancels the interval.
         *
         *  Cancelling Interval that is not running is safe.
         */
        if (this.running()) {
            clearInterval(id);
            counter = 0;
        };
        return this;
    };

    function start () {
        /** Starts the interval, and sets the interval ID.
         *
         *  After this function is called, the interval is
         *  considered to be in "running" state.
         *
         *  This is PRIVATE FUNCTION.
         */
        id = setInterval(function () { fn(counter++, self); }, delay);
    }
    this.restart = function (f) {
        /** Restart the interval.
         *
         *  If the interval is in "running" state, when this function
         *  is called it will be cancelled prior to being restarted.
         *
         *  Restart can be used to change function that is triggered
         *  by the interval.
         *  The new function is an optional parameter to this function.
         */
        this.cancel();

        if (f && ((typeof f) === 'function')) {
            fn = f;
        }

        start();
    }

    // Start the interval immediately, as the last thing the
    // constructor does.
    // Calling (new Interval(...)) returns running interval.
    start();
}

Interval.milliseconds = function (n) {
    /** Returns a function that can be used to spawn
     *  Interval objects firing every n milliseconds.
     */
    return function (fn) {
        return (new Interval(n, fn));
    };
};
Interval.seconds = function (n) {
    /** Returns a function that can be used to spawn
     *  Interval objects firing every n seconds.
     */
    return Interval.milliseconds(n*1000);
};
Interval.minutes = function (n) {
    /** Returns a function that can be used to spawn
     *  Interval objects firing every n minutes.
     */
    return Intrval.seconds(n*60);
};
