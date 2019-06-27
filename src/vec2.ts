/**
 * `vec2` is a collection of functions to manipulate [[Vec2]] two-element vector objects.
 *
 * The primary use for a [[Vec2]] object is in 2D geometry.
 */

/** Import statements (dummy comment to satisfy TypeDoc generator) */
import { Vec2 } from './';
import { fpad as pad, lerp as slerp } from './maths';

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
export const addV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => addVInto(a, b, a);

/**
 * `c = a + b`
 *
 * Adds the 2-element vector `b` to the 2-element vector `a` and stores the result in `c`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @param c - a 2-element vector in which to store the result
 * @returns `c` as the result of `a + b`
 */
export const addVInto: (a: Vec2, b: Vec2, c: Vec2) => Vec2 = (a, b, c) => {
  c.x = a.x + b.x;
  c.y = a.y + b.y;
  return c;
};

/**
 * `a = a - b`
 *
 * Subtracts the 2-element vector `b` from the 2-element vector `a` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @returns `a` as the result of `a - b`
 */
export const subV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => subVInto(a, b, a);

/**
 * `c = a - b`
 *
 * Subtracts the 2-element vector `b` from the 2-element vector `a` and stores the result in `c`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @param c - a 2-element vector in which to store the result
 * @returns `c` as the result of `a - b`
 */
export const subVInto: (a: Vec2, b: Vec2, c: Vec2) => Vec2 = (a, b, c) => {
  c.x = a.x - b.x;
  c.y = a.y - b.y;
  return c;
};

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
export const addMul: (a: Vec2, b: Vec2, s: number) => Vec2 = (a, b, s) => addMulInto(a, b, s, a);

/**
 * `c = a + b * s`
 *
 * Adds the 2-element vector `b` multiplied by the scalar `s` to the 2-element vector `a` and stores the result in `c`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @param s - a scalar value
 * @param c - a 2-element vector in which to store the result
 * @returns `c` as the result of `a + b * s`
 */
export const addMulInto: (a: Vec2, b: Vec2, s: number, c: Vec2) => Vec2 = (a, b, s, c) => {
  c.x = a.x + b.x * s;
  c.y = a.y + b.y * s;
  return c;
};

/**
 * `a = a * b`
 *
 * Element-wise multiplication of the 2-element vector `a` by the 2-element vector `b`, with the result stored in `a`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @returns `a` as the result of the multiplication
 */
export const mulV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => mulVInto(a, b, a);

/**
 * `c = a * b`
 *
 * Element-wise multiplication of the 2-element vector `a` by the 2-element vector `b`, with the result stored in `c`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @param c - a 2-element vector in which to store the result
 * @returns `c` as the result of the multiplication
 */
export const mulVInto: (a: Vec2, b: Vec2, c: Vec2) => Vec2 = (a, b, c) => {
  c.x = a.x * b.x;
  c.y = a.y * b.y;
  return c;
};

/**
 * `a = a * s`
 *
 * Multiplies the two-element vector `a` by the scalar `s` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @param s - a scalar value
 * @returns `a` as the result of `a * s`
 */
export const mul: (a: Vec2, s: number) => Vec2 = (a, s) => mulInto(a, s, a);

/**
 * `b = a * s`
 *
 * Multiplies the two-element vector `a` by the scalar `s` and stores the result in `b`
 *
 * @param a - a 2-element vector object
 * @param s - a scalar value
 * @param b - a 2-element vector in which to store the result
 * @returns `b` as the result of `a * s`
 */
export const mulInto: (a: Vec2, s: number, b: Vec2) => Vec2 = (a, s, b) => {
  b.x = a.x * s;
  b.y = a.y * s;
  return b;
};

/**
 * `a = a / b`
 *
 * Element-wise division of the 2-element vector `a` by the 2-element vector `b`, with the result stored in `a`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @returns `a` as the result of the division
 */
export const divV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => divVInto(a, b, a);

/**
 * `c = a / b`
 *
 * Element-wise division of the 2-element vector `a` by the 2-element vector `b`, with the result stored in `c`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @param c - a 2-element vector in which to store the result
 * @returns `c` as the result of the division
 */
export const divVInto: (a: Vec2, b: Vec2, c: Vec2) => Vec2 = (a, b, c) => {
  c.x = a.x / b.x;
  c.y = a.y / b.y;
  return c;
};

/**
 * `a = a / s`
 *
 * Divides the two-element vector `a` by the scalar `s` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @param s - a scalar value
 * @returns `a` as the result of `a / s`
 */
export const div: (a: Vec2, s: number) => Vec2 = (a, s) => divInto(a, s, a);

/**
 * `b = a / s`
 *
 * Divides the two-element vector `a` by the scalar `s` and stores the result in `b`
 *
 * @param a - a 2-element vector object
 * @param s - a scalar value
 * @param b - a 2-element vector in which to store the result
 * @returns `b` as the result of `a / s`
 */
export const divInto: (a: Vec2, s: number, b: Vec2) => Vec2 = (a, s, b) => {
  b.x = a.x / s;
  b.y = a.y / s;
  return b;
};

/**
 * `a = -a`
 *
 * Calculates the inverse of the two-element vector `a` and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @returns `a` as its inverse
 */
export const inv: (a: Vec2) => Vec2 = a => invInto(a, a);

/**
 * `b = -a`
 *
 * Calculates the inverse of the two-element vector `a` and stores the result in `b`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector in which to store the result
 * @returns `b` as the inverse of `a`
 */
export const invInto: (a: Vec2, b: Vec2) => Vec2 = (a, b) => {
  b.x = -a.x;
  b.y = -a.y;
  return b;
};

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
export const norm: (a: Vec2) => Vec2 = a => normForInto(a, mag(a), a);

/**
 * `b = â`
 *
 * Normalises the two-element vector `a` and stores the result in `b`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector in which to store the result
 * @returns `b` as `a` normalised
 */
export const normInto: (a: Vec2, b: Vec2) => Vec2 = (a, b) => normForInto(a, mag(a), b);

/**
 * `a = â`
 *
 * Normalises the two-element vector `a` based on the given magnitude `mag`, and stores the result in `a`.
 *
 * This variant is useful if you already know the magnitude
 *
 * @param a - a 2-element vector object
 * @param mag - the magnitude
 * @returns `a` normalised (based on `mag`)
 */
export const normFor: (a: Vec2, mag: number) => Vec2 = (a, mag) => normForInto(a, mag, a);

/**
 * `b = â`
 *
 * Normalises the two-element vector `a` based on the given magnitude `mag`, and stores the result in `b`.
 *
 * This variant is useful if you already know the magnitude
 *
 * @param a - a 2-element vector object
 * @param mag - the magnitude
 * @param b - a 2-element vector in which to store the result
 * @returns `b` as `a` normalised (based on `mag`)
 */
export const normForInto: (a: Vec2, mag: number, b: Vec2) => Vec2
= (a, mag, b) => mag > 0.0 ? mulInto(a, 1.0 / mag, b) : b;

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
 * Sets the elements of the 2D vector `b` so it becomes perpendicular to the 2D vector `a`.
 *
 * The direction of `b` with respect to `a` will be "to the right", i.e. rotated 90 degrees clockwise
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector in which to store the result
 * @returns `b` as a vector perpendicular to `a`
 */
export const perpInto: (a: Vec2, b: Vec2) => Vec2 = (a, b) => {
  b.x =  a.y;
  b.y = -a.x;
  return b;
};

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
export const clampV: (a: Vec2, min: Vec2, max: Vec2) => Vec2 = (a, min, max) => clampVInto(a, min, max, a);

/**
 * Element-wise clamping of the values of the two-element vector `a` so that they are not less than the values of the
 * two-element vector `min` and not greater than the values of the two-element vector `max`.
 * The result is stored in `b`
 *
 * @param a - a 2-element vector object
 * @param min - a 2-element vector specifying the minimum values
 * @param max - a 2-element vector specifying the maximum values
 * @param b - a 2-element vector in which to store the result
 * @returns `b` as `a` clamped to `[min, max]`
 */
export const clampVInto: (a: Vec2, min: Vec2, max: Vec2, b: Vec2) => Vec2 = (a, min, max, b) => {
  b.x = a.x < min.x ? min.x : (a.x > max.x ? max.x : a.x);
  b.y = a.y < min.y ? min.y : (a.y > max.y ? max.y : a.y);
  return b;
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
export const clamp: (a: Vec2, min: number, max: number) => Vec2 = (a, min, max) => clampInto(a, min, max, a);

/**
 * Clamps the values of the two-element vector `a` so that they are not less than `min` and not greater than `max`,
 * and stores the result in `b`
 *
 * @param a - a 2-element vector object
 * @param min - the minimum value allowed
 * @param max - the maximum value allowed
 * @param b - a 2-element vector in which to store the result
 * @returns `b` as `a` clamped to `[min, max]`
 */
export const clampInto: (a: Vec2, min: number, max: number, b: Vec2) => Vec2 = (a, min, max, b) => {
  b.x = a.x < min ? min : (a.x > max ? max : a.x);
  b.y = a.y < min ? min : (a.y > max ? max : a.y);
  return b;
};

/**
 * Clamps the values of the two-element vector `a` so that they are not less than `0.0` and not greater than `1.0`,
 * and stores the result in `a`
 *
 * @param a - a 2-element vector object
 * @returns `a` clamped to `[0.0, 1.0]`
 */
export const clamp01: (a: Vec2) => Vec2 = a => clampInto(a, 0.0, 1.0, a);

/**
 * Clamps the values of the two-element vector `a` so that they are not less than `0.0` and not greater than `1.0`,
 * and stores the result in `b`
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector in which to store the result
 * @returns `b` as `a` clamped to `[0.0, 1.0]`
 */
export const clamp01Into: (a: Vec2, b: Vec2) => Vec2 = (a, b) => clampInto(a, 0.0, 1.0, b);

/**
 * Linear interpolation between `a` and `b` based on `t`, where `t` is a number between `0.0` and `1.0`.
 * The result is stored in `c`.
 *
 * The result will be equal to `a` when `t` is `0.0`,
 * equal to `b` when `t` is `1.0`,
 * and halfway between `a` and `b` when `t` is `0.5`
 *
 * @param a - the start value - a 2-element vector object
 * @param b - the end value - a 2-element vector object
 * @param t - a floating point number in the interval `[0.0, 1.0]`
 * @param c - a 2-element vector in which to store the result
 * @returns `c` - the interpolation result
 */
export const lerp: (a: Vec2, b: Vec2, t: number, c: Vec2) => Vec2 = (a, b, t, c) => addMul(mulInto(a, 1 - t, c), b, t);

/**
 * Element-wise linear interpolation between `a` and `b` based on `tx` and `ty`, where `tx` and `ty` are numbers
 * between `0.0` and `1.0`.
 * The result is stored in `c`.
 *
 * The calculation is as follows: `a.x` and `b.x` are interpolated based on `tx` to give `c.x`,
 * `a.y` and `b.y` are interpolated based on `ty` to give `c.y`.
 *
 * The result will be equal to `a` when `tx` and `ty` are both `0.0`,
 * equal to `b` when `tx` and `ty` are both `1.0`,
 * and halfway between `a` and `b` when `tx` and `ty` are both `0.5`
 *
 * @param a - the start x and y values - a 2-element vector object
 * @param b - the end x and y values - a 2-element vector object
 * @param tx - a floating point number in the interval `[0.0, 1.0]`
 * @param ty - a floating point number in the interval `[0.0, 1.0]`
 * @param c - a 2-element vector in which to store the result
 * @returns `c` - the interpolation result
 */
export const lerpE: (a: Vec2, b: Vec2, tx: number, ty: number, c: Vec2) => Vec2
  = (a, b, tx, ty, c) => set(c, slerp(a.x, b.x, tx), slerp(a.y, b.y, ty));

/**
 * Bilinear interpolation between `a1`, `b1`, `a2` and `b2` based on `s` and `t`, where `s` and `t` are numbers
 * between `0.0` and `1.0`.
 * The result is stored in `c`.
 *
 * The calculation is as follows: `a1` and `b1` are interpolated based on `s` to give `p`,
 * `a2` and `b2` are interpolated based on `s` to give `q`,
 * and then the final result is obtained by interpolating `p` and `q` based on `t`.
 *
 * The result will be equal to `a1` when both `s` and `t` is `0.0`,
 * equal to `a2` when `s` is `0.0` and `t` is `1.0`,
 * equal to `b1` when `s` is `1.0` and `t` is `0.0`,
 * and equal to `b2` when both `s` and `t` is `1.0`
 *
 * @param a1 - the first start value - a 2-element vector object
 * @param b1 - the first end value - a 2-element vector object
 * @param a2 - the second start value - a 2-element vector object
 * @param b2 - the second end value - a 2-element vector object
 * @param s - a floating point number in the interval `[0.0, 1.0]`
 * @param t - a floating point number in the interval `[0.0, 1.0]`
 * @param c - a 2-element vector in which to store the result
 * @returns `c` - the interpolation result
 */
export const lerp2: (a1: Vec2, b1: Vec2, a2: Vec2, b2: Vec2, s: number, t: number, c: Vec2) => Vec2
= (a1, b1, a2, b2, s, t, c) => lerp(lerp(a1, b1, s, c), lerp(a2, b2, s, zero()), t, c);

/**
 * Checks if the vectors `a` and `b` are equal
 *
 * @param a - a 2-element vector object
 * @param b - a 2-element vector object
 * @returns `true` if `a` and `b` are equal, `false` otherwise
 */
export const equals: (a: Vec2, b: Vec2) => boolean = (a, b) => {
  return a.x === b.x && a.y === b.y;
};

/**
 * Generates a (single-line) string representation of the 2-element vector `a`
 *
 * @param a - a 2-element vector object
 * @returns a string representation of `a`
 */
export const toString: (a: Vec2) => string = a => `[ ${pad(a.x)} ${pad(a.y)} ]`;
