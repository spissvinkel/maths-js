/**
 * `vec4` is a collection of functions to manipulate [[Vec4]] 4-element vector objects.
 *
 * The primary use for a [[Vec4]] object is as homogeneous coordinates in 3D geometry, or to represent e.g.
 * RGBA colours.
 */

/** Import statements (dummy comment to satisfy TypeDoc generator) */
import { Vec3, Vec4 } from './';
import { fpad as pad } from './maths';

/**
 * Creates a new 4-element vector object initialized with the given values
 *
 * @param x - the first element
 * @param y - the second element
 * @param z - the third element
 * @param w - the fourth element
 * @returns the new 4-element vector object
 */
export const of: (x: number, y: number, z: number, w: number) => Vec4 = (x, y, z, w) => ({ x, y, z, w } as Vec4);

/**
 * Creates a new copy of the 4-element vector `b`
 *
 * @param b - a 4-element vector object
 * @returns the new 4-element vector object
 */
export const ofV: (b: Vec4) => Vec4 = b => setV({ } as Vec4, b);

/**
 * Creates a new 4-element vector object initialized to the values of the 3-element vector `b` and the value `w`
 *
 * @param b - a 3-element vector object
 * @param w - the fourth element
 * @returns the new 4-element vector object
 */
export const ofV3: (b: Vec3, w: number) => Vec4 = (b, w) => of(b.x, b.y, b.z, w);

/**
 * Creates a new 4-element vector object with all elements set to zero
 *
 * @returns the new 4-element vector object
 */
export const zero: () => Vec4 = () => setZero({ } as Vec4);

/**
 * Creates a new 4-element vector object with all elements set to one
 *
 * @returns the new 4-element vector object
 */
export const one: () => Vec4 = () => setOne({ } as Vec4);

/**
 * Creates a new 4D unit vector along the x-axis
 *
 * @returns the new 4D unit vector
 */
export const unitX: () => Vec4 = () => setUnitX({ } as Vec4);

/**
 * Creates a new 4D unit vector along the y-axis
 *
 * @returns the new 4D unit vector
 */
export const unitY: () => Vec4 = () => setUnitY({ } as Vec4);

/**
 * Creates a new 4D unit vector along the z-axis
 *
 * @returns the new 4D unit vector
 */
export const unitZ: () => Vec4 = () => setUnitZ({ } as Vec4);

/**
 * Creates a new 4D unit vector along the w-axis
 *
 * @returns the new 4D unit vector
 */
export const unitW: () => Vec4 = () => setUnitW({ } as Vec4);

/**
 * Sets all elements of the 4-element vector `a` to zero
 *
 * @param a - a 4-element vector object
 * @returns `a` with all elements set to zero
 */
export const setZero: (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  a.w = 0.0;  return a; };

/**
 * Sets all elements of the 4-element vector `a` to one
 *
 * @param a - a 4-element vector object
 * @returns `a` with all elements set to one
 */
export const setOne: (a: Vec4) => Vec4 = a => { a.x = 1.0;  a.y = 1.0;  a.z = 1.0;  a.w = 1.0;  return a; };

/**
 * Sets the elements of the 4D vector `a` so it becomes a unit vector along the x-axis
 *
 * @param a - a 4-element vector object
 * @returns `a` set to be a unit vector along the x-axis
 */
export const setUnitX: (a: Vec4) => Vec4 = a => { a.x = 1.0;  a.y = 0.0;  a.z = 0.0;  a.w = 0.0;  return a; };

/**
 * Sets the elements of the 4D vector `a` so it becomes a unit vector along the y-axis
 *
 * @param a - a 4-element vector object
 * @returns `a` set to be a unit vector along the y-axis
 */
export const setUnitY: (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 1.0;  a.z = 0.0;  a.w = 0.0;  return a; };

/**
 * Sets the elements of the 4D vector `a` so it becomes a unit vector along the z-axis
 *
 * @param a - a 4-element vector object
 * @returns `a` set to be a unit vector along the z-axis
 */
export const setUnitZ: (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 1.0;  a.w = 0.0;  return a; };

/**
 * Sets the elements of the 4D vector `a` so it becomes a unit vector along the w-axis
 *
 * @param a - a 4-element vector object
 * @returns `a` set to be a unit vector along the w-axis
 */
export const setUnitW: (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  a.w = 1.0;  return a; };

/**
 * Copies the 4-element vector `b` into the 4-element vector `a`
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @returns `a` set to be a copy of `b`
 */
export const setV: (a: Vec4, b: Vec4) => Vec4
= (a, b) => { a.x = b.x;  a.y = b.y;  a.z = b.z;  a.w = b.w;  return a; };

/**
 * Copies the 3-element vector `b` and the value `w` into the 4-element vector `a`
 *
 * @param a - a 4-element vector object
 * @param b - a 3-element vector object
 * @param w - the fourth element
 * @returns `a` with its first three elements set to be a copy of `b` and the fourth set to `w`
 */
export const setV3: (a: Vec4, b: Vec3, w: number) => Vec4
= (a, b, w) => { a.x = b.x;  a.y = b.y;  a.z = b.z;  a.w = w;  return a; };

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
export const set: (a: Vec4, x: number, y: number, z: number, w: number) => Vec4
= (a, x, y, z, w) => { a.x = x;  a.y = y;  a.z = z;  a.w = w;  return a; };

/**
 * Checks if the vectors `a` and `b` are equal
 *
 * @param a - a 4-element vector object
 * @param b - a 4-element vector object
 * @returns `true` if `a` and `b` are equal, `false` otherwise
 */
export const equals: (a: Vec4, b: Vec4) => boolean = (a, b) => {
  return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
};

/**
 * Generates a (single-line) string representation of the 4-element vector `a`
 *
 * @param a - a 4-element vector object
 * @returns a string representation of `a`
 */
export const toString: (a: Vec4) => string = a => `[ ${pad(a.x)} ${pad(a.y)} ${pad(a.z)} ${pad(a.w)} ]`;
