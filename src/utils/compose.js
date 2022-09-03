/**
 * @typedef {*} Value
 */
/**
 * @function fn
 * @param {Value} value
 * @return Value
 */
/**
 * @function
 * Composes provided functions in a Ramda way from right to left
 * @example
 * const addOne = a => a + 1;
 * const multiplyByTwo = a = a * 2
 * compose(multiplyByTwo, addOne)(2) // => 6
 * @param {...fn} fns
 * @return {function(...Value): Value}
 */
export const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight(
      (params, fn) => (Array.isArray(params) ? fn(...params) : fn(params)),
      args
    );
