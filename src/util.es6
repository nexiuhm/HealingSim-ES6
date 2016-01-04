export var rng = new Phaser.RandomDataGenerator([(Date.now() * Math.random()).toString()]);


/**
 * Prints a formatted error with stacktrace to the console.
 * @param  {String} errorReason Summary of  error occured
 * @param  {Object} error       A javascript error object
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

/**
 * Freeze an object so that no changes can be made to it. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * @param  {Object} objectToFreeze The object to be frozen
 * @return {Object}                Frozen object
 */

export function freezeObject(objectToFreeze) {
    let frozenObject = Object.freeze(objectToFreeze);
    return frozenObject;
}

export function speedtest(config) {
    if (typeof config !== 'Object') {
        // error: Excepts plain object
        return;
    }

    subRoutinesToRun = {};

    for (var key in config) {
        if (config.hasOwnProperty(key) && typeof config[key] === 'Function') {
            subRoutinesToRun[key] = config[key];

        }

    }

    //dbg
    console.log(JSON.stringify(subRoutinesToRun));






    function _run(iterations) {

        // capture date

    }
}
