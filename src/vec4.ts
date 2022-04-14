/**
 * `vec4` is a collection of functions to manipulate {@linkcode Vec4} 4-element vector objects.
 *
 * The primary use for a {@linkcode Vec4} object is as homogeneous coordinates in 3D geometry,
 * or to represent e.g. RGBA colours.
 *
 * Example usage:
 * ```
 * import * as vec4 from '@spissvinkel/maths/vec4';
 * ```
 *
 * @module
 */

import { Vec3, Vec4 } from './';
import { fpad as pad, lerp as slerp } from './maths';

/**
 * Creates a new 4-element vector object initialized with the given values
 *
 * @param x - the first element
 * @param y - the second element
 * @param z - the third element
 * @param w - the fourth element
 * @returns the new 4-element vector object
 */
export const of = (x: number, y: number, z: number, w: number): Vec4 => ({ x, y, z, w });

/**
 * Creates a new copy of the 4-element vector `b`
 *
 * @param b - a 4-element vector object
 * @returns the new 4-element vector object
 */
export const ofV = (b: Vec4): Vec4 => setV({ } as Vec4, b);

/**
 * Creates a new 4-element vector object initialized to the values of the 3-element vector `b` and the value `w`
 *
 * @param b - a 3-element vector object
 * @param w - the fourth element
 * @returns the new 4-element vector object
 */
export const ofV3 = (b: Vec3, w: number): Vec4 => of(b.x, b.y, b.z, w);

/**
 * Creates a new 4-element vector object with all elements set to zero
 *
 * @returns the new 4-element vector object
 */
export const zero = (): Vec4 => setZero({ } as Vec4);

/**
 * Creates a new 4-element vector object with all elements set to one
 *
 * @returns the new 4-element vector object
 */
export const one = (): Vec4 => setOne({ } as Vec4);

/**
 * Creates a new 4D unit vector along the x-axis
 *
 * @returns the new 4D unit vector
 */
export const unitX = (): Vec4 => setUnitX({ } as Vec4);

/**
 * Creates a new 4D unit vector along the y-axis
 *
 * @returns the new 4D unit vector
 */
export const unitY = (): Vec4 => setUnitY({ } as Vec4);

/**
 * Creates a new 4D unit vector along the z-axis
 *
 * @returns the new 4D unit vector
 */
export const unitZ = (): Vec4 => setUnitZ({ } as Vec4);

/**
 * Creates a new 4D unit vector along the w-axis
 *
 * @returns the new 4D unit vector
 */
export const unitW = (): Vec4 => setUnitW({ } as Vec4);

/**
 * Sets all elements of the 4-element vector `a` to zero
 *
 * @param a - a 4-element vector object
 * @returns `a` with all elements set to zero
 */
export const setZero = (a: Vec4): Vec4 => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  a.w = 0.0;  return a; };

/**
 * Sets all elements of the 4-element vector `a` to one
 *
 * @param a - a 4-element vector object
 * @returns `a` with all elements set to one
 */
export const setOne = (a: Vec4): Vec4 => { a.x = 1.0;  a.y = 1.0;  a.z = 1.0;  a.w = 1.0;  return a; };

/**
 * Sets the elements of the 4D vector `a` so it becomes a unit vector along the x-axis
 *
 * @param a - a 4-element vector object
 * @returns `a` set to be a unit vector along the x-axis
 */
export const setUnitX = (a: Vec4): Vec4 => { a.x = 1.0;  a.y = 0.0;  a.z = 0.0;  a.w = 0.0;  return a; };

/**
 * Sets the elements of the 4D vector `a` so it becomes a unit vector along the y-axis
 *
 * @param a - a 4-element vector object
 * @returns `a` set to be a unit vector along the y-axis
 */
export const setUnitY = (a: Vec4): Vec4 => { a.x = 0.0;  a.y = 1.0;  a.z = 0.0;  a.w = 0.0;  return a; };

/**
 * Sets the elements of the 4D vector `a` so it becomes a unit vector along the z-axis
 *
 * @param a - a 4-element vector object
 * @returns `a` set to be a unit vector along the z-axis
 */
export const setUnitZ = (a: Vec4): Vec4 => { a.x = 0.0;  a.y = 0.0;  a.z = 1.0;  a.w = 0.0;  return a; };

/**
 * Sets the elements of the 4D vector `a` so it becomes a unit vector along the w-axis
 *
 * @param a - a 4-element vector object
 * @returns `a` set to be a unit vector along the w-axis
 */
export const setUnitW = (a: Vec4): Vec4 => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  a.w = 1.0;  return a; };

/**
 * Copies the 4-element vector `b` into the 4-element vector `a`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @returns `a` set to be a copy of `b`
 */
export const setV = (a: Vec4, b: Vec4): Vec4 => { a.x = b.x;  a.y = b.y;  a.z = b.z;  a.w = b.w;  return a; };

/**
 * Copies the 3-element vector `b` and the value `w` into the 4-element vector `a`
 *
 * @param a - a 4-element vector object
 * @param b - a 3-element vector object
 * @param w - the fourth element
 * @returns `a` with its first three elements set to be a copy of `b` and the fourth set to `w`
 */
export const setV3 = (a: Vec4, b: Vec3, w: number): Vec4 => {
    a.x = b.x;  a.y = b.y;  a.z = b.z;  a.w = w;
    return a;
};

/**
 * Sets the elements of the 4-element vector `a` to the given values
 *
 * @param a - a 4-element vector object
 * @param x - the first element
 * @param y - the second element
 * @param z - the third element
 * @param w - the fourth element
 * @returns `a` with elements set to the given values
 */
export const set = (a: Vec4, x: number, y: number, z: number, w: number): Vec4 => {
    a.x = x;  a.y = y;  a.z = z;  a.w = w;
    return a;
};

/**
 * `a = a + b`
 *
 * Adds the 4-element vector `b` to the 4-element vector `a` and stores the result in `a`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @returns `a` as the result of `a + b`
 */
export const addV = (a: Vec4, b: Vec4): Vec4 => addVInto(a, b, a);

/**
 * `c = a + b`
 *
 * Adds the 4-element vector `b` to the 4-element vector `a` and stores the result in `c`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @param c - a 4-element vector in which to store the result
 * @returns `c` as the result of `a + b`
 */
export const addVInto = (a: Vec4, b: Vec4, c: Vec4): Vec4 => {
    c.x = a.x + b.x;
    c.y = a.y + b.y;
    c.z = a.z + b.z;
    c.w = a.w + b.w;
    return c;
};

/**
 * `a = a - b`
 *
 * Subtracts the 4-element vector `b` from the 4-element vector `a` and stores the result in `a`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @returns `a` as the result of `a - b`
 */
export const subV = (a: Vec4, b: Vec4): Vec4 => subVInto(a, b, a);

/**
 * `c = a - b`
 *
 * Subtracts the 4-element vector `b` from the 4-element vector `a` and stores the result in `c`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @param c - a 4-element vector in which to store the result
 * @returns `c` as the result of `a - b`
 */
export const subVInto = (a: Vec4, b: Vec4, c: Vec4): Vec4 => {
    c.x = a.x - b.x;
    c.y = a.y - b.y;
    c.z = a.z - b.z;
    c.w = a.w - b.w;
    return c;
};

/**
 * `a = a + b * s`
 *
 * Adds the 4-element vector `b` multiplied by the scalar `s` to the 4-element vector `a` and stores the result in `a`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @param s - a scalar value
 * @returns `a` as the result of `a + b * s`
 */
export const addMul = (a: Vec4, b: Vec4, s: number): Vec4 => addMulInto(a, b, s, a);

/**
 * `c = a + b * s`
 *
 * Adds the 4-element vector `b` multiplied by the scalar `s` to the 4-element vector `a` and stores the result in `c`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @param s - a scalar value
 * @param c - a 4-element vector in which to store the result
 * @returns `c` as the result of `a + b * s`
 */
export const addMulInto = (a: Vec4, b: Vec4, s: number, c: Vec4): Vec4 => {
    c.x = a.x + b.x * s;
    c.y = a.y + b.y * s;
    c.z = a.z + b.z * s;
    c.w = a.w + b.w * s;
    return c;
};

/**
 * `a = a * b`
 *
 * Element-wise multiplication of the 4-element vector `a` by the 4-element vector `b`, with the result stored in `a`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @returns `a` as the result of the multiplication
 */
export const mulV = (a: Vec4, b: Vec4): Vec4 => mulVInto(a, b, a);

/**
 * `c = a * b`
 *
 * Element-wise multiplication of the 4-element vector `a` by the 4-element vector `b`, with the result stored in `c`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @param c - a 4-element vector in which to store the result
 * @returns `c` as the result of the multiplication
 */
export const mulVInto = (a: Vec4, b: Vec4, c: Vec4): Vec4 => {
    c.x = a.x * b.x;
    c.y = a.y * b.y;
    c.z = a.z * b.z;
    c.w = a.w * b.w;
    return c;
};

/**
 * `a = a * s`
 *
 * Multiplies the 4-element vector `a` by the scalar `s` and stores the result in `a`
 *
 * @param a - a 4-element vector object
 * @param s - a scalar value
 * @returns `a` as the result of `a * s`
 */
export const mul = (a: Vec4, s: number): Vec4 => mulInto(a, s, a);

/**
 * `b = a * s`
 *
 * Multiplies the 4-element vector `a` by the scalar `s` and stores the result in `b`
 *
 * @param a - a 4-element vector object
 * @param s - a scalar value
 * @param b - a 4-element vector in which to store the result
 * @returns `b` as the result of `a * s`
 */
export const mulInto = (a: Vec4, s: number, b: Vec4): Vec4 => {
    b.x = a.x * s;
    b.y = a.y * s;
    b.z = a.z * s;
    b.w = a.w * s;
    return b;
};

/**
 * `a = a ^ s`
 *
 * Raises the 4 elements of vector `a` to the power of `s` and stores the result in `a`
 *
 * @param a - a 4-element vector object
 * @param s - a scalar value
 * @returns `a` as the result of `a ^ s`
 */
export const pow = (a: Vec4, s: number): Vec4 => powInto(a, s, a);

/**
 * `b = a ^ s`
 *
 * Raises the 4 elements of vector `a` to the power of `s` and stores the result in `b`
 *
 * @param a - a 4-element vector object
 * @param s - a scalar value
 * @param b - a 4-element vector in which to store the result
 * @returns `b` as the result of `a ^ s`
 */
export const powInto = (a: Vec4, s: number, b: Vec4): Vec4 => {
    b.x = Math.pow(a.x, s);
    b.y = Math.pow(a.y, s);
    b.z = Math.pow(a.z, s);
    b.w = Math.pow(a.w, s);
    return b;
};

/**
 * `a = -a`
 *
 * Calculates the inverse of the 4-element vector `a` and stores the result in `a`
 *
 * @param a - a 4-element vector object
 * @returns `a` as its inverse
 */
export const inv = (a: Vec4): Vec4 => invInto(a, a);

/**
 * `b = -a`
 *
 * Calculates the inverse of the 4-element vector `a` and stores the result in `b`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector in which to store the result
 * @returns `b` as the inverse of `a`
 */
export const invInto = (a: Vec4, b: Vec4): Vec4 => {
    b.x = -a.x;
    b.y = -a.y;
    b.z = -a.z;
    b.w = -a.w;
    return b;
};

/**
 * Element-wise clamping of the values of the 4-element vector `a` so that they are not less than the values of the
 * 4-element vector `min` and not greater than the values of the 4-element vector `max`.
 * The result is stored in `a`
 *
 * @param a - a 4-element vector object
 * @param min - a 4-element vector specifying the minimum values
 * @param max - a 4-element vector specifying the maximum values
 * @returns `a` clamped to `[min, max]`
 */
export const clampV = (a: Vec4, min: Vec4, max: Vec4): Vec4 => clampVInto(a, min, max, a);

/**
 * Element-wise clamping of the values of the 4-element vector `a` so that they are not less than the values of the
 * 4-element vector `min` and not greater than the values of the 4-element vector `max`.
 * The result is stored in `b`
 *
 * @param a - a 4-element vector object
 * @param min - a 4-element vector specifying the minimum values
 * @param max - a 4-element vector specifying the maximum values
 * @param b - a 4-element vector in which to store the result
 * @returns `b` as `a` clamped to `[min, max]`
 */
export const clampVInto = (a: Vec4, min: Vec4, max: Vec4, b: Vec4): Vec4 => {
    b.x = a.x < min.x ? min.x : (a.x > max.x ? max.x : a.x);
    b.y = a.y < min.y ? min.y : (a.y > max.y ? max.y : a.y);
    b.z = a.z < min.z ? min.z : (a.z > max.z ? max.z : a.z);
    b.w = a.w < min.w ? min.w : (a.w > max.w ? max.w : a.w);
    return b;
};

/**
 * Clamps the values of the 4-element vector `a` so that they are not less than `min` and not greater than `max`,
 * and stores the result in `a`
 *
 * @param a - a 4-element vector object
 * @param min - the minimum value allowed
 * @param max - the maximum value allowed
 * @returns `a` clamped to `[min, max]`
 */
export const clamp = (a: Vec4, min: number, max: number): Vec4 => clampInto(a, min, max, a);

/**
 * Clamps the values of the 4-element vector `a` so that they are not less than `min` and not greater than `max`,
 * and stores the result in `b`
 *
 * @param a - a 4-element vector object
 * @param min - the minimum value allowed
 * @param max - the maximum value allowed
 * @param b - a 4-element vector in which to store the result
 * @returns `b` as `a` clamped to `[min, max]`
 */
export const clampInto = (a: Vec4, min: number, max: number, b: Vec4): Vec4 => {
    b.x = a.x < min ? min : (a.x > max ? max : a.x);
    b.y = a.y < min ? min : (a.y > max ? max : a.y);
    b.z = a.z < min ? min : (a.z > max ? max : a.z);
    b.w = a.w < min ? min : (a.w > max ? max : a.w);
    return b;
};

/**
 * Clamps the values of the 4-element vector `a` so that they are not less than `0.0` and not greater than `1.0`,
 * and stores the result in `a`
 *
 * @param a - a 4-element vector object
 * @returns `a` clamped to `[0.0, 1.0]`
 */
export const clamp01 = (a: Vec4): Vec4 => clampInto(a, 0.0, 1.0, a);

/**
 * Clamps the values of the 4-element vector `a` so that they are not less than `0.0` and not greater than `1.0`,
 * and stores the result in `b`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector in which to store the result
 * @returns `b` as `a` clamped to `[0.0, 1.0]`
 */
export const clamp01Into = (a: Vec4, b: Vec4): Vec4 => clampInto(a, 0.0, 1.0, b);

/**
 * Linear interpolation between `a` and `b` based on `t`, where `t` is a number between `0.0` and `1.0`.
 * The result is stored in `c`.
 *
 * The result will be equal to `a` when `t` is `0.0`,
 * equal to `b` when `t` is `1.0`,
 * and halfway between `a` and `b` when `t` is `0.5`
 *
 * @param a - the start value - a 4-element vector object
 * @param b - the end value - a 4-element vector object
 * @param t - a floating point number in the interval `[0.0, 1.0]`
 * @param c - a 4-element vector in which to store the result
 * @returns `c` - the interpolation result
 */
export const lerp = (a: Vec4, b: Vec4, t: number, c: Vec4): Vec4 => addMul(mulInto(a, 1 - t, c), b, t);

/**
 * Element-wise linear interpolation between `a` and `b` based on `tx`, `ty`, `tz` and `tw`, where `tx`, `ty`, `tz` and
 * `tw` are numbers between `0.0` and `1.0`.
 * The result is stored in `c`.
 *
 * The calculation is as follows: `a.x` and `b.x` are interpolated based on `tx` to give `c.x`,
 * `a.y` and `b.y` are interpolated based on `ty` to give `c.y`,
 * `a.z` and `b.z` are interpolated based on `tz` to give `c.z`,
 * `a.w` and `b.w` are interpolated based on `tw` to give `c.w`.
 *
 * The result will be equal to `a` when `tx`, `ty`, `tz` and `tw` are all `0.0`,
 * equal to `b` when `tx`, `ty`, `tz` and `tw` are all `1.0`,
 * and halfway between `a` and `b` when `tx`, `ty`, `tz` and `tw` are all `0.5`
 *
 * @param a - the start x, y and z values - a 4-element vector object
 * @param b - the end x, y and z values - a 4-element vector object
 * @param tx - a floating point number in the interval `[0.0, 1.0]`
 * @param ty - a floating point number in the interval `[0.0, 1.0]`
 * @param tz - a floating point number in the interval `[0.0, 1.0]`
 * @param tw - a floating point number in the interval `[0.0, 1.0]`
 * @param c - a 4-element vector in which to store the result
 * @returns `c` - the interpolation result
 */
export const lerpE = (a: Vec4, b: Vec4, tx: number, ty: number, tz: number, tw: number, c: Vec4): Vec4 => set(
    c,
    slerp(a.x, b.x, tx),
    slerp(a.y, b.y, ty),
    slerp(a.z, b.z, tz),
    slerp(a.w, b.w, tw)
);

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
 * @param a1 - the first start value - a 4-element vector object
 * @param b1 - the first end value - a 4-element vector object
 * @param a2 - the second start value - a 4-element vector object
 * @param b2 - the second end value - a 4-element vector object
 * @param s - a floating point number in the interval `[0.0, 1.0]`
 * @param t - a floating point number in the interval `[0.0, 1.0]`
 * @param c - a 4-element vector in which to store the result
 * @param tmp - an optional 4-element vector for temporary storage.
 *              If not provided, one will be created (and then discarded) internally
 * @returns `c` - the interpolation result
 */
export const lerp2 = (a1: Vec4, b1: Vec4, a2: Vec4, b2: Vec4, s: number, t: number, c: Vec4, tmp?: Vec4): Vec4 => (
    lerp(lerp(a1, b1, s, c), lerp(a2, b2, s, tmp ?? zero()), t, c)
);

/**
 * Checks if the vectors `a` and `b` are equal
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @returns `true` if `a` and `b` are equal, `false` otherwise
 */
export const equals = (a: Vec4, b: Vec4): boolean => a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;

/**
 * Generates a (single-line) string representation of the 4-element vector `a`
 *
 * @param a - a 4-element vector object
 * @returns a string representation of `a`
 */
export const toString = (a: Vec4): string => `[ ${pad(a.x)} ${pad(a.y)} ${pad(a.z)} ${pad(a.w)} ]`;
