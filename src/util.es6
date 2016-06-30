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
 * If you need to give arguments without passing "this"
 * @param  {Function} f
 * @return {Function}
 */

 // Taken from Stackoverflow :
 export function createUniqueID() {
   let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
   var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
   return v.toString(16);});

   return uid;
 }

export function arg(f) {
  if (typeof f !== "function")
    throw new TypeError("Argument needs to a function");

  var slice = Array.prototype.slice,
    args = slice.call(arguments),
    fn = f,
    partial = function() {
      return fn.apply(this, args.concat(slice.call(arguments)));

    };

  return partial;
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
