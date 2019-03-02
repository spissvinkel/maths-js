/**
 * `vec2` is a collection of functions to manipulate [[Vec2]] two-element vector objects.
 *
 * The primary use for a [[Vec2]] object is in 2D geometry.
 */

/** Import statements (dummy comment to satisfy TypeDoc generator) */
import { Vec2 } from './';
import { fpad as pad } from './maths';

/**
 * Creates a new 2-element vector object initialized with the given values
 *
 * @param x - the first element
 * @param y - the second element
 * @returns the new 2-element vector object
 */
export const of: (x: number, y: number) => Vec2 = (x, y) => ({ x, y } as Vec2);

/**
 * Creates a new copy of the 2-element vector `b`
 *
 * @param b - a 2-element vector object
 * @returns the new 2-element vector object
 */
export const ofV: (b: Vec2) => Vec2 = b => setV({ } as Vec2, b);

/**
 * Creates a new 2-element vector object with all elements set to zero
 *
 * @returns the new 2-element vector object
 */
export const zero: () => Vec2 = () => setZero({ } as Vec2);

/**
 * Creates a new 2-element vector object with all elements set to one
 *
 * @returns the new 2-element vector object
 */
export const one: () => Vec2 = () => setOne({ } as Vec2);

/**
 * Creates a new 2D unit vector along the x-axis
 *
 * @returns the new 2D unit vector
 */
export const unitX: () => Vec2 = () => setUnitX({ } as Vec2);

/**
 * Creates a new 2D unit vector along the y-axis
 *
 * @returns the new 2D unit vector
 */
export const unitY: () => Vec2 = () => setUnitY({ } as Vec2);

/**
 * Sets all elements of the 2-element vector `a` to zero
 *
 * @param a - a 2-element vector object
 * @returns `a` with all elements set to zero
 */
export const setZero: (a: Vec2) => Vec2 = a => { a.x = 0.0;  a.y = 0.0;  return a; };

/**
 * Sets all elements of the 2-element vector `a` to one
 *
 * @param a - a 2-element vector object
 * @returns `a` with all elements set to one
 */
export const setOne: (a: Vec2) => Vec2 = a => { a.x = 1.0;  a.y = 1.0;  return a; };

/**
 * Sets the elements of the 2D vector `a` so it becomes a unit vector along the x-axis
 *
 * @param a - a 2-element vector object
 * @returns `a` set to be a unit vector along the x-axis
 */
export const setUnitX: (a: Vec2) => Vec2 = a => { a.x = 1.0;  a.y = 0.0;  return a; };

/**
 * Sets the elements of the 2D vector `a` so it becomes a unit vector along the y-axis
 *
 * @param a - a 2-element vector object
 * @returns `a` set to be a unit vector along the y-axis
 */
export const setUnitY: (a: Vec2) => Vec2 = a => { a.x = 0.0;  a.y = 1.0;  return a; };

/**
 * Copies the 2-element vector `b` into the 2-element vector `a`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @returns `a` set to be a copy of `b`
 */
export const setV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => { a.x = b.x;  a.y = b.y;  return a; };

/**
 * Sets the elements of the 2-element vector `a` to the given values
 *
 * @param a - a 2-element vector object
 * @param x - the first element
 * @param y - the second element
 * @returns `a` with elements set to the given values
 */
export const set: (a: Vec2, x: number, y: number) => Vec2 = (a, x, y) => { a.x = x;  a.y = y;  return a; };

/**
 * `a = a + b`
 *
 * Adds the 2-element vector `b` to the 2-element vector `a` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @returns `a` as the result of `a + b`
 */
export const addV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => { a.x += b.x;  a.y += b.y;  return a; };

/**
 * `a = a - b`
 *
 * Subtracts the 2-element vector `b` from the 2-element vector `a` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @returns `a` as the result of `a - b`
 */
export const subV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => { a.x -= b.x;  a.y -= b.y;  return a; };

/**
 * `a = a + b * s`
 *
 * Adds the 2-element vector `b` multiplied by the scalar `s` to the 2-element vector `a` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @param s - a scalar value
 * @returns `a` as the result of `a + b * s`
 */
export const addMul: (a: Vec2, b: Vec2, s: number) => Vec2
= (a, b, s) => { a.x += b.x * s;  a.y += b.y * s;  return a; };

/**
 * `a = a * b`
 *
 * Element-wise multiplication of the 2-element vector `a` by the 2-element vector `b`, with the result stored in `a`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @returns `a` as the result of the multiplication
 */
export const mulV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => { a.x *= b.x;  a.y *= b.y;  return a; };

/**
 * `a = a * s`
 *
 * Multiplies the two-element vector `a` by the scalar `s` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @param s - a scalar value
 * @returns `a` as the result of `a * s`
 */
export const mul: (a: Vec2, s: number) => Vec2 = (a, s) => { a.x *= s;  a.y *= s;  return a; };

/**
 * `a = a / b`
 *
 * Element-wise division of the 2-element vector `a` by the 2-element vector `b`, with the result stored in `a`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @returns `a` as the result of the division
 */
export const divV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => { a.x /= b.x;  a.y /= b.y;  return a; };

/**
 * `a = a / s`
 *
 * Divides the two-element vector `a` by the scalar `s` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @param s - a scalar value
 * @returns `a` as the result of `a / s`
 */
export const div: (a: Vec2, s: number) => Vec2 = (a, s) => { a.x /= s;  a.y /= s;  return a; };

/**
 * `a = -a`
 *
 * Calculates the inverse of the two-element vector `a` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @returns `a` as its inverse
 */
export const inv: (a: Vec2) => Vec2 = a => { a.x = -a.x;  a.y = -a.y;  return a; };

/**
 * Calculates the square of the magnitude of the two-element vector `a`
 *
 * (This is cheaper than calculating the actual magnitude and is useful e.g. when comparing two vectors)
 *
 * @param a - a 2-element vector object
 * @returns `|a|²`
 */
export const sqrMag: (a: Vec2) => number = a => a.x * a.x  +  a.y * a.y

/**
 * Calculates the magnitude of the two-element vector `a`
 *
 * (See also [[sqrMag]])
 *
 * @param a - a 2-element vector object
 * @returns `|a|`
 */
export const mag: (a: Vec2) => number = a => Math.sqrt(sqrMag(a));

/**
 * `a = â`
 *
 * Normalises the two-element vector `a` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @returns `a` normalised
 */
export const norm: (a: Vec2) => Vec2 = a => normTo(a, mag(a));

/**
 * Normalises the two-element vector `a` based on the given magnitude `mag`, and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @param mag - the magnitude
 * @returns `a` normalised (based on `mag`)
 */
export const normTo: (a: Vec2, mag: number) => Vec2 = (a, mag) => mag > 0.0 ? mul(a, 1.0 / mag) : a;

/**
 * `a · b`
 *
 * Calculates the dot product of the two-element vectors `a` and `b`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @returns the dot product of `a` and `b`
 */
export const dot: (a: Vec2, b: Vec2) => number = (a, b) => a.x * b.x  +  a.y * b.y;

/**
 * Element-wise clamping of the values of the two-element vector `a` so that they are not less than the values of the
 * two-element vector `min` and not greater than the values of the two-element vector `max`.
 * The result is stored in `a`
 *
 * @param a - a 2-element vector object
 * @param min - a 2-element vector specifying the minimum values
 * @param max - a 2-element vector specifying the maximum values
 * @returns `a` clamped to `[min, max]`
 */
export const clampV: (a: Vec2, min: Vec2, max: Vec2) => Vec2 = (a, min, max) => {
  a.x = a.x < min.x ? min.x : (a.x > max.x ? max.x : a.x);
  a.y = a.y < min.y ? min.y : (a.y > max.y ? max.y : a.y);
  return a;
};

/**
 * Clamps the values of the two-element vector `a` so that they are not less than `min` and not greater than `max`,
 * and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @param min - the minimum value allowed
 * @param max - the maximum value allowed
 * @returns `a` clamped to `[min, max]`
 */
export const clamp: (a: Vec2, min: number, max: number) => Vec2 = (a, min, max) => {
  a.x = a.x < min ? min : (a.x > max ? max : a.x);
  a.y = a.y < min ? min : (a.y > max ? max : a.y);
  return a;
};

/**
 * Clamps the values of the two-element vector `a` so that they are not less than `0.0` and not greater than `1.0`,
 * and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @returns `a` clamped to `[0.0, 1.0]`
 */
export const clamp01: (a: Vec2) => Vec2 = a => clamp(a, 0.0, 1.0);

/**
 * Generates a (single-line) string representation of the 2-element vector `a`
 *
 * @param a - a 2-element vector object
 * @returns a string representation of `a`
 */
export const toString: (a: Vec2) => string = a => `[ ${pad(a.x)} ${pad(a.y)} ]`;
