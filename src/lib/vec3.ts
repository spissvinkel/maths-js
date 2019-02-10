import { fpad as pad } from './maths';

interface Vec3 { x: number;  y: number;  z: number; }

namespace Vec3 {

  export const of: (x: number, y: number, z: number) => Vec3 = (x, y, z) => ({ x, y, z });

  export const zero:  () => Vec3 = () => setZero({ } as Vec3);
  export const unit:  () => Vec3 = () => setUnit({ } as Vec3);
  export const unitX: () => Vec3 = () => setUnitX({ } as Vec3);
  export const unitY: () => Vec3 = () => setUnitY({ } as Vec3);
  export const unitZ: () => Vec3 = () => setUnitZ({ } as Vec3);

  export const copy: (b: Vec3) => Vec3 = b => setV(b, { } as Vec3);

  export const setZero:  (a: Vec3) => Vec3 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  return a; };
  export const setUnit:  (a: Vec3) => Vec3 = a => { a.x = 1.0;  a.y = 1.0;  a.z = 1.0;  return a; };
  export const setUnitX: (a: Vec3) => Vec3 = a => { a.x = 1.0;  a.y = 0.0;  a.z = 0.0;  return a; };
  export const setUnitY: (a: Vec3) => Vec3 = a => { a.x = 0.0;  a.y = 1.0;  a.z = 0.0;  return a; };
  export const setUnitZ: (a: Vec3) => Vec3 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 1.0;  return a; };

  export const setV: (b: Vec3, a: Vec3) => Vec3 = (b, a) => { a.x = b.x;  a.y = b.y;  a.z = b.z;  return a; };

  export const set: (x: number, y: number, z: number, a: Vec3) => Vec3
  = (x, y, z, a) => { a.x = x;  a.y = y;  a.z = z;  return a; };

  export const add: (b: Vec3, a: Vec3) => Vec3 = (b, a) => { a.x += b.x;  a.y += b.y;  a.z += b.z;  return a; };
  export const sub: (b: Vec3, a: Vec3) => Vec3 = (b, a) => { a.x -= b.x;  a.y -= b.y;  a.z -= b.z;  return a; };

  export const addMul: (b: Vec3, s: number, a: Vec3) => Vec3
  = (b, s, a) => { a.x += b.x * s;  a.y += b.y * s;  a.z += b.z * s;  return a; };

  export const mulV: (b: Vec3  , a: Vec3) => Vec3 = (b, a) => { a.x *= b.x;  a.y *= b.y;  a.z *= b.z;  return a; };
  export const mulS: (s: number, a: Vec3) => Vec3 = (s, a) => { a.x *= s;    a.y *= s;    a.z *= s;    return a; };

  export const inv: (a: Vec3) => Vec3 = a => { a.x = -a.x;  a.y = -a.y;  a.z = -a.z;  return a; };

  export const sqrMag: (a: Vec3) => number = a => a.x * a.x  +  a.y * a.y  +  a.z * a.z;
  export const mag:    (a: Vec3) => number = a => Math.sqrt(sqrMag(a));
  export const norm:   (a: Vec3) => Vec3   = a => normTo(mag(a), a);

  export const normTo: (mag: number, a: Vec3) => Vec3 = (mag, a) => mag > 0.0 ? mulS(1.0 / mag, a) : a;

  export const dot: (b: Vec3, a: Vec3) => number = (b, a) => a.x * b.x  +  a.y * b.y  +  a.z * b.z;

  /**
   * c = a X b
   * @returns c
   */
  export const cross: (c: Vec3, b: Vec3, a: Vec3) => Vec3 = (c, b, a) => {
    c.x = a.y * b.z - a.z * b.y;  c.y = a.z * b.x - a.x * b.z;  c.z = a.x * b.y - a.y * b.x;
    return c;
  };

  export const clampV: (min: Vec3, max: Vec3, a: Vec3) => Vec3 = (min, max, a) => {
    a.x = a.x < min.x ? min.x : (a.x > max.x ? max.x : a.x);
    a.y = a.y < min.y ? min.y : (a.y > max.y ? max.y : a.y);
    a.z = a.z < min.z ? min.z : (a.z > max.z ? max.z : a.z);
    return a;
  };

  export const clampS: (min: number, max: number, a: Vec3) => Vec3 = (min, max, a) => {
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

  export const toString = ({ x, y, z }: Vec3): string => `[ ${pad(x)} ${pad(y)} ${pad(z)} ]`;
}

export default Vec3;
