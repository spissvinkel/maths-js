import Maths from './maths';
import Vec2 from './vec2';

/**
 * `Mat2` is an interface for 2x2 matrix objects, and a collection of functions to operate on them.
 *
 * The primary use for a `Mat2` object is as a 2D rotation matrix.
 *
 * A "column-major" ordering is assumed, suitable for e.g. WebGL
 */
interface Mat2 {
  /** The value at row 0, column 0 */ r0c0: number,
  /** The value at row 0, column 1 */ r0c1: number,
  /** The value at row 1, column 0 */ r1c0: number,
  /** The value at row 1, column 1 */ r1c1: number
}

namespace Mat2 {

  /** @ignore @private */
  const pad = Maths.fpad;

  /**
   * Creates a new 2x2 matrix object initialized with the given values
   *
   * @param r0c0 - the value at row 0, column 0
   * @param r0c1 - the value at row 0, column 1
   * @param r1c0 - the value at row 1, column 0
   * @param r1c1 - the value at row 1, column 1
   * @returns the new 2x2 matrix object
   */
  export const of: (r0c0: number, r0c1: number,
                    r1c0: number, r1c1: number) => Mat2
  = (r0c0, r0c1, r1c0, r1c1) => ({
    r0c0, r0c1,
    r1c0, r1c1
  } as Mat2);

  /**
   * Creates a new 2x2 matrix object with all elements set to zero
   *
   * @returns the new 2x2 matrix object
   */
  export const zero: () => Mat2 = () => setZero({ } as Mat2);

  /**
   * Creates a new 2x2 identity matrix
   *
   * @returns the new 2x2 matrix object
   */
  export const id: () => Mat2 = () => setId({ } as Mat2);

  /**
   * Sets all elements of the 2x2 matrix `m` to zero
   *
   * @param m - a 2x2 matrix object
   * @returns `m` with all elements set to zero
   */
  export const setZero: (m: Mat2) => Mat2 = m => {
    m.r0c0 = 0.0;  m.r0c1 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = 0.0;
    return m;
  };

  /**
   * Sets the elements of the 2x2 matrix `m` so it becomes the identity matrix
   *
   * @param m - a 2x2 matrix object
   * @returns `m` set to be the identity matrix
   */
  export const setId: (m: Mat2) => Mat2 = m => {
    m.r0c0 = 1.0;  m.r0c1 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = 1.0;
    return m;
  };

  /**
   * Sets the elements of the 2x2 matrix `m` so it becomes a 2D rotation matrix.
   *
   * The resulting matrix will rotate points in the xy-plane around the origin when multiplied by a column vector
   * (see [[mulV]]).
   *
   * The direction of rotation will be **counterclockwise** for positive values of `r`
   *
   * @param m - a 2x2 matrix object
   * @param r - the rotation as an angle in radians
   * @returns `m` set to be a 2D rotation matrix
   */
  export const setRot: (m: Mat2, r: number) => Mat2 = (m, r) => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  c;   m.r0c1 = -s;
    m.r1c0 =  s;   m.r1c1 =  c;
    return m;
  };

  /**
   * Sets the elements of the 2x2 matrix `m` so it becomes a 2D rotation matrix.
   *
   * The resulting matrix will rotate points in the xy-plane around the origin when multiplied by a column vector
   * (see [[mulV]]).
   *
   * The direction of rotation will be **clockwise** for positive values of `r`
   *
   * @param m - a 2x2 matrix object
   * @param r - the (inverse) rotation as an angle in radians
   * @returns `m` set to be a 2D rotation matrix
   */
  export const setInvRot: (m: Mat2, r: number) => Mat2 = (m, r) => setRot(m, -r);

  /**
   * Copies the 2x2 matrix `n` into the 2x2 matrix `m`
   *
   * @param m - a 2x2 matrix object
   * @param n - a 2x2 matrix object
   * @returns `m` set to be a copy of `n`
   */
  export const setM: (m: Mat2, n: Mat2) => Mat2 = (m, n) => {
    m.r0c0 = n.r0c0;  m.r0c1 = n.r0c1;
    m.r1c0 = n.r1c0;  m.r1c1 = n.r1c1;
    return m;
  };

  /**
   * Sets the elements of the 2x2 matrix `m` to the given values
   *
   * @param m - a 2x2 matrix object
   * @param r0c0 - the value at row 0, column 0
   * @param r0c1 - the value at row 0, column 1
   * @param r1c0 - the value at row 1, column 0
   * @param r1c1 - the value at row 1, column 1
   * @returns `m` with elements set to the given values
   */
  export const set: (m: Mat2,
                     r0c0: number, r0c1: number,
                     r1c0: number, r1c1: number) => Mat2
  = (m, r0c0, r0c1, r1c0, r1c1) => {
    m.r0c0 = r0c0;  m.r0c1 = r0c1;
    m.r1c0 = r1c0;  m.r1c1 = r1c1;
    return m;
  };

  /**
   * `m = m * n`
   *
   * Multiplies the 2x2 matrix `m` by the 2x2 matrix `n` and stores the result in `m`
   *
   * @param m - a 2x2 matrix object
   * @param n - a 2x2 matrix object
   * @returns `m`, multiplied by `n`
   */
  export const mulM: (m: Mat2, n: Mat2) => Mat2 = (m, n) => {
    let c0, c1;
    c0 = m.r0c0 * n.r0c0  +  m.r0c1 * n.r1c0;
    c1 = m.r0c0 * n.r0c1  +  m.r0c1 * n.r1c1;
    m.r0c0 = c0;  m.r0c1 = c1;
    c0 = m.r1c0 * n.r0c0  +  m.r1c1 * n.r1c0;
    c1 = m.r1c0 * n.r0c1  +  m.r1c1 * n.r1c1;
    m.r1c0 = c0;  m.r1c1 = c1;
    return m;
  };

  /**
   * `b = m * a`
   *
   * Multiplies the 2x2 matrix `m` by the 2-element column vector `a` and stores the result in the 2-element vector `b`
   *
   * @param m - the 2x2 matrix multiplication operand
   * @param a - the 2-element vector multiplication operand
   * @param b - a 2-element vector in which to store the result
   * @returns `b` as the result of `m * a`
   */
  export const mulV: (m: Mat2, a: Vec2, b: Vec2) => Vec2 = (m, a, b) => Vec2.set(
    b,
    m.r0c0 * a.x  +  m.r0c1 * a.y,
    m.r1c0 * a.x  +  m.r1c1 * a.y
  );

  /**
   * Fills `buffer` with the elements of the 2x2 matrix `m`, column by column (i.e. [ r0c0, r1c0, r0c1, r1c1 ]).
   *
   * The order in which the buffer is filled is suitable for e.g. setting uniform variables in WebGL shader programs
   *
   * **Type parameters**
   *
   * * **B**: _number[] | Float32Array_
   *
   *    the type of the buffer; an array of numbers or (more typically) a `Float32Array`
   *
   * @param m - the 2x2 matrix
   * @param buffer - the buffer to be filled
   * @return `buffer`, filled with the elemenets of `m`
   */
  export const fill: <B extends number[] | Float32Array>(m: Mat2, buffer: B) => B = (m, buffer) => {
    buffer[0] = m.r0c0;  buffer[1] = m.r1c0;
    buffer[2] = m.r0c1;  buffer[3] = m.r1c1;
    return buffer;
  };

  /**
   * Generates a multi-line string representation of the 2x2 matrix `m`
   *
   * @param m - a 2x2 matrix object
   * @returns a string representation of `m`
   */
  export const toString: (m: Mat2) => string
  = m => `[ ${pad(m.r0c0)} ${pad(m.r0c1)}\n`
       + `  ${pad(m.r1c0)} ${pad(m.r1c1)} ]`;
}

export default Mat2;
