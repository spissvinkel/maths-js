import Maths from './maths';

/**
 * `Vec3` is an interface for 3-element vector objects, and a collection of functions to operate on them.
 *
 * The primary use for a `Vec3` object is in 3D geometry, as homogeneous coordinates in 2D geometry, or to represent
 * e.g. RGB colours.
 */
interface Vec3 {
  /** The first element  */ x: number;
  /** The second element */ y: number;
  /** The third element  */ z: number;
}

namespace Vec3 {

  /** @ignore @private */
  const pad = Maths.fpad;

  /**
   * Creates a new 3-element vector object initialized with the given values
   *
   * @param x - the first element
   * @param y - the second element
   * @param z - the third element
   * @returns the new 3-element vector object
   */
  export const of: (x: number, y: number, z: number) => Vec3 = (x, y, z) => ({ x, y, z } as Vec3);

  /**
   * Creates a new copy of the 3-element vector `b`
   *
   * @param b - a 3-element vector object
   * @returns the new 3-element vector object
   */
  export const ofV: (b: Vec3) => Vec3 = b => setV({ } as Vec3, b);

  /**
   * Creates a new 3-element vector object with all elements set to zero
   *
   * @returns the new 3-element vector object
   */
  export const zero: () => Vec3 = () => setZero({ } as Vec3);

  /**
   * Creates a new 3-element vector object with all elements set to one
   *
   * @returns the new 3-element vector object
   */
  export const one: () => Vec3 = () => setOne({ } as Vec3);

  /**
   * Creates a new 3D unit vector along the x-axis
   *
   * @returns the new 3D unit vector
   */
  export const unitX: () => Vec3 = () => setUnitX({ } as Vec3);

  /**
   * Creates a new 3D unit vector along the y-axis
   *
   * @returns the new 3D unit vector
   */
  export const unitY: () => Vec3 = () => setUnitY({ } as Vec3);

  /**
   * Creates a new 3D unit vector along the z-axis
   *
   * @returns the new 3D unit vector
   */
  export const unitZ: () => Vec3 = () => setUnitZ({ } as Vec3);

  /**
   * Sets all elements of the 3-element vector `a` to zero
   *
   * @param a - a 3-element vector object
   * @returns `a` with all elements set to zero
   */
  export const setZero: (a: Vec3) => Vec3 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  return a; };

  /**
   * Sets all elements of the 3-element vector `a` to one
   *
   * @param a - a 3-element vector object
   * @returns `a` with all elements set to one
   */
  export const setOne: (a: Vec3) => Vec3 = a => { a.x = 1.0;  a.y = 1.0;  a.z = 1.0;  return a; };

  /**
   * Sets the elements of the 3D vector `a` so it becomes a unit vector along the x-axis
   *
   * @param a - a 3-element vector object
   * @returns `a` set to be a unit vector along the x-axis
   */
  export const setUnitX: (a: Vec3) => Vec3 = a => { a.x = 1.0;  a.y = 0.0;  a.z = 0.0;  return a; };

  /**
   * Sets the elements of the 3D vector `a` so it becomes a unit vector along the y-axis
   *
   * @param a - a 3-element vector object
   * @returns `a` set to be a unit vector along the y-axis
   */
  export const setUnitY: (a: Vec3) => Vec3 = a => { a.x = 0.0;  a.y = 1.0;  a.z = 0.0;  return a; };

  /**
   * Sets the elements of the 3D vector `a` so it becomes a unit vector along the z-axis
   *
   * @param a - a 3-element vector object
   * @returns `a` set to be a unit vector along the z-axis
   */
  export const setUnitZ: (a: Vec3) => Vec3 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 1.0;  return a; };

  /**
   * Copies the 3-element vector `b` into the 3-element vector `a`
   *
   * @param a - a 3-element vector object
   * @param b - a 3-element vector object
   * @returns `a` set to be a copy of `b`
   */
  export const setV: (a: Vec3, b: Vec3) => Vec3 = (a, b) => { a.x = b.x;  a.y = b.y;  a.z = b.z;  return a; };

  /**
   * Sets the elements of the 3-element vector `a` to the given values
   *
   * @param a - a 3-element vector object
   * @param x - the first element
   * @param y - the second element
   * @param z - the third element
   * @returns `a` with elements set to the given values
   */
  export const set: (a: Vec3, x: number, y: number, z: number) => Vec3
  = (a, x, y, z) => { a.x = x;  a.y = y;  a.z = z;  return a; };

  /**
   * `a = a + b`
   *
   * Adds the 3-element vector `b` to the 3-element vector `a` and stores the result in `a`
   *
   * @param a - a 3-element vector object
   * @param b - a 3-element vector object
   * @returns `a` as the result of `a + b`
   */
  export const addV: (a: Vec3, b: Vec3) => Vec3 = (a, b) => { a.x += b.x;  a.y += b.y;  a.z += b.z;  return a; };

  /**
   * `a = a - b`
   *
   * Subtracts the 3-element vector `b` from the 3-element vector `a` and stores the result in `a`
   *
   * @param a - a 3-element vector object
   * @param b - a 3-element vector object
   * @returns `a` as the result of `a - b`
   */
  export const subV: (a: Vec3, b: Vec3) => Vec3 = (a, b) => { a.x -= b.x;  a.y -= b.y;  a.z -= b.z;  return a; };

  /**
   * `a = a + b * s`
   *
   * Adds the 3-element vector `b` multiplied by the scalar `s` to the 3-element vector `a` and stores the result in `a`
   *
   * @param a - a 3-element vector object
   * @param b - a 3-element vector object
   * @param s - a scalar value
   * @returns `a` as the result of `a + b * s`
   */
  export const addMul: (a: Vec3, b: Vec3, s: number) => Vec3
  = (a, b, s) => { a.x += b.x * s;  a.y += b.y * s;  a.z += b.z * s;  return a; };

  /**
   * `a = a * b`
   *
   * Element-wise multiplication of the 3-element vector `a` by the 3-element vector `b`, with the result stored in `a`
   *
   * @param a - a 3-element vector object
   * @param b - a 3-element vector object
   * @returns `a` as the result of the multiplication
   */
  export const mulV: (a: Vec3, b: Vec3) => Vec3 = (a, b) => { a.x *= b.x;  a.y *= b.y;  a.z *= b.z;  return a; };

  /**
   * `a = a * s`
   *
   * Multiplies the 3-element vector `a` by the scalar `s` and stores the result in `a`
   *
   * @param a - a 3-element vector object
   * @param s - a scalar value
   * @returns `a` as the result of `a * s`
   */
  export const mul: (a: Vec3, s: number) => Vec3 = (a, s) => { a.x *= s;  a.y *= s;  a.z *= s;  return a; };

  /**
   * `a = -a`
   *
   * Calculates the inverse of the 3-element vector `a` and stores the result in `a`
   *
   * @param a - a 3-element vector object
   * @returns `a` as its inverse
   */
  export const inv: (a: Vec3) => Vec3 = a => { a.x = -a.x;  a.y = -a.y;  a.z = -a.z;  return a; };

  /**
   * Calculates the square of the magnitude of the 3-element vector `a`
   *
   * (This is cheaper than calculating the actual magnitude and is useful e.g. when comparing two vectors)
   *
   * @param a - a 3-element vector object
   * @returns `|a|²`
   */
  export const sqrMag: (a: Vec3) => number = a => a.x * a.x  +  a.y * a.y  +  a.z * a.z;

  /**
   * Calculates the magnitude of the 3-element vector `a`
   *
   * (See also [[sqrMag]])
   *
   * @param a - a 3-element vector object
   * @returns `|a|`
   */
  export const mag: (a: Vec3) => number = a => Math.sqrt(sqrMag(a));

  /**
   * `a = â`
   *
   * Normalises the 3-element vector `a` and stores the result in `a`
   *
   * @param a - a 3-element vector object
   * @returns `a` normalised
   */
  export const norm: (a: Vec3) => Vec3   = a => normTo(a, mag(a));

  /**
   * Normalises the 3-element vector `a` based on the given magnitude `mag`, and stores the result in `a`
   *
   * @param a - a 3-element vector object
   * @param mag - the magnitude
   * @returns `a` normalised (based on `mag`)
   */
  export const normTo: (a: Vec3, mag: number) => Vec3 = (a, mag) => mag > 0.0 ? mul(a, 1.0 / mag) : a;

  /**
   * `a · b`
   *
   * Calculates the dot product of the 3-element vectors `a` and `b`
   *
   * @param a - a 3-element vector object
   * @param b - a 3-element vector object
   * @returns the dot product of `a` and `b`
   */
  export const dot: (a: Vec3, b: Vec3) => number = (a, b) => a.x * b.x  +  a.y * b.y  +  a.z * b.z;

  /**
   * `c = a × b`
   *
   * Calculates the cross product of the 3-element vectors `a` and `b`, and stores the result in the 3-element
   * vector `c`
   *
   * @param a - a 3-element vector object
   * @param b - a 3-element vector object
   * @param c - a 3-element vector in which to store the result
   * @returns `c` as the cross product of `a` and `b`
   */
  export const cross: (a: Vec3, b: Vec3, c: Vec3) => Vec3 = (a, b, c) => {
    c.x = a.y * b.z - a.z * b.y;  c.y = a.z * b.x - a.x * b.z;  c.z = a.x * b.y - a.y * b.x;
    return c;
  };

  /**
   * Element-wise clamping of the values of the 3-element vector `a` so that they are not less than the values of the
   * 3-element vector `min` and not greater than the values of the 3-element vector `max`.
   * The result is stored in `a`
   *
   * @param a - a 3-element vector object
   * @param min - a 3-element vector specifying the minimum values
   * @param max - a 3-element vector specifying the maximum values
   * @returns `a` clamped to `[min, max]`
   */
  export const clampV: (a: Vec3, min: Vec3, max: Vec3) => Vec3 = (a, min, max) => {
    a.x = a.x < min.x ? min.x : (a.x > max.x ? max.x : a.x);
    a.y = a.y < min.y ? min.y : (a.y > max.y ? max.y : a.y);
    a.z = a.z < min.z ? min.z : (a.z > max.z ? max.z : a.z);
    return a;
  };

  /**
   * Clamps the values of the 3-element vector `a` so that they are not less than `min` and not greater than `max`,
   * and stores the result in `a`
   *
   * @param a - a 3-element vector object
   * @param min - the minimum value allowed
   * @param max - the maximum value allowed
   * @returns `a` clamped to `[min, max]`
   */
  export const clamp: (a: Vec3, min: number, max: number) => Vec3 = (a, min, max) => {
    a.x = a.x < min ? min : (a.x > max ? max : a.x);
    a.y = a.y < min ? min : (a.y > max ? max : a.y);
    a.z = a.z < min ? min : (a.z > max ? max : a.z);
    return a;
  };

  /**
   * Clamps the values of the 3-element vector `a` so that they are not less than `0.0` and not greater than `1.0`,
   * and stores the result in `a`
   *
   * @param a - a 3-element vector object
   * @returns `a` clamped to `[0.0, 1.0]`
   */
  export const clamp01: (a: Vec3) => Vec3 = a => clamp(a, 0.0, 1.0);

  /**
   * Generates a (single-line) string representation of the 3-element vector `a`
   *
   * @param a - a 3-element vector object
   * @returns a string representation of `a`
   */
  export const toString: (a: Vec3) => string = a => `[ ${pad(a.x)} ${pad(a.y)} ${pad(a.z)} ]`;
}

export default Vec3;
