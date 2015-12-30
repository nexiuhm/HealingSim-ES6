export var rng = new Phaser.RandomDataGenerator([(Date.now() * Math.random()).toString()]);


/**
 * Prints a formatted error with stacktrace to the console.
 * @param  {[type]} errorReason [description]
 * @param  {[type]} error       [description]
 * @return {void}             
 */

export function printPrettyError(errorReason, error) {
    console.log('%c %c %c ' + errorReason + '\n%c' + error.stack,
        'background: #9854d8',
        'background: #6c2ca7',
        'color: #ffffff; background: #450f78;',
        'color: #450f78; ',
        'color: #ce0000;');
}
