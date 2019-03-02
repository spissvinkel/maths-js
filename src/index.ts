/**
 * A collection of interfaces for vector and matrix objects.
 *
 * Functions to manipulate objects conforming to these interfaces can be found in the corresponding modules
 * [mat2](_mat2_.html), [mat3](_mat3_.html), [mat4](_mat4_.html), [vec2](_vec2_.html), [vec3](_vec3_.html) and
 * [vec4](_vec4_.html)
 */

/**
 * `Mat2` is an interface for 2x2 matrix objects.
 *
 * The primary use for a `Mat2` object is as a 2D rotation matrix.
 *
 * A "column-major" ordering is assumed, suitable for e.g. WebGL
 */
export interface Mat2 {
  /** The value at row 0, column 0 */ r0c0: number,
  /** The value at row 0, column 1 */ r0c1: number,
  /** The value at row 1, column 0 */ r1c0: number,
  /** The value at row 1, column 1 */ r1c1: number
}

/**
 * `Mat3` is an interface for 3x3 matrix objects.
 *
 * The primary use for a `Mat3` object is as a 2D transformation matrix or a 3D rotation matrix.
 *
 * A "column-major" ordering and a "right-handed" coordinate system is assumed, suitable for e.g. WebGL
 */
export interface Mat3 {
  /** The value at row 0, column 0 */ r0c0: number,
  /** The value at row 0, column 1 */ r0c1: number,
  /** The value at row 0, column 2 */ r0c2: number,
  /** The value at row 1, column 0 */ r1c0: number,
  /** The value at row 1, column 1 */ r1c1: number,
  /** The value at row 1, column 2 */ r1c2: number,
  /** The value at row 2, column 0 */ r2c0: number,
  /** The value at row 2, column 1 */ r2c1: number,
  /** The value at row 2, column 2 */ r2c2: number
}

/**
 * `Mat4` is an interface for 4x4 matrix objects.
 *
 * The primary use for a `Mat4` object is as a 3D transformation matrix.
 *
 * A "column-major" ordering and a "right-handed" coordinate system is assumed, suitable for e.g. WebGL
 */
export interface Mat4 {
  /** The value at row 0, column 0 */ r0c0: number,
  /** The value at row 0, column 1 */ r0c1: number,
  /** The value at row 0, column 2 */ r0c2: number,
  /** The value at row 0, column 3 */ r0c3: number,
  /** The value at row 1, column 0 */ r1c0: number,
  /** The value at row 1, column 1 */ r1c1: number,
  /** The value at row 1, column 2 */ r1c2: number,
  /** The value at row 1, column 3 */ r1c3: number,
  /** The value at row 2, column 0 */ r2c0: number,
  /** The value at row 2, column 1 */ r2c1: number,
  /** The value at row 2, column 2 */ r2c2: number,
  /** The value at row 2, column 3 */ r2c3: number,
  /** The value at row 3, column 0 */ r3c0: number,
  /** The value at row 3, column 1 */ r3c1: number,
  /** The value at row 3, column 2 */ r3c2: number,
  /** The value at row 3, column 3 */ r3c3: number
}

/**
 * `Vec2` is an interface for 2-element vector objects.
 *
 * The primary use for a `Vec2` object is in 2D geometry.
 */
export interface Vec2 {
  /** The first element  */ x: number;
  /** The second element */ y: number;
}

/**
 * `Vec3` is an interface for 3-element vector objects.
 *
 * The primary use for a `Vec3` object is in 3D geometry, as homogeneous coordinates in 2D geometry, or to represent
 * e.g. RGB colours.
 */
export interface Vec3 {
  /** The first element  */ x: number;
  /** The second element */ y: number;
  /** The third element  */ z: number;
}

/**
 * `Vec4` is an interface for 4-element vector objects.
 *
 * The primary use for a `Vec4` object is as homogeneous coordinates in 3D geometry, or to represent e.g. RGBA colours.
 */
export interface Vec4 {
  /** The first element  */ x: number;
  /** The second element */ y: number;
  /** The third element  */ z: number;
  /** The fourth element */ w: number;
}

// /**
//  * @ignore
//  */
// export const dummy: string = '';
