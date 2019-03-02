/**
 * `Maths` is a collection of functions and constants generally relevant to 2D/3D geometry and graphics
 */

/**
 * `2π` as a constant
 */
export const TWO_PI = Math.PI * 2.0;

/**
 * `π/2` as a constant
 */
export const PI_BY_2 = Math.PI / 2.0;

/**
 * `π/180` as a constant
 */
export const PI_BY_180 = Math.PI / 180.0;

/**
 * `√̅2̅π` as a constant
 */
export const TWO_PI_ROOT = Math.sqrt(TWO_PI);

/**
 * Calculates the cotangent of the given angle
 *
 * @param angle - an angle in radians
 * @returns the cotangent of `angle`
 */
export const cotan: (angle: number) => number = angle => 1.0 / Math.tan(angle);

/**
 * Converts an angle in degrees to an angle in radians
 *
 * @param degrees - an angle
 * @returns `degrees` converted to radians
 */
export const deg2rad: (degrees: number) => number = degrees => degrees * PI_BY_180;

/**
 * Clamps the value `x` so that it is not less than `min` and not greater than `max`
 *
 * @param x - the value to clamp
 * @param min - the minimum value allowed
 * @param max - the maximum value allowed
 * @returns `x` clamped to `[min, max]`
 */
export const clamp: (x: number, min: number, max: number) => number
  = (x, min, max) => x < min ? min : (x > max ? max : x);

/**
 * Clamps the value `x` so that it is not less than `0.0` and not greater than `1.0`
 *
 * @param x - the value to clamp
 * @returns `x` clamped to `[0.0, 1.0]`
 */
export const clamp01: (x: number) => number = x => clamp(x, 0.0, 1.0);

/**
 * Formats the floating point number `n` as a string.
 *
 * The result has 4 digits after the decimal point and is left-padded with spaces to a width of 10.
 *
 * This function is primarily intended for debugging and logging, and is used by the `toString()` functions in this
 * library
 *
 * @param n - the number to format
 * @returns `n` formatted as a string
 */
export const fpad: (n: number) => string = n => {
  const d = 4, c = ' ', w = 10;
  let s = n.toFixed(d);
  while (s.length < w) s = c + s;
  return s;
};
