/**
 * `mat3` is a collection of functions to manipulate [[Mat3]] 3x3 matrix objects.
 *
 * The primary use for a [[Mat3]] object is as a 2D transformation matrix or a 3D rotation matrix.
 *
 * A "column-major" ordering and a "right-handed" coordinate system is assumed, suitable for e.g. WebGL
 */

/** Import statements (dummy comment to satisfy TypeDoc generator) */
import { Mat2, Mat3, Vec2, Vec3 } from './';
import { fpad as pad, FloatArray } from './maths';
import * as vec3 from './vec3';

/**
 * Creates a new 3x3 matrix object initialized with the given values
 *
 * @param r0c0 - the value at row 0, column 0
 * @param r0c1 - the value at row 0, column 1
 * @param r0c2 - the value at row 0, column 2
 * @param r1c0 - the value at row 1, column 0
 * @param r1c1 - the value at row 1, column 1
 * @param r1c2 - the value at row 1, column 2
 * @param r2c0 - the value at row 2, column 0
 * @param r2c1 - the value at row 2, column 1
 * @param r2c2 - the value at row 2, column 2
 * @returns the new 3x3 matrix object
 */
export const of: (r0c0: number, r0c1: number, r0c2: number,
                  r1c0: number, r1c1: number, r1c2: number,
                  r2c0: number, r2c1: number, r2c2: number) => Mat3
= (r0c0, r0c1, r0c2, r1c0, r1c1, r1c2, r2c0, r2c1, r2c2) => ({
  r0c0, r0c1, r0c2,
  r1c0, r1c1, r1c2,
  r2c0, r2c1, r2c2
} as Mat3);

/**
 * Creates a new 3x3 matrix object with all elements set to zero
 *
 * @returns the new 3x3 matrix object
 */
export const zero: () => Mat3 = () => setZero({ } as Mat3);

/**
 * Creates a new 3x3 identity matrix
 *
 * @returns the new 3x3 matrix object
 */
export const id: () => Mat3 = () => setId({ } as Mat3);

/**
 * Sets all elements of the 3x3 matrix `m` to zero
 *
 * @param m - a 3x3 matrix object
 * @returns `m` with all elements set to zero
 */
export const setZero: (m: Mat3) => Mat3 = m => {
  m.r0c0 = 0.0;  m.r0c1 = 0.0;  m.r0c2 = 0.0;
  m.r1c0 = 0.0;  m.r1c1 = 0.0;  m.r1c2 = 0.0;
  m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 0.0;
  return m;
};

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes the identity matrix
 *
 * @param m - a 3x3 matrix object
 * @returns `m` set to be the identity matrix
 */
export const setId: (m: Mat3) => Mat3 = m => {
  m.r0c0 = 1.0;  m.r0c1 = 0.0;  m.r0c2 = 0.0;
  m.r1c0 = 0.0;  m.r1c1 = 1.0;  m.r1c2 = 0.0;
  m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;
  return m;
};

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points in the yz-plane around the x-axis when multiplied by a column vector
 * (see [[mulV]]).
 *
 * The direction of rotation will be **counterclockwise** for positive values of `r` when the axis points towards
 * the observer
 *
 * @param m - a 3x3 matrix object
 * @param r - the rotation as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotX: (m: Mat3, r: number) => Mat3 = (m, r) => {
  const c = Math.cos(r), s = Math.sin(r);
  m.r0c0 =  1;   m.r0c1 =  0;   m.r0c2 =  0;
  m.r1c0 =  0;   m.r1c1 =  c;   m.r1c2 = -s;
  m.r2c0 =  0;   m.r2c1 =  s;   m.r2c2 =  c;
  return m;
};

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points in the xz-plane around the y-axis when multiplied by a column vector
 * (see [[mulV]]).
 *
 * The direction of rotation will be **counterclockwise** for positive values of `r` when the axis points towards
 * the observer
 *
 * @param m - a 3x3 matrix object
 * @param r - the rotation as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotY: (m: Mat3, r: number) => Mat3 = (m, r) => {
  const c = Math.cos(r), s = Math.sin(r);
  m.r0c0 =  c;   m.r0c1 =  0;   m.r0c2 =  s;
  m.r1c0 =  0;   m.r1c1 =  1;   m.r1c2 =  0;
  m.r2c0 = -s;   m.r2c1 =  0;   m.r2c2 =  c;
  return m;
};

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points in the xy-plane around the z-axis when multiplied by a column vector
 * (see [[mulV]]).
 *
 * The direction of rotation will be **counterclockwise** for positive values of `r` when the axis points towards
 * the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 3x3 matrix object
 * @param r - the rotation as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotZ: (m: Mat3, r: number) => Mat3 = (m, r) => {
  const c = Math.cos(r), s = Math.sin(r);
  m.r0c0 =  c;   m.r0c1 = -s;   m.r0c2 =  0;
  m.r1c0 =  s;   m.r1c1 =  c;   m.r1c2 =  0;
  m.r2c0 =  0;   m.r2c1 =  0;   m.r2c2 =  1;
  return m;
};

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the x-, y- and z-axes when multiplied by a column vector
 * (see [[mulV]]).
 *
 * For each axis, the direction of rotation will be **counterclockwise** for positive values of `r` when the axis
 * points towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 3x3 matrix object
 * @param rx - the rotation around the x axis as an angle in radians
 * @param ry - the rotation around the y axis as an angle in radians
 * @param rz - the rotation around the z axis as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRot: (m: Mat3, rx: number, ry: number, rz: number) => Mat3 = (m, rx, ry, rz) => {
  const cx = Math.cos(rx), cy = Math.cos(ry), cz = Math.cos(rz);
  const sx = Math.sin(rx), sy = Math.sin(ry), sz = Math.sin(rz);
  m.r0c0 =  cy*cz;              m.r0c1 = -sz*cy;              m.r0c2 =  sy;
  m.r1c0 =  sx*sy*cz + cx*sz;   m.r1c1 =  cx*cz - sz*sx*sy;   m.r1c2 = -sx*cy;
  m.r2c0 =  sx*sz - sy*cx*cz;   m.r2c1 =  sy*cx*sz + sx*cz;   m.r2c2 =  cx*cy;
  return m;
};

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the x-, y- and z-axes when multiplied by a column vector
 * (see [[mulV]]).
 *
 * For each axis, the direction of rotation will be **counterclockwise** for positive rotation values when the axis
 * points towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 3x3 matrix object
 * @param a - a 3-element vector containing x-, y- and z-axis rotations as angles in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotV: (m: Mat3, a: Vec3) => Mat3 = (m, a) => setRot(m, a.x, a.y, a.z);

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the x-, y- and z-axes when multiplied by a column vector
 * (see [[mulV]]).
 *
 * For each axis, the direction of rotation will be **clockwise** for positive rotation values when the axis points
 * towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 3x3 matrix object
 * @param a - a 3-element vector containing (inverse) x-, y- and z-axis rotations as angles in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setInvRotV: (m: Mat3, a: Vec3) => Mat3 = (m, a) => setRot(m, -a.x, -a.y, -a.z);

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 2D scaling matrix.
 *
 * Multiplying the resulting matrix by a column vector will scale the given vector by `a` (see [[mulV]])
 *
 * @param m - a 3x3 matrix object
 * @param a - a 2-element vector specifying the scaling factors
 * @returns `m` set to be a 2D scaling matrix
 */
export const setScaleV: (m: Mat3, a: Vec2) => Mat3 = (m, a) => {
  m.r0c0 = a.x;  m.r0c1 = 0.0;  m.r0c2 = 0.0;
  m.r1c0 = 0.0;  m.r1c1 = a.y;  m.r1c2 = 0.0;
  m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;
  return m;
};

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 2D translation matrix.
 *
 * Multiplying the resulting matrix by a column vector will translate the given vector by `[ tx ty ]` (see [[mulV]])
 *
 * @param m - a 3x3 matrix object
 * @param tx - the amount of translation along the x-axis
 * @param ty - the amount of translation along the y-axis
 * @returns `m` set to be a 2D translation matrix
 */
export const setTrsl: (m: Mat3, tx: number, ty: number) => Mat3 = (m, tx, ty) => {
  m.r0c0 = 1.0;  m.r0c1 = 0.0;  m.r0c2 = tx;
  m.r1c0 = 0.0;  m.r1c1 = 1.0;  m.r1c2 = ty;
  m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;
  return m;
};

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 2D translation matrix.
 *
 * Multiplying the resulting matrix by a column vector will translate the given vector by `a` (see [[mulV]])
 *
 * @param m - a 3x3 matrix object
 * @param a - a 2-element vector specifying the amount of translation
 * @returns `m` set to be a 2D translation matrix
 */
export const setTrslV: (m: Mat3, a: Vec2) => Mat3 = (m, a) => setTrsl(m, a.x, a.y);

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 2D translation matrix.
 *
 * Multiplying the resulting matrix by a column vector will translate the given vector by the inverse of `a`
 * (see [[mulV]])
 *
 * @param m - a 3x3 matrix object
 * @param a - a 2-element vector specifying the (inverse) amount of translation
 * @returns `m` set to be a 2D translation matrix
 */
export const setInvTrslV: (m: Mat3, a: Vec2) => Mat3 = (m, a) => setTrsl(m, -a.x, -a.y);

/**
 * Sets the elements of the 3x3 matrix `m` so it becomes a 2D transformation matrix for scaling and translation.
 *
 * Multiplying the resulting matrix by a column vector will scale the given vector by `a` and translate it by `b`
 * (see [[mulV]])
 *
 * @param m - a 3x3 matrix object
 * @param a - a 2-element vector specifying the scaling factors
 * @param b - a 2-element vector specifying the amount of translation
 * @returns `m` set to be a 2D transformation matrix
 */
export const setScaleTrsl: (m: Mat3, a: Vec2, b: Vec2) => Mat3 = (m, a, b) => {
  m.r0c0 = a.x;  m.r0c1 = 0.0;  m.r0c2 = b.x;
  m.r1c0 = 0.0;  m.r1c1 = a.y;  m.r1c2 = b.y;
  m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;
  return m;
};

/**
 * Copies the 3x3 matrix `n` into the 3x3 matrix `m`
 *
 * @param m - a 3x3 matrix object
 * @param n - a 3x3 matrix object
 * @returns `m` set to be a copy of `n`
 */
export const setM: (m: Mat3, n: Mat3) => Mat3 = (m, n) => {
  m.r0c0 = n.r0c0;  m.r0c1 = n.r0c1;  m.r0c2 = n.r0c2;
  m.r1c0 = n.r1c0;  m.r1c1 = n.r1c1;  m.r1c2 = n.r1c2;
  m.r2c0 = n.r2c0;  m.r2c1 = n.r2c1;  m.r2c2 = n.r2c2;
  return m;
};

/**
 * Sets the elements of the 3x3 matrix `m` to the given values
 *
 * @param m - a 3x3 matrix object
 * @param r0c0 - the value at row 0, column 0
 * @param r0c1 - the value at row 0, column 1
 * @param r0c2 - the value at row 0, column 2
 * @param r1c0 - the value at row 1, column 0
 * @param r1c1 - the value at row 1, column 1
 * @param r1c2 - the value at row 1, column 2
 * @param r2c0 - the value at row 2, column 0
 * @param r2c1 - the value at row 2, column 1
 * @param r2c2 - the value at row 2, column 2
 * @returns `m` with elements set to the given values
 */
export const set: (m: Mat3,
                    r0c0: number, r0c1: number, r0c2: number,
                    r1c0: number, r1c1: number, r1c2: number,
                    r2c0: number, r2c1: number, r2c2: number) => Mat3
= (m, r0c0, r0c1, r0c2, r1c0, r1c1, r1c2, r2c0, r2c1, r2c2) => {
  m.r0c0 = r0c0;  m.r0c1 = r0c1;  m.r0c2 = r0c2;
  m.r1c0 = r1c0;  m.r1c1 = r1c1;  m.r1c2 = r1c2;
  m.r2c0 = r2c0;  m.r2c1 = r2c1;  m.r2c2 = r2c2;
  return m;
};

/**
 * `m = m * n`
 *
 * Multiplies the 3x3 matrix `m` by the 3x3 matrix `n` and stores the result in `m`
 *
 * @param m - a 3x3 matrix object
 * @param n - a 3x3 matrix object
 * @returns `m`, multiplied by `n`
 */
export const mulM: (m: Mat3, n: Mat3) => Mat3 = (m, n) => {
  let c0, c1, c2;
  c0 = m.r0c0 * n.r0c0  +  m.r0c1 * n.r1c0  +  m.r0c2 * n.r2c0;
  c1 = m.r0c0 * n.r0c1  +  m.r0c1 * n.r1c1  +  m.r0c2 * n.r2c1;
  c2 = m.r0c0 * n.r0c2  +  m.r0c1 * n.r1c2  +  m.r0c2 * n.r2c2;
  m.r0c0 = c0;  m.r0c1 = c1;  m.r0c2 = c2;
  c0 = m.r1c0 * n.r0c0  +  m.r1c1 * n.r1c0  +  m.r1c2 * n.r2c0;
  c1 = m.r1c0 * n.r0c1  +  m.r1c1 * n.r1c1  +  m.r1c2 * n.r2c1;
  c2 = m.r1c0 * n.r0c2  +  m.r1c1 * n.r1c2  +  m.r1c2 * n.r2c2;
  m.r1c0 = c0;  m.r1c1 = c1;  m.r1c2 = c2;
  c0 = m.r2c0 * n.r0c0  +  m.r2c1 * n.r1c0  +  m.r2c2 * n.r2c0;
  c1 = m.r2c0 * n.r0c1  +  m.r2c1 * n.r1c1  +  m.r2c2 * n.r2c1;
  c2 = m.r2c0 * n.r0c2  +  m.r2c1 * n.r1c2  +  m.r2c2 * n.r2c2;
  m.r2c0 = c0;  m.r2c1 = c1;  m.r2c2 = c2;
  return m;
};

/**
 * `m = m * n`
 *
 * Multiplies the 3x3 matrix `m` by the 2x2 matrix `n` and stores the result in `m`.
 *
 * This is a convenience function where `m` is assumed to be a 2D transformation matrix and `n` a 2D rotation matrix
 *
 * @param m - a 3x3 matrix object
 * @param n - a 2x2 matrix object
 * @returns `m`, multiplied by `n`
 */
export const mulM2: (m: Mat3, n: Mat2) => Mat3 = (m, n) => {
  let c0, c1;
  c0 = m.r0c0 * n.r0c0  +  m.r0c1 * n.r1c0;
  c1 = m.r0c0 * n.r0c1  +  m.r0c1 * n.r1c1;
  m.r0c0 = c0;  m.r0c1 = c1;
  c0 = m.r1c0 * n.r0c0  +  m.r1c1 * n.r1c0;
  c1 = m.r1c0 * n.r0c1  +  m.r1c1 * n.r1c1;
  m.r1c0 = c0;  m.r1c1 = c1;
  c0 = m.r2c0 * n.r0c0  +  m.r2c1 * n.r1c0;
  c1 = m.r2c0 * n.r0c1  +  m.r2c1 * n.r1c1;
  m.r2c0 = c0;  m.r2c1 = c1;
  return m;
};

/**
 * `b = m * a`
 *
 * Multiplies the 3x3 matrix `m` by the 3-element column vector `a` and stores the result in the 3-element vector `b`
 *
 * The vector `a` can be updated directly by invoking `mulV(m, a, a)`
 *
 * @param m - the 3x3 matrix multiplication operand
 * @param a - the 3-element vector multiplication operand
 * @param b - a 3-element vector in which to store the result
 * @returns `b` as the result of `m * a`
 */
export const mulV: (m: Mat3, a: Vec3, b: Vec3) => Vec3 = (m, a, b) => vec3.set(
  b,
  m.r0c0 * a.x  +  m.r0c1 * a.y  +  m.r0c2 * a.z,
  m.r1c0 * a.x  +  m.r1c1 * a.y  +  m.r1c2 * a.z,
  m.r2c0 * a.x  +  m.r2c1 * a.y  +  m.r2c2 * a.z
);

/**
 * Fills `buffer` with the elements of the 3x3 matrix `m`, column by column
 * (i.e. [ r0c0, r1c0, r2c0, r0c1, ..., r2c2 ]).
 *
 * The order in which the buffer is filled is suitable for e.g. setting uniform variables in WebGL shader programs
 *
 * **Type parameters**
 *
 * * **B**: *[[FloatArray]]*
 *
 *    the type of the buffer; an array of numbers or (more typically) a `Float32Array`
 *
 * @param m - the 3x3 matrix
 * @param buffer - the buffer to be filled
 * @return `buffer`, filled with the elemenets of `m`
 */
export const fill: <B extends FloatArray>(m: Mat3, buffer: B) => B = (m, buffer) => {
  buffer[0] = m.r0c0;  buffer[1] = m.r1c0;  buffer[2] = m.r2c0;
  buffer[3] = m.r0c1;  buffer[4] = m.r1c1;  buffer[5] = m.r2c1;
  buffer[6] = m.r0c2;  buffer[7] = m.r1c2;  buffer[8] = m.r2c2;
  return buffer;
};

/**
 * Generates a multi-line string representation of the 3x3 matrix `m`
 *
 * @param m - a 3x3 matrix object
 * @returns a string representation of `m`
 */
export const toString: (m: Mat3) => string
= m => `[ ${pad(m.r0c0)} ${pad(m.r0c1)} ${pad(m.r0c2)}\n`
      + `  ${pad(m.r1c0)} ${pad(m.r1c1)} ${pad(m.r1c2)}\n`
      + `  ${pad(m.r2c0)} ${pad(m.r2c1)} ${pad(m.r2c2)} ]`;
