/**
 * `mat4` is a collection of functions to manipulate {@linkcode Mat4} 4x4 matrix objects.
 *
 * The primary use for a {@linkcode Mat4} object is as a 3D transformation matrix.
 *
 * A "column-major" ordering and a "right-handed" coordinate system is assumed, suitable for e.g. WebGL
 *
 * Example usage:
 * ```
 * import * as mat4 from '@spissvinkel/maths/mat4';
 * ```
 *
 * @module
 */

import { Mat3, Mat4, Vec3, Vec4 } from './';
import { fpad as pad, FloatArray } from './maths';
import * as vec3 from './vec3';
import * as vec4 from './vec4';

/**
 * Creates a new 4x4 matrix object initialized with the given values
 *
 * @param r0c0 - the value at row 0, column 0
 * @param r0c1 - the value at row 0, column 1
 * @param r0c2 - the value at row 0, column 2
 * @param r0c3 - the value at row 0, column 3
 * @param r1c0 - the value at row 1, column 0
 * @param r1c1 - the value at row 1, column 1
 * @param r1c2 - the value at row 1, column 2
 * @param r1c3 - the value at row 1, column 3
 * @param r2c0 - the value at row 2, column 0
 * @param r2c1 - the value at row 2, column 1
 * @param r2c2 - the value at row 2, column 2
 * @param r2c3 - the value at row 2, column 3
 * @param r3c0 - the value at row 3, column 0
 * @param r3c1 - the value at row 3, column 1
 * @param r3c2 - the value at row 3, column 2
 * @param r3c3 - the value at row 3, column 3
 * @returns the new 4x4 matrix object
 */
export const of = (
    r0c0: number, r0c1: number, r0c2: number, r0c3: number,
    r1c0: number, r1c1: number, r1c2: number, r1c3: number,
    r2c0: number, r2c1: number, r2c2: number, r2c3: number,
    r3c0: number, r3c1: number, r3c2: number, r3c3: number
): Mat4 => ({
    r0c0, r0c1, r0c2, r0c3,
    r1c0, r1c1, r1c2, r1c3,
    r2c0, r2c1, r2c2, r2c3,
    r3c0, r3c1, r3c2, r3c3
});

/**
 * Creates a new 4x4 matrix object with all elements set to zero
 *
 * @returns the new 4x4 matrix object
 */
export const zero = (): Mat4 => setZero({ } as Mat4);

/**
 * Creates a new 4x4 identity matrix
 *
 * @returns the new 4x4 matrix object
 */
export const id = (): Mat4 => setId({ } as Mat4);

/**
 * Sets all elements of the 4x4 matrix `m` to zero
 *
 * @param m - a 4x4 matrix object
 * @returns `m` with all elements set to zero
 */
export const setZero = (m: Mat4): Mat4 => {
    m.r0c0 = 0.0;  m.r0c1 = 0.0;  m.r0c2 = 0.0;  m.r0c3 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = 0.0;  m.r1c2 = 0.0;  m.r1c3 = 0.0;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 0.0;  m.r2c3 = 0.0;
    m.r3c0 = 0.0;  m.r3c1 = 0.0;  m.r3c2 = 0.0;  m.r3c3 = 0.0;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes the identity matrix
 *
 * @param m - a 4x4 matrix object
 * @returns `m` set to be the identity matrix
 */
export const setId = (m: Mat4): Mat4 => {
    m.r0c0 = 1.0;  m.r0c1 = 0.0;  m.r0c2 = 0.0;  m.r0c3 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = 1.0;  m.r1c2 = 0.0;  m.r1c3 = 0.0;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;  m.r2c3 = 0.0;
    m.r3c0 = 0.0;  m.r3c1 = 0.0;  m.r3c2 = 0.0;  m.r3c3 = 1.0;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points in the yz-plane around the x-axis when multiplied by a column vector
 * (see {@linkcode mulV}).
 *
 * The direction of rotation will be **counterclockwise** for positive values of `r` when the axis points towards
 * the observer
 *
 * @param m - a 4x4 matrix object
 * @param r - the rotation as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotX = (m: Mat4, r: number): Mat4 => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  1;   m.r0c1 =  0;   m.r0c2 =  0;   m.r0c3 = 0;
    m.r1c0 =  0;   m.r1c1 =  c;   m.r1c2 = -s;   m.r1c3 = 0;
    m.r2c0 =  0;   m.r2c1 =  s;   m.r2c2 =  c;   m.r2c3 = 0;
    m.r3c0 =  0;   m.r3c1 =  0;   m.r3c2 =  0;   m.r3c3 = 1;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points in the xz-plane around the y-axis when multiplied by a column vector
 * (see {@linkcode mulV}).
 *
 * The direction of rotation will be **counterclockwise** for positive values of `r` when the axis points towards
 * the observer
 *
 * @param m - a 4x4 matrix object
 * @param r - the rotation as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotY = (m: Mat4, r: number): Mat4 => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  c;   m.r0c1 =  0;   m.r0c2 =  s;   m.r0c3 = 0;
    m.r1c0 =  0;   m.r1c1 =  1;   m.r1c2 =  0;   m.r1c3 = 0;
    m.r2c0 = -s;   m.r2c1 =  0;   m.r2c2 =  c;   m.r2c3 = 0;
    m.r3c0 =  0;   m.r3c1 =  0;   m.r3c2 =  0;   m.r3c3 = 1;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points in the xy-plane around the z-axis when multiplied by a column vector
 * (see {@linkcode mulV}).
 *
 * The direction of rotation will be **counterclockwise** for positive values of `r` when the axis points towards
 * the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param r - the rotation as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotZ = (m: Mat4, r: number): Mat4 => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  c;   m.r0c1 = -s;   m.r0c2 =  0;   m.r0c3 = 0;
    m.r1c0 =  s;   m.r1c1 =  c;   m.r1c2 =  0;   m.r1c3 = 0;
    m.r2c0 =  0;   m.r2c1 =  0;   m.r2c2 =  1;   m.r2c3 = 0;
    m.r3c0 =  0;   m.r3c1 =  0;   m.r3c2 =  0;   m.r3c3 = 1;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the x, z and y axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **counterclockwise** for positive values of `r` when the axis
 * points towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param rx - the rotation around the x axis as an angle in radians
 * @param ry - the rotation around the y axis as an angle in radians
 * @param rz - the rotation around the z axis as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRot = (m: Mat4, rx: number, ry: number, rz: number): Mat4 => setRotYzx(m, rx, ry, rz);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the x, z and y axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **counterclockwise** for positive rotation values when the axis
 * points towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector containing x-, y- and z-axis rotations as angles in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotV = (m: Mat4, a: Vec3): Mat4 => setRot(m, a.x, a.y, a.z);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the x, z and y axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **clockwise** for positive rotation values when the axis points
 * towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector containing (inverse) x-, y- and z-axis rotations as angles in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setInvRotV = (m: Mat4, a: Vec3): Mat4 => setRot(m, -a.x, -a.y, -a.z);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the z, y and x axes (in that order), when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **counterclockwise** for positive values of `r` when the axis
 * points towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param rx - the rotation around the x axis as an angle in radians
 * @param ry - the rotation around the y axis as an angle in radians
 * @param rz - the rotation around the z axis as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
 export const setRotXyz = (m: Mat4, rx: number, ry: number, rz: number): Mat4 => {
    const cx = Math.cos(rx), cy = Math.cos(ry), cz = Math.cos(rz);
    const sx = Math.sin(rx), sy = Math.sin(ry), sz = Math.sin(rz);
    m.r0c0 =  cy*cz;              m.r0c1 = -sz*cy;              m.r0c2 =  sy;      m.r0c3 = 0.0;
    m.r1c0 =  sx*sy*cz + cx*sz;   m.r1c1 =  cx*cz - sz*sx*sy;   m.r1c2 = -sx*cy;   m.r1c3 = 0.0;
    m.r2c0 =  sx*sz - sy*cx*cz;   m.r2c1 =  sy*cx*sz + sx*cz;   m.r2c2 =  cx*cy;   m.r2c3 = 0.0;
    m.r3c0 =  0.0;                m.r3c1 =  0.0;                m.r3c2 =  0.0;     m.r3c3 = 1.0;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the z, y and x axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **counterclockwise** for positive rotation values when the axis
 * points towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector containing x-, y- and z-axis rotations as angles in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotXyzV = (m: Mat4, a: Vec3): Mat4 => setRotXyz(m, a.x, a.y, a.z);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the z, y and x axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **clockwise** for positive rotation values when the axis points
 * towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector containing (inverse) x-, y- and z-axis rotations as angles in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setInvRotXyzV = (m: Mat4, a: Vec3): Mat4 => setRotXyz(m, -a.x, -a.y, -a.z);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the x, z and y axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **counterclockwise** for positive values of `r` when the axis
 * points towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param rx - the rotation around the x axis as an angle in radians
 * @param ry - the rotation around the y axis as an angle in radians
 * @param rz - the rotation around the z axis as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
 export const setRotYzx = (m: Mat4, rx: number, ry: number, rz: number): Mat4 => {
    const cx = Math.cos(rx), cy = Math.cos(ry), cz = Math.cos(rz);
    const sx = Math.sin(rx), sy = Math.sin(ry), sz = Math.sin(rz);
    m.r0c0 =  cy*cz;   m.r0c1 =  sy*sx - cy*sz*cx;   m.r0c2 =  cy*sz*sx + sy*cx;   m.r0c3 = 0.0;
    m.r1c0 =  sz;      m.r1c1 =  cz*cx;              m.r1c2 = -cz*sx;              m.r1c3 = 0.0;
    m.r2c0 = -sy*cz;   m.r2c1 =  sy*sz*cx + cy*sx;   m.r2c2 =  cy*cx - sy*sz*sx;   m.r2c3 = 0.0;
    m.r3c0 =  0.0;     m.r3c1 =  0.0;                m.r3c2 =  0.0;                m.r3c3 = 1.0;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the x, z and y axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **counterclockwise** for positive rotation values when the axis
 * points towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector containing x-, y- and z-axis rotations as angles in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotYzxV = (m: Mat4, a: Vec3): Mat4 => setRotYzx(m, a.x, a.y, a.z);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the x, z and y axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **clockwise** for positive rotation values when the axis points
 * towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector containing (inverse) x-, y- and z-axis rotations as angles in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setInvRotYzxV = (m: Mat4, a: Vec3): Mat4 => setRotYzx(m, -a.x, -a.y, -a.z);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the z, x and y axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **counterclockwise** for positive values of `r` when the axis
 * points towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param rx - the rotation around the x axis as an angle in radians
 * @param ry - the rotation around the y axis as an angle in radians
 * @param rz - the rotation around the z axis as an angle in radians
 * @returns `m` set to be a 3D rotation matrix
 */
 export const setRotYxz = (m: Mat4, rx: number, ry: number, rz: number): Mat4 => {
    const cx = Math.cos(rx), cy = Math.cos(ry), cz = Math.cos(rz);
    const sx = Math.sin(rx), sy = Math.sin(ry), sz = Math.sin(rz);
    m.r0c0 =  cy*cz + sy*sx*sz;   m.r0c1 =  sy*sx*cz - cy*sz;   m.r0c2 =  sy*cx;   m.r0c3 = 0.0;
    m.r1c0 =  cx*sz;              m.r1c1 =  cx*cz;              m.r1c2 = -sx;      m.r1c3 = 0.0;
    m.r2c0 =  cy*sx*sz - sy*cz;   m.r2c1 =  sy*sz + cy*sx*cz;   m.r2c2 =  cy*cx;   m.r2c3 = 0.0;
    m.r3c0 =  0.0;                m.r3c1 =  0.0;                m.r3c2 =  0.0;     m.r3c3 = 1.0;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the z, x and y axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **counterclockwise** for positive rotation values when the axis
 * points towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector containing x-, y- and z-axis rotations as angles in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setRotYxzV = (m: Mat4, a: Vec3): Mat4 => setRotYxz(m, a.x, a.y, a.z);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D rotation matrix.
 *
 * The resulting matrix will rotate points around the z, x and y axes (in that order) when multiplied by a column
 * vector (see {@linkcode mulV}).
 *
 * For each axis, the direction of rotation will be **clockwise** for positive rotation values when the axis points
 * towards the observer.
 *
 * (A "right-handed" coordinate system is assumed, so the z-axis points towards the observer when the x-axis points
 * right and the y-axis points up)
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector containing (inverse) x-, y- and z-axis rotations as angles in radians
 * @returns `m` set to be a 3D rotation matrix
 */
export const setInvRotYxzV = (m: Mat4, a: Vec3): Mat4 => setRotYxz(m, -a.x, -a.y, -a.z);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D scaling matrix.
 *
 * Multiplying the resulting matrix by a column vector will scale the given vector by `a` (see {@linkcode mulV})
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector specifying the scaling factors
 * @returns `m` set to be a 3D scaling matrix
 */
export const setScaleV = (m: Mat4, a: Vec3): Mat4 => {
    m.r0c0 = a.x;  m.r0c1 = 0.0;  m.r0c2 = 0.0;  m.r0c3 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = a.y;  m.r1c2 = 0.0;  m.r1c3 = 0.0;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = a.z;  m.r2c3 = 0.0;
    m.r3c0 = 0.0;  m.r3c1 = 0.0;  m.r3c2 = 0.0;  m.r3c3 = 1.0;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D translation matrix.
 *
 * Multiplying the resulting matrix by a column vector will translate the given vector by `[ tx ty tz ]`
 * (see {@linkcode mulV})
 *
 * @param m - a 4x4 matrix object
 * @param tx - the amount of translation along the x-axis
 * @param ty - the amount of translation along the y-axis
 * @param tz - the amount of translation along the z-axis
 * @returns `m` set to be a 3D translation matrix
 */
export const setTrsl = (m: Mat4, tx: number, ty: number, tz: number): Mat4 => {
    m.r0c0 = 1.0;  m.r0c1 = 0.0;  m.r0c2 = 0.0;  m.r0c3 = tx;
    m.r1c0 = 0.0;  m.r1c1 = 1.0;  m.r1c2 = 0.0;  m.r1c3 = ty;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;  m.r2c3 = tz;
    m.r3c0 = 0.0;  m.r3c1 = 0.0;  m.r3c2 = 0.0;  m.r3c3 = 1.0;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D translation matrix.
 *
 * Multiplying the resulting matrix by a column vector will translate the given vector by `a` (see {@linkcode mulV})
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector specifying the amount of translation
 * @returns `m` set to be a 3D translation matrix
 */
export const setTrslV = (m: Mat4, a: Vec3): Mat4 => setTrsl(m, a.x, a.y, a.z);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D translation matrix.
 *
 * Multiplying the resulting matrix by a column vector will translate the given vector by the inverse of `a`
 * (see {@linkcode mulV})
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector specifying the (inverse) amount of translation
 * @returns `m` set to be a 3D translation matrix
 */
export const setInvTrslV = (m: Mat4, a: Vec3): Mat4 => setTrsl(m, -a.x, -a.y, -a.z);

/**
 * Sets the elements of the 4x4 matrix `m` so it becomes a 3D transformation matrix for scaling and translation.
 *
 * Multiplying the resulting matrix by a column vector will scale the given vector by `a` and translate it by `b`
 * (see {@linkcode mulV})
 *
 * @param m - a 4x4 matrix object
 * @param a - a 3-element vector specifying the scaling factors
 * @param b - a 3-element vector specifying the amount of translation
 * @returns `m` set to be a 3D transformation matrix
 */
export const setScaleTrsl = (m: Mat4, a: Vec3, b: Vec3): Mat4 => {
    m.r0c0 = a.x;  m.r0c1 = 0.0;  m.r0c2 = 0.0;  m.r0c3 = b.x;
    m.r1c0 = 0.0;  m.r1c1 = a.y;  m.r1c2 = 0.0;  m.r1c3 = b.y;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = a.z;  m.r2c3 = b.z;
    m.r3c0 = 0.0;  m.r3c1 = 0.0;  m.r3c2 = 0.0;  m.r3c3 = 1.0;
    return m;
};

/**
 * Copies the 4x4 matrix `n` into the 4x4 matrix `m`
 *
 * @param m - a 4x4 matrix object
 * @param n - a 4x4 matrix object
 * @returns `m` set to be a copy of `n`
 */
export const setM = (m: Mat4, n: Mat4): Mat4 => {
    m.r0c0 = n.r0c0;  m.r0c1 = n.r0c1;  m.r0c2 = n.r0c2;  m.r0c3 = n.r0c3;
    m.r1c0 = n.r1c0;  m.r1c1 = n.r1c1;  m.r1c2 = n.r1c2;  m.r1c3 = n.r1c3;
    m.r2c0 = n.r2c0;  m.r2c1 = n.r2c1;  m.r2c2 = n.r2c2;  m.r2c3 = n.r2c3;
    m.r3c0 = n.r3c0;  m.r3c1 = n.r3c1;  m.r3c2 = n.r3c2;  m.r3c3 = n.r3c3;
    return m;
};

/**
 * Sets the elements of the 4x4 matrix `m` to the given values
 *
 * @param m - a 4x4 matrix object
 * @param r0c0 - the value at row 0, column 0
 * @param r0c1 - the value at row 0, column 1
 * @param r0c2 - the value at row 0, column 2
 * @param r0c3 - the value at row 0, column 3
 * @param r1c0 - the value at row 1, column 0
 * @param r1c1 - the value at row 1, column 1
 * @param r1c2 - the value at row 1, column 2
 * @param r1c3 - the value at row 1, column 3
 * @param r2c0 - the value at row 2, column 0
 * @param r2c1 - the value at row 2, column 1
 * @param r2c2 - the value at row 2, column 2
 * @param r2c3 - the value at row 2, column 3
 * @param r3c0 - the value at row 3, column 0
 * @param r3c1 - the value at row 3, column 1
 * @param r3c2 - the value at row 3, column 2
 * @param r3c3 - the value at row 3, column 3
 * @returns `m` with elements set to the given values
 */
export const set = (
    m: Mat4,
    r0c0: number, r0c1: number, r0c2: number, r0c3: number,
    r1c0: number, r1c1: number, r1c2: number, r1c3: number,
    r2c0: number, r2c1: number, r2c2: number, r2c3: number,
    r3c0: number, r3c1: number, r3c2: number, r3c3: number
): Mat4 => {
    m.r0c0 = r0c0;  m.r0c1 = r0c1;  m.r0c2 = r0c2;  m.r0c3 = r0c3;
    m.r1c0 = r1c0;  m.r1c1 = r1c1;  m.r1c2 = r1c2;  m.r1c3 = r1c3;
    m.r2c0 = r2c0;  m.r2c1 = r2c1;  m.r2c2 = r2c2;  m.r2c3 = r2c3;
    m.r3c0 = r3c0;  m.r3c1 = r3c1;  m.r3c2 = r3c2;  m.r3c3 = r3c3;
    return m;
};

/**
 * `m = m * n`
 *
 * Multiplies the 4x4 matrix `m` by the 4x4 matrix `n` and stores the result in `m`
 *
 * @param m - a 4x4 matrix object
 * @param n - a 4x4 matrix object
 * @returns `m`, multiplied by `n`
 */
export const mulM = (m: Mat4, n: Mat4): Mat4 => mulMInto(m, n, m);

/**
 * `o = m * n`
 *
 * Multiplies the 4x4 matrix `m` by the 4x4 matrix `n` and stores the result in `o`
 *
 * @param m - a 4x4 matrix object
 * @param n - a 4x4 matrix object
 * @param o - a 4x4 matrix object in which to store the result
 * @returns `o` as the result of the multiplication
 */
export const mulMInto = (m: Mat4, n: Mat4, o: Mat4): Mat4 => {
    let c0, c1, c2, c3;
    c0 = m.r0c0 * n.r0c0  +  m.r0c1 * n.r1c0  +  m.r0c2 * n.r2c0  +  m.r0c3 * n.r3c0;
    c1 = m.r0c0 * n.r0c1  +  m.r0c1 * n.r1c1  +  m.r0c2 * n.r2c1  +  m.r0c3 * n.r3c1;
    c2 = m.r0c0 * n.r0c2  +  m.r0c1 * n.r1c2  +  m.r0c2 * n.r2c2  +  m.r0c3 * n.r3c2;
    c3 = m.r0c0 * n.r0c3  +  m.r0c1 * n.r1c3  +  m.r0c2 * n.r2c3  +  m.r0c3 * n.r3c3;
    o.r0c0 = c0;  o.r0c1 = c1;  o.r0c2 = c2;  o.r0c3 = c3;
    c0 = m.r1c0 * n.r0c0  +  m.r1c1 * n.r1c0  +  m.r1c2 * n.r2c0  +  m.r1c3 * n.r3c0;
    c1 = m.r1c0 * n.r0c1  +  m.r1c1 * n.r1c1  +  m.r1c2 * n.r2c1  +  m.r1c3 * n.r3c1;
    c2 = m.r1c0 * n.r0c2  +  m.r1c1 * n.r1c2  +  m.r1c2 * n.r2c2  +  m.r1c3 * n.r3c2;
    c3 = m.r1c0 * n.r0c3  +  m.r1c1 * n.r1c3  +  m.r1c2 * n.r2c3  +  m.r1c3 * n.r3c3;
    o.r1c0 = c0;  o.r1c1 = c1;  o.r1c2 = c2;  o.r1c3 = c3;
    c0 = m.r2c0 * n.r0c0  +  m.r2c1 * n.r1c0  +  m.r2c2 * n.r2c0  +  m.r2c3 * n.r3c0;
    c1 = m.r2c0 * n.r0c1  +  m.r2c1 * n.r1c1  +  m.r2c2 * n.r2c1  +  m.r2c3 * n.r3c1;
    c2 = m.r2c0 * n.r0c2  +  m.r2c1 * n.r1c2  +  m.r2c2 * n.r2c2  +  m.r2c3 * n.r3c2;
    c3 = m.r2c0 * n.r0c3  +  m.r2c1 * n.r1c3  +  m.r2c2 * n.r2c3  +  m.r2c3 * n.r3c3;
    o.r2c0 = c0;  o.r2c1 = c1;  o.r2c2 = c2;  o.r2c3 = c3;
    c0 = m.r3c0 * n.r0c0  +  m.r3c1 * n.r1c0  +  m.r3c2 * n.r2c0  +  m.r3c3 * n.r3c0;
    c1 = m.r3c0 * n.r0c1  +  m.r3c1 * n.r1c1  +  m.r3c2 * n.r2c1  +  m.r3c3 * n.r3c1;
    c2 = m.r3c0 * n.r0c2  +  m.r3c1 * n.r1c2  +  m.r3c2 * n.r2c2  +  m.r3c3 * n.r3c2;
    c3 = m.r3c0 * n.r0c3  +  m.r3c1 * n.r1c3  +  m.r3c2 * n.r2c3  +  m.r3c3 * n.r3c3;
    o.r3c0 = c0;  o.r3c1 = c1;  o.r3c2 = c2;  o.r3c3 = c3;
    return o;
};

/**
 * `m = m * n`
 *
 * Multiplies the 4x4 matrix `m` by the 3x3 matrix `n` and stores the result in `m`.
 *
 * This is a convenience function where `m` is assumed to be a 3D transformation matrix and `n` a 3D rotation matrix
 *
 * @param m - a 4x4 matrix object
 * @param n - a 2x2 matrix object
 * @returns `m`, multiplied by `n`
 */
export const mulM3 = (m: Mat4, n: Mat3): Mat4 => {
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
    c0 = m.r3c0 * n.r0c0  +  m.r3c1 * n.r1c0  +  m.r3c2 * n.r2c0;
    c1 = m.r3c0 * n.r0c1  +  m.r3c1 * n.r1c1  +  m.r3c2 * n.r2c1;
    c2 = m.r3c0 * n.r0c2  +  m.r3c1 * n.r1c2  +  m.r3c2 * n.r2c2;
    m.r3c0 = c0;  m.r3c1 = c1;  m.r3c2 = c2;
    return m;
};

/**
 * `b = m * a`
 *
 * Multiplies the 4x4 matrix `m` by the 4-element column vector `a` and stores the result in the 4-element vector `b`.
 *
 * The vector `a` can be updated directly by invoking `mulV(m, a, a)`
 *
 * @param m - the 4x4 matrix multiplication operand
 * @param a - the 4-element vector multiplication operand
 * @param b - a 4-element vector in which to store the result
 * @returns `b` as the result of `m * a`
 */
export const mulV = (m: Mat4, a: Vec4, b: Vec4): Vec4 => vec4.set(
    b,
    m.r0c0 * a.x  +  m.r0c1 * a.y  +  m.r0c2 * a.z  +  m.r0c3 * a.w,
    m.r1c0 * a.x  +  m.r1c1 * a.y  +  m.r1c2 * a.z  +  m.r1c3 * a.w,
    m.r2c0 * a.x  +  m.r2c1 * a.y  +  m.r2c2 * a.z  +  m.r2c3 * a.w,
    m.r3c0 * a.x  +  m.r3c1 * a.y  +  m.r3c2 * a.z  +  m.r3c3 * a.w
);

/**
 * `b = m * a`
 *
 * Multiplies the 4x4 matrix `m` by the 3-element column vector `a` and stores the result in the 3-element vector `b`.
 *
 * This is a convenience function where `m` is assumed to be a 3D transformation matrix and `a` implicitly represents
 * the homogeneous coordinates `[ a.x, a.y, a.z, 1.0 ]`
 *
 * @param m - the 4x4 matrix multiplication operand
 * @param a - the 3-element vector multiplication operand
 * @param b - a 3-element vector in which to store the result
 * @returns `b` as the result of `m * a`
 */
export const mulV3 = (m: Mat4, a: Vec3, b: Vec3): Vec3 => vec3.set(
    b,
    m.r0c0 * a.x  +  m.r0c1 * a.y  +  m.r0c2 * a.z  +  m.r0c3,
    m.r1c0 * a.x  +  m.r1c1 * a.y  +  m.r1c2 * a.z  +  m.r1c3,
    m.r2c0 * a.x  +  m.r2c1 * a.y  +  m.r2c2 * a.z  +  m.r2c3
);

/**
 * Calculates the determinant of the 4x4 matrix `m`
 *
 * @param m - a 4x4 matrix object
 * @returns the determinant of `m`
 */
export const det = (m: Mat4): number => {
    const r0c0r1c1 = m.r0c0 * m.r1c1,  r0c0r1c2 = m.r0c0 * m.r1c2,  r0c0r1c3 = m.r0c0 * m.r1c3;
    const r0c1r1c0 = m.r0c1 * m.r1c0,  r0c1r1c2 = m.r0c1 * m.r1c2,  r0c1r1c3 = m.r0c1 * m.r1c3;
    const r0c2r1c0 = m.r0c2 * m.r1c0,  r0c2r1c1 = m.r0c2 * m.r1c1,  r0c2r1c3 = m.r0c2 * m.r1c3;
    const r0c3r1c0 = m.r0c3 * m.r1c0,  r0c3r1c1 = m.r0c3 * m.r1c1,  r0c3r1c2 = m.r0c3 * m.r1c2;
    const r2c2r3c3 = m.r2c2 * m.r3c3,  r2c2r3c0 = m.r2c2 * m.r3c0,  r2c2r3c1 = m.r2c2 * m.r3c1;
    const r2c3r3c1 = m.r2c3 * m.r3c1,  r2c3r3c2 = m.r2c3 * m.r3c2,  r2c3r3c0 = m.r2c3 * m.r3c0;
    const r2c1r3c2 = m.r2c1 * m.r3c2,  r2c1r3c3 = m.r2c1 * m.r3c3,  r2c1r3c0 = m.r2c1 * m.r3c0;
    const r2c0r3c3 = m.r2c0 * m.r3c3,  r2c0r3c1 = m.r2c0 * m.r3c1,  r2c0r3c2 = m.r2c0 * m.r3c2;
    return (   r0c0r1c1 * r2c2r3c3  +  r0c0r1c2 * r2c3r3c1  +  r0c0r1c3 * r2c1r3c2
            +  r0c1r1c0 * r2c3r3c2  +  r0c1r1c2 * r2c0r3c3  +  r0c1r1c3 * r2c2r3c0
            +  r0c2r1c0 * r2c1r3c3  +  r0c2r1c1 * r2c3r3c0  +  r0c2r1c3 * r2c0r3c1
            +  r0c3r1c0 * r2c2r3c1  +  r0c3r1c1 * r2c0r3c2  +  r0c3r1c2 * r2c1r3c0
            -  r0c0r1c1 * r2c3r3c2  -  r0c0r1c2 * r2c1r3c3  -  r0c0r1c3 * r2c2r3c1
            -  r0c1r1c0 * r2c2r3c3  -  r0c1r1c2 * r2c3r3c0  -  r0c1r1c3 * r2c0r3c2
            -  r0c2r1c0 * r2c3r3c1  -  r0c2r1c1 * r2c0r3c3  -  r0c2r1c3 * r2c1r3c0
            -  r0c3r1c0 * r2c1r3c2  -  r0c3r1c1 * r2c2r3c0  -  r0c3r1c2 * r2c0r3c1);
};

/**
* Calculates the inverse of the 4x4 matrix `m` and stores the result in `m`
*
* @param m - a 4x4 matrix object
* @returns `m` as its inverse
*/
export const inv = (m: Mat4): Mat4 => invInto(m, m);

/**
* Calculates the inverse of the 4x4 matrix `m` and stores the result in `n`
*
* @param m - a 4x4 matrix object
* @param n - a 4x4 matrix object
* @returns `n` as the inverse of `m`
*/
export const invInto = (m: Mat4, n: Mat4): Mat4 => {
    const r0c0r1c1 = m.r0c0 * m.r1c1,  r0c0r1c2 = m.r0c0 * m.r1c2,  r0c0r1c3 = m.r0c0 * m.r1c3;
    const r0c1r1c0 = m.r0c1 * m.r1c0,  r0c1r1c2 = m.r0c1 * m.r1c2,  r0c1r1c3 = m.r0c1 * m.r1c3;
    const r0c2r1c0 = m.r0c2 * m.r1c0,  r0c2r1c1 = m.r0c2 * m.r1c1,  r0c2r1c3 = m.r0c2 * m.r1c3;
    const r0c3r1c0 = m.r0c3 * m.r1c0,  r0c3r1c1 = m.r0c3 * m.r1c1,  r0c3r1c2 = m.r0c3 * m.r1c2;
    const r2c2r3c3 = m.r2c2 * m.r3c3,  r2c2r3c0 = m.r2c2 * m.r3c0,  r2c2r3c1 = m.r2c2 * m.r3c1;
    const r2c3r3c1 = m.r2c3 * m.r3c1,  r2c3r3c2 = m.r2c3 * m.r3c2,  r2c3r3c0 = m.r2c3 * m.r3c0;
    const r2c1r3c2 = m.r2c1 * m.r3c2,  r2c1r3c3 = m.r2c1 * m.r3c3,  r2c1r3c0 = m.r2c1 * m.r3c0;
    const r2c0r3c3 = m.r2c0 * m.r3c3,  r2c0r3c1 = m.r2c0 * m.r3c1,  r2c0r3c2 = m.r2c0 * m.r3c2;
    const det = (   r0c0r1c1 * r2c2r3c3  +  r0c0r1c2 * r2c3r3c1  +  r0c0r1c3 * r2c1r3c2
                 +  r0c1r1c0 * r2c3r3c2  +  r0c1r1c2 * r2c0r3c3  +  r0c1r1c3 * r2c2r3c0
                 +  r0c2r1c0 * r2c1r3c3  +  r0c2r1c1 * r2c3r3c0  +  r0c2r1c3 * r2c0r3c1
                 +  r0c3r1c0 * r2c2r3c1  +  r0c3r1c1 * r2c0r3c2  +  r0c3r1c2 * r2c1r3c0
                 -  r0c0r1c1 * r2c3r3c2  -  r0c0r1c2 * r2c1r3c3  -  r0c0r1c3 * r2c2r3c1
                 -  r0c1r1c0 * r2c2r3c3  -  r0c1r1c2 * r2c3r3c0  -  r0c1r1c3 * r2c0r3c2
                 -  r0c2r1c0 * r2c3r3c1  -  r0c2r1c1 * r2c0r3c3  -  r0c2r1c3 * r2c1r3c0
                 -  r0c3r1c0 * r2c1r3c2  -  r0c3r1c1 * r2c2r3c0  -  r0c3r1c2 * r2c0r3c1);
    if (det !== 0.0) {
        const invDet = 1.0 / det;
        const t0t0 = m.r0c0,  t0t1 = m.r0c1,  t0t2 = m.r0c2,  t0t3 = m.r0c3;
        const t1t0 = m.r1c0,  t1t1 = m.r1c1,  t1t2 = m.r1c2,  t1t3 = m.r1c3;
        const t2t0 = m.r2c0,  t2t1 = m.r2c1,  t2t2 = m.r2c2;
        const t3t0 = m.r3c0,  t3t1 = m.r3c1;
        n.r0c0 = (   t1t1 * r2c2r3c3    +  t1t2 * r2c3r3c1    +  t1t3 * r2c1r3c2
                  -  t1t1 * r2c3r3c2    -  t1t2 * r2c1r3c3    -  t1t3 * r2c2r3c1  ) * invDet;
        n.r0c1 = (   t0t1 * r2c3r3c2    +  t0t2 * r2c1r3c3    +  t0t3 * r2c2r3c1
                  -  t0t1 * r2c2r3c3    -  t0t2 * r2c3r3c1    -  t0t3 * r2c1r3c2  ) * invDet;
        n.r0c2 = (   r0c1r1c2 * m.r3c3  +  r0c2r1c3 * t3t1    +  r0c3r1c1 * m.r3c2
                  -  r0c1r1c3 * m.r3c2  -  r0c2r1c1 * m.r3c3  -  r0c3r1c2 * t3t1  ) * invDet;
        n.r0c3 = (   r0c1r1c3 * t2t2    +  r0c2r1c1 * m.r2c3  +  r0c3r1c2 * t2t1
                  -  r0c1r1c2 * m.r2c3  -  r0c2r1c3 * t2t1    -  r0c3r1c1 * t2t2  ) * invDet;
        n.r1c0 = (   t1t0 * r2c3r3c2    +  t1t2 * r2c0r3c3    +  t1t3 * r2c2r3c0
                  -  t1t0 * r2c2r3c3    -  t1t2 * r2c3r3c0    -  t1t3 * r2c0r3c2  ) * invDet;
        n.r1c1 = (   t0t0 * r2c2r3c3    +  t0t2 * r2c3r3c0    +  t0t3 * r2c0r3c2
                  -  t0t0 * r2c3r3c2    -  t0t2 * r2c0r3c3    -  t0t3 * r2c2r3c0  ) * invDet;
        n.r1c2 = (   r0c0r1c3 * m.r3c2  +  r0c2r1c0 * m.r3c3  +  r0c3r1c2 * t3t0
                  -  r0c0r1c2 * m.r3c3  -  r0c2r1c3 * t3t0    -  r0c3r1c0 * m.r3c2) * invDet;
        n.r1c3 = (   r0c0r1c2 * m.r2c3  +  r0c2r1c3 * t2t0    +  r0c3r1c0 * t2t2
                  -  r0c0r1c3 * t2t2    -  r0c2r1c0 * m.r2c3  -  r0c3r1c2 * t2t0  ) * invDet;
        n.r2c0 = (   t1t0 * r2c1r3c3    +  t1t1 * r2c3r3c0    +  t1t3 * r2c0r3c1
                  -  t1t0 * r2c3r3c1    -  t1t1 * r2c0r3c3    -  t1t3 * r2c1r3c0  ) * invDet;
        n.r2c1 = (   t0t0 * r2c3r3c1    +  t0t1 * r2c0r3c3    +  t0t3 * r2c1r3c0
                  -  t0t0 * r2c1r3c3    -  t0t1 * r2c3r3c0    -  t0t3 * r2c0r3c1  ) * invDet;
        n.r2c2 = (   r0c0r1c1 * m.r3c3  +  r0c1r1c3 * t3t0    +  r0c3r1c0 * t3t1
                  -  r0c0r1c3 * t3t1    -  r0c1r1c0 * m.r3c3  -  r0c3r1c1 * t3t0  ) * invDet;
        n.r2c3 = (   r0c0r1c3 * t2t1    +  r0c1r1c0 * m.r2c3  +  r0c3r1c1 * t2t0
                  -  r0c0r1c1 * m.r2c3  -  r0c1r1c3 * t2t0    -  r0c3r1c0 * t2t1  ) * invDet;
        n.r3c0 = (   t1t0 * r2c2r3c1    +  t1t1 * r2c0r3c2    +  t1t2 * r2c1r3c0
                  -  t1t0 * r2c1r3c2    -  t1t1 * r2c2r3c0    -  t1t2 * r2c0r3c1  ) * invDet;
        n.r3c1 = (   t0t0 * r2c1r3c2    +  t0t1 * r2c2r3c0    +  t0t2 * r2c0r3c1
                  -  t0t0 * r2c2r3c1    -  t0t1 * r2c0r3c2    -  t0t2 * r2c1r3c0  ) * invDet;
        n.r3c2 = (   r0c0r1c2 * t3t1    +  r0c1r1c0 * m.r3c2  +  r0c2r1c1 * t3t0
                  -  r0c0r1c1 * m.r3c2  -  r0c1r1c2 * t3t0    -  r0c2r1c0 * t3t1  ) * invDet;
        n.r3c3 = (   r0c0r1c1 * t2t2    +  r0c1r1c2 * t2t0    +  r0c2r1c0 * t2t1
                  -  r0c0r1c2 * t2t1    -  r0c1r1c0 * t2t2    -  r0c2r1c1 * t2t0  ) * invDet;
    }
    return n;
};

/**
* Calculates the transpose of the 4x4 matrix `m` and stores the result in `m`
*
* @param m - a 4x4 matrix object
* @returns `m` as its transpose
*/
export const trsp = (m: Mat4): Mat4 => trspInto(m, m);

/**
* Calculates the transpose of the 4x4 matrix `m` and stores the result in `n`
*
* @param m - a 4x4 matrix object
* @param n - a 4x4 matrix object
* @returns `n` as the transpose of `m`
*/
export const trspInto = (m: Mat4, n: Mat4): Mat4 => {
    const t0t1 = m.r0c1,  t0t2 = m.r0c2,  t0t3 = m.r0c3;
    const t1t2 = m.r1c2,  t1t3 = m.r1c3,  t2t3 = m.r2c3;
    n.r0c1 = m.r1c0;  n.r0c2 = m.r2c0;  n.r0c3 = m.r3c0;
    n.r1c0 = t0t1;    n.r1c2 = m.r2c1;  n.r1c3 = m.r3c1;
    n.r2c0 = t0t2;    n.r2c1 = t1t2;    n.r2c3 = m.r3c2;
    n.r3c0 = t0t3;    n.r3c1 = t1t3;    n.r3c2 = t2t3;
    return n;
};

/**
 * Fills `buffer` with the elements of the 4x4 matrix `m`, column by column
 * (i.e. [ r0c0, r1c0, r2c0, r3c0, r0c1, ..., r3c3 ]).
 *
 * The order in which the buffer is filled is suitable for e.g. setting uniform variables in WebGL shader programs
 *
 * @param m - the 4x4 matrix
 * @param buffer - the buffer to be filled
 * @return `buffer`, filled with the elemenets of `m`
 */
export const fill = <B extends FloatArray>(m: Mat4, buffer: B): B => {
    buffer[ 0] = m.r0c0;  buffer[ 1] = m.r1c0;  buffer[ 2] = m.r2c0;  buffer[ 3] = m.r3c0;
    buffer[ 4] = m.r0c1;  buffer[ 5] = m.r1c1;  buffer[ 6] = m.r2c1;  buffer[ 7] = m.r3c1;
    buffer[ 8] = m.r0c2;  buffer[ 9] = m.r1c2;  buffer[10] = m.r2c2;  buffer[11] = m.r3c2;
    buffer[12] = m.r0c3;  buffer[13] = m.r1c3;  buffer[14] = m.r2c3;  buffer[15] = m.r3c3;
    return buffer;
};

/**
 * Checks if the matrices `m` and `n` are equal
 *
 * @param m - a 4x4 matrix object
 * @param n - a 4x4 matrix object
 * @returns `true` if `m` and `n` are equal, `false` otherwise
 */
export const equals = (m: Mat4, n: Mat4): boolean => (
       m.r0c0 === n.r0c0 && m.r0c1 === n.r0c1 && m.r0c2 === n.r0c2 && m.r0c3 === n.r0c3
    && m.r1c0 === n.r1c0 && m.r1c1 === n.r1c1 && m.r1c2 === n.r1c2 && m.r1c3 === n.r1c3
    && m.r2c0 === n.r2c0 && m.r2c1 === n.r2c1 && m.r2c2 === n.r2c2 && m.r2c3 === n.r2c3
    && m.r3c0 === n.r3c0 && m.r3c1 === n.r3c1 && m.r3c2 === n.r3c2 && m.r3c3 === n.r3c3
);

/**
 * Generates a multi-line string representation of the 4x4 matrix `m`
 *
 * @param m - a 4x4 matrix object
 * @returns a string representation of `m`
 */
export const toString = (m: Mat4): string => (
      `[ ${pad(m.r0c0)} ${pad(m.r0c1)} ${pad(m.r0c2)} ${pad(m.r0c3)}\n`
    + `  ${pad(m.r1c0)} ${pad(m.r1c1)} ${pad(m.r1c2)} ${pad(m.r1c3)}\n`
    + `  ${pad(m.r2c0)} ${pad(m.r2c1)} ${pad(m.r2c2)} ${pad(m.r2c3)}\n`
    + `  ${pad(m.r3c0)} ${pad(m.r3c1)} ${pad(m.r3c2)} ${pad(m.r3c3)} ]`
);
