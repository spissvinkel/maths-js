import { fpad as pad } from './maths';
import Mat2 from './mat2';
import Vec2 from './vec2';
import Vec3 from './vec3';

interface Mat3 {
  r0c0: number, r0c1: number, r0c2: number,
  r1c0: number, r1c1: number, r1c2: number,
  r2c0: number, r2c1: number, r2c2: number
}

namespace Mat3 {

  export const of: (r0c0: number, r0c1: number, r0c2: number,
                    r1c0: number, r1c1: number, r1c2: number,
                    r2c0: number, r2c1: number, r2c2: number) => Mat3
  = (r0c0, r0c1, r0c2, r1c0, r1c1, r1c2, r2c0, r2c1, r2c2) => ({
    r0c0, r0c1, r0c2,
    r1c0, r1c1, r1c2,
    r2c0, r2c1, r2c2
  });

  export const zero: () => Mat3 = () => setZero({ } as Mat3);
  export const id:   () => Mat3 = () => setId({ } as Mat3);

  export const setZero: (m: Mat3) => Mat3 = m => {
    m.r0c0 = 0.0;  m.r0c1 = 0.0;  m.r0c2 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = 0.0;  m.r1c2 = 0.0;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 0.0;
    return m;
  };

  export const setId: (m: Mat3) => Mat3 = m => {
    m.r0c0 = 1.0;  m.r0c1 = 0.0;  m.r0c2 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = 1.0;  m.r1c2 = 0.0;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;
    return m;
  };

  export const setRotX: (r: number, m: Mat3) => Mat3 = (r, m) => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  1;   m.r0c1 =  0;   m.r0c2 =  0;
    m.r1c0 =  0;   m.r1c1 =  c;   m.r1c2 = -s;
    m.r2c0 =  0;   m.r2c1 =  s;   m.r2c2 =  c;
    return m;
  };

  export const setRotY: (r: number, m: Mat3) => Mat3 = (r, m) => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  c;   m.r0c1 =  0;   m.r0c2 =  s;
    m.r1c0 =  0;   m.r1c1 =  1;   m.r1c2 =  0;
    m.r2c0 = -s;   m.r2c1 =  0;   m.r2c2 =  c;
    return m;
  };

  export const setRotZ: (r: number, m: Mat3) => Mat3 = (r, m) => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  c;   m.r0c1 = -s;   m.r0c2 =  0;
    m.r1c0 =  s;   m.r1c1 =  c;   m.r1c2 =  0;
    m.r2c0 =  0;   m.r2c1 =  0;   m.r2c2 =  1;
    return m;
  };

  export const setRot: (rx: number, ry: number, rz: number, m: Mat3) => Mat3 = (rx, ry, rz, m) => {
    const cx = Math.cos(rx), cy = Math.cos(ry), cz = Math.cos(rz);
    const sx = Math.sin(rx), sy = Math.sin(ry), sz = Math.sin(rz);
    m.r0c0 =  cy*cz;              m.r0c1 = -sz*cy;              m.r0c2 =  sy;
    m.r1c0 =  sx*sy*cz + cx*sz;   m.r1c1 =  cx*cz - sz*sx*sy;   m.r1c2 = -sx*cy;
    m.r2c0 =  sx*sz - sy*cx*cz;   m.r2c1 =  sy*cx*sz + sx*cz;   m.r2c2 =  cx*cy;
    return m;
  };

  export const setRotV:    (a: Vec3, m: Mat3) => Mat3 = (a, m) => setRot( a.x,  a.y,  a.z, m);
  export const setInvRotV: (a: Vec3, m: Mat3) => Mat3 = (a, m) => setRot(-a.x, -a.y, -a.z, m);

  export const setScale: (a: Vec2, m: Mat3) => Mat3 = (a, m) => {
    m.r0c0 = a.x;  m.r0c1 = 0.0;  m.r0c2 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = a.y;  m.r1c2 = 0.0;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;
    return m;
  };

  export const setTrsl: (sx: number, sy: number, m: Mat3) => Mat3 = (sx, sy, m) => {
    m.r0c0 = 1.0;  m.r0c1 = 0.0;  m.r0c2 = sx;
    m.r1c0 = 0.0;  m.r1c1 = 1.0;  m.r1c2 = sy;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;
    return m;
  };

  export const setTrslV:    (a: Vec2, m: Mat3) => Mat3 = (a, m) => setTrsl( a.x,  a.y, m);
  export const setInvTrslV: (a: Vec2, m: Mat3) => Mat3 = (a, m) => setTrsl(-a.x, -a.y, m);

  export const setScaleTrsl: (a: Vec2, b: Vec2, m: Mat3) => Mat3 = (a, b, m) => {
    m.r0c0 = a.x;  m.r0c1 = 0.0;  m.r0c2 = b.x;
    m.r1c0 = 0.0;  m.r1c1 = a.y;  m.r1c2 = b.y;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;
    return m;
  };

  export const setM: (n: Mat3, m: Mat3) => Mat3 = (n, m) => {
    m.r0c0 = n.r0c0;  m.r0c1 = n.r0c1;  m.r0c2 = n.r0c2;
    m.r1c0 = n.r1c0;  m.r1c1 = n.r1c1;  m.r1c2 = n.r1c2;
    m.r2c0 = n.r2c0;  m.r2c1 = n.r2c1;  m.r2c2 = n.r2c2;
    return m;
  };

  export const set: (r0c0: number, r0c1: number, r0c2: number,
                     r1c0: number, r1c1: number, r1c2: number,
                     r2c0: number, r2c1: number, r2c2: number,
                     m: Mat3) => Mat3
  = (r0c0, r0c1, r0c2, r1c0, r1c1, r1c2, r2c0, r2c1, r2c2, m) => {
    m.r0c0 = r0c0;  m.r0c1 = r0c1;  m.r0c2 = r0c2;
    m.r1c0 = r1c0;  m.r1c1 = r1c1;  m.r1c2 = r1c2;
    m.r2c0 = r2c0;  m.r2c1 = r2c1;  m.r2c2 = r2c2;
    return m;
  };

  /**
   * m = m * n
   * @returns m
   */
  export const mulM: (n: Mat3, m: Mat3) => Mat3 = (n, m) => {
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
   * m = m * n
   * @returns m
   */
  export const mulM2: (n: Mat2, m: Mat3) => Mat3 = (n, m) => {
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
   * a = m * b
   * @returns a
   */
  export const mulV: (a: Vec3, b: Vec3, m: Mat3) => Vec3 = (a, b, m) => Vec3.set(
    m.r0c0 * b.x  +  m.r0c1 * b.y  +  m.r0c2 * b.z,
    m.r1c0 * b.x  +  m.r1c1 * b.y  +  m.r1c2 * b.z,
    m.r2c0 * b.x  +  m.r2c1 * b.y  +  m.r2c2 * b.z,
    a
  );

  export const fill: (buffer: number[], m: Mat3) => number[] = (buffer, m) => {
    buffer[0] = m.r0c0;  buffer[1] = m.r1c0;  buffer[2] = m.r2c0;
    buffer[3] = m.r0c1;  buffer[4] = m.r1c1;  buffer[5] = m.r2c1;
    buffer[6] = m.r0c2;  buffer[7] = m.r1c2;  buffer[8] = m.r2c2;
    return buffer;
  };

  export const toString: (m: Mat3) => string
  = m => `[ ${pad(m.r0c0)} ${pad(m.r0c1)} ${pad(m.r0c2)}\n`
       + `  ${pad(m.r1c0)} ${pad(m.r1c1)} ${pad(m.r1c2)}\n`
       + `  ${pad(m.r2c0)} ${pad(m.r2c1)} ${pad(m.r2c2)} ]`;
}

export default Mat3;
