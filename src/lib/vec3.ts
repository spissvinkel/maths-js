import Maths from './maths';

interface Vec3 { x: number;  y: number;  z: number; }

namespace Vec3 {

  /** @ignore @private */
  const pad = Maths.fpad;

  export const of: (x: number, y: number, z: number) => Vec3 = (x, y, z) => ({ x, y, z } as Vec3);

  export const ofV: (b: Vec3) => Vec3 = b => setV({ } as Vec3, b);

  export const zero:  () => Vec3 = () => setZero({ } as Vec3);
  export const one:   () => Vec3 = () => setOne({ } as Vec3);
  export const unitX: () => Vec3 = () => setUnitX({ } as Vec3);
  export const unitY: () => Vec3 = () => setUnitY({ } as Vec3);
  export const unitZ: () => Vec3 = () => setUnitZ({ } as Vec3);

  export const setZero:  (a: Vec3) => Vec3 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  return a; };
  export const setOne:   (a: Vec3) => Vec3 = a => { a.x = 1.0;  a.y = 1.0;  a.z = 1.0;  return a; };
  export const setUnitX: (a: Vec3) => Vec3 = a => { a.x = 1.0;  a.y = 0.0;  a.z = 0.0;  return a; };
  export const setUnitY: (a: Vec3) => Vec3 = a => { a.x = 0.0;  a.y = 1.0;  a.z = 0.0;  return a; };
  export const setUnitZ: (a: Vec3) => Vec3 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 1.0;  return a; };

  export const setV: (a: Vec3, b: Vec3) => Vec3 = (a, b) => { a.x = b.x;  a.y = b.y;  a.z = b.z;  return a; };

  export const set: (a: Vec3, x: number, y: number, z: number) => Vec3
  = (a, x, y, z) => { a.x = x;  a.y = y;  a.z = z;  return a; };

  export const addV: (a: Vec3, b: Vec3) => Vec3 = (a, b) => { a.x += b.x;  a.y += b.y;  a.z += b.z;  return a; };
  export const subV: (a: Vec3, b: Vec3) => Vec3 = (a, b) => { a.x -= b.x;  a.y -= b.y;  a.z -= b.z;  return a; };

  export const addMul: (a: Vec3, b: Vec3, s: number) => Vec3
  = (a, b, s) => { a.x += b.x * s;  a.y += b.y * s;  a.z += b.z * s;  return a; };

  export const mulV: (a: Vec3  , b: Vec3) => Vec3 = (a, b) => { a.x *= b.x;  a.y *= b.y;  a.z *= b.z;  return a; };
  export const mul:  (a: Vec3, s: number) => Vec3 = (a, s) => { a.x *= s;    a.y *= s;    a.z *= s;    return a; };

  export const inv: (a: Vec3) => Vec3 = a => { a.x = -a.x;  a.y = -a.y;  a.z = -a.z;  return a; };

  export const sqrMag: (a: Vec3) => number = a => a.x * a.x  +  a.y * a.y  +  a.z * a.z;
  export const mag:    (a: Vec3) => number = a => Math.sqrt(sqrMag(a));
  export const norm:   (a: Vec3) => Vec3   = a => normTo(a, mag(a));

  export const normTo: (a: Vec3, mag: number) => Vec3 = (a, mag) => mag > 0.0 ? mul(a, 1.0 / mag) : a;

  export const dot: (a: Vec3, b: Vec3) => number = (a, b) => a.x * b.x  +  a.y * b.y  +  a.z * b.z;

  /**
   * c = a X b
   * @returns c
   */
  export const cross: (a: Vec3, b: Vec3, c: Vec3) => Vec3 = (a, b, c) => {
    c.x = a.y * b.z - a.z * b.y;  c.y = a.z * b.x - a.x * b.z;  c.z = a.x * b.y - a.y * b.x;
    return c;
  };

  export const clampV: (a: Vec3, min: Vec3, max: Vec3) => Vec3 = (a, min, max) => {
    a.x = a.x < min.x ? min.x : (a.x > max.x ? max.x : a.x);
    a.y = a.y < min.y ? min.y : (a.y > max.y ? max.y : a.y);
    a.z = a.z < min.z ? min.z : (a.z > max.z ? max.z : a.z);
    return a;
  };

  export const clamp: (a: Vec3, min: number, max: number) => Vec3 = (a, min, max) => {
    a.x = a.x < min ? min : (a.x > max ? max : a.x);
    a.y = a.y < min ? min : (a.y > max ? max : a.y);
    a.z = a.z < min ? min : (a.z > max ? max : a.z);
    return a;
  };

  export const clamp01: (a: Vec3) => Vec3 = a => {
    a.x = a.x < 0.0 ? 0.0 : (a.x > 1.0 ? 1.0 : a.x);
    a.y = a.y < 0.0 ? 0.0 : (a.y > 1.0 ? 1.0 : a.y);
    a.z = a.z < 0.0 ? 0.0 : (a.z > 1.0 ? 1.0 : a.z);
    return a;
  };

  export const toString: (a: Vec3) => string = a => `[ ${pad(a.x)} ${pad(a.y)} ${pad(a.z)} ]`;
}

export default Vec3;
