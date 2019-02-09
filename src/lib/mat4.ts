import { fpad as pad } from './maths';
import Mat3 from './mat3';
import Vec3 from './vec3';
import Vec4 from './vec4';

interface Mat4 {
  r0c0: number, r0c1: number, r0c2: number, r0c3: number,
  r1c0: number, r1c1: number, r1c2: number, r1c3: number,
  r2c0: number, r2c1: number, r2c2: number, r2c3: number,
  r3c0: number, r3c1: number, r3c2: number, r3c3: number
}

namespace Mat4 {

  export const zero: () => Mat4 = () => setZero({ } as Mat4);
  export const id:   () => Mat4 = () => setId({ } as Mat4);

  export const setZero: (m: Mat4) => Mat4 = m => {
    m.r0c0 = 0.0;  m.r0c1 = 0.0;  m.r0c2 = 0.0;  m.r0c3 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = 0.0;  m.r1c2 = 0.0;  m.r1c3 = 0.0;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 0.0;  m.r2c3 = 0.0;
    m.r3c0 = 0.0;  m.r3c1 = 0.0;  m.r3c2 = 0.0;  m.r3c3 = 0.0;
    return m;
  };

  export const setId: (m: Mat4) => Mat4 = m => {
    m.r0c0 = 1.0;  m.r0c1 = 0.0;  m.r0c2 = 0.0;  m.r0c3 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = 1.0;  m.r1c2 = 0.0;  m.r1c3 = 0.0;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;  m.r2c3 = 0.0;
    m.r3c0 = 0.0;  m.r3c1 = 0.0;  m.r3c2 = 0.0;  m.r3c3 = 1.0;
    return m;
  };

  export const setRotX: (r: number, m: Mat4) => Mat4 = (r, m) => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  1;   m.r0c1 =  0;   m.r0c2 =  0;   m.r0c3 = 0;
    m.r1c0 =  0;   m.r1c1 =  c;   m.r1c2 = -s;   m.r1c3 = 0;
    m.r2c0 =  0;   m.r2c1 =  s;   m.r2c2 =  c;   m.r2c3 = 0;
    m.r3c0 =  0;   m.r3c1 =  0;   m.r3c2 =  0;   m.r3c3 = 1;
    return m;
  };

  export const setRotY: (r: number, m: Mat4) => Mat4 = (r, m) => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  c;   m.r0c1 =  0;   m.r0c2 =  s;   m.r0c3 = 0;
    m.r1c0 =  0;   m.r1c1 =  1;   m.r1c2 =  0;   m.r1c3 = 0;
    m.r2c0 = -s;   m.r2c1 =  0;   m.r2c2 =  c;   m.r2c3 = 0;
    m.r3c0 =  0;   m.r3c1 =  0;   m.r3c2 =  0;   m.r3c3 = 1;
    return m;
  };

  export const setRotZ: (r: number, m: Mat4) => Mat4 = (r, m) => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  c;   m.r0c1 = -s;   m.r0c2 =  0;   m.r0c3 = 0;
    m.r1c0 =  s;   m.r1c1 =  c;   m.r1c2 =  0;   m.r1c3 = 0;
    m.r2c0 =  0;   m.r2c1 =  0;   m.r2c2 =  1;   m.r2c3 = 0;
    m.r3c0 =  0;   m.r3c1 =  0;   m.r3c2 =  0;   m.r3c3 = 1;
    return m;
  };

  export const setRot: (rx: number, ry: number, rz: number, m: Mat4) => Mat4 = (rx, ry, rz, m) => {
    const cx = Math.cos(rx), cy = Math.cos(ry), cz = Math.cos(rz);
    const sx = Math.sin(rx), sy = Math.sin(ry), sz = Math.sin(rz);
    m.r0c0 =  cy*cz;              m.r0c1 = -sz*cy;              m.r0c2 =  sy;      m.r0c3 = 0.0;
    m.r1c0 =  sx*sy*cz + cx*sz;   m.r1c1 =  cx*cz - sz*sx*sy;   m.r1c2 = -sx*cy;   m.r1c3 = 0.0;
    m.r2c0 =  sx*sz - sy*cx*cz;   m.r2c1 =  sy*cx*sz + sx*cz;   m.r2c2 =  cx*cy;   m.r2c3 = 0.0;
    m.r3c0 =  0.0;                m.r3c1 =  0.0;                m.r3c2 = 0.0;      m.r3c3 = 1.0;
    return m;
  };

  export const setRotV:    (a: Vec3, m: Mat4) => Mat4 = (a, m) => setRot( a.x,  a.y,  a.z, m);
  export const setInvRotV: (a: Vec3, m: Mat4) => Mat4 = (a, m) => setRot(-a.x, -a.y, -a.z, m);

  export const setScale: (a: Vec3, m: Mat4) => Mat4 = (a, m) => {
    m.r0c0 = a.x;  m.r0c1 = 0.0;  m.r0c2 = 0.0;  m.r0c3 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = a.y;  m.r1c2 = 0.0;  m.r1c3 = 0.0;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = a.z;  m.r2c3 = 0.0;
    m.r3c0 = 0.0;  m.r3c1 = 0.0;  m.r3c2 = 0.0;  m.r3c3 = 1.0;
    return m;
  };

  export const setTrsl: (sx: number, sy: number, sz: number, m: Mat4) => Mat4 = (sx, sy, sz, m) => {
    m.r0c0 = 1.0;  m.r0c1 = 0.0;  m.r0c2 = 0.0;  m.r0c3 = sx;
    m.r1c0 = 0.0;  m.r1c1 = 1.0;  m.r1c2 = 0.0;  m.r1c3 = sy;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = 1.0;  m.r2c3 = sz;
    m.r3c0 = 0.0;  m.r3c1 = 0.0;  m.r3c2 = 0.0;  m.r3c3 = 1.0;
    return m;
  };

  export const setTrslV:    (a: Vec3, m: Mat4) => Mat4 = (a, m) => setTrsl( a.x,  a.y,  a.z, m);
  export const setInvTrslV: (a: Vec3, m: Mat4) => Mat4 = (a, m) => setTrsl(-a.x, -a.y, -a.z, m);

  export const setScaleTrsl: (a: Vec3, b: Vec3, m: Mat4) => Mat4 = (a, b, m) => {
    m.r0c0 = a.x;  m.r0c1 = 0.0;  m.r0c2 = 0.0;  m.r0c3 = b.x;
    m.r1c0 = 0.0;  m.r1c1 = a.y;  m.r1c2 = 0.0;  m.r1c3 = b.y;
    m.r2c0 = 0.0;  m.r2c1 = 0.0;  m.r2c2 = a.z;  m.r2c3 = b.z;
    m.r3c0 = 0.0;  m.r3c1 = 0.0;  m.r3c2 = 0.0;  m.r3c3 = 1.0;
    return m;
  };

  export const setM: (n: Mat4, m: Mat4) => Mat4 = (n, m) => {
    m.r0c0 = n.r0c0;  m.r0c1 = n.r0c1;  m.r0c2 = n.r0c2;  m.r0c3 = n.r0c3;
    m.r1c0 = n.r1c0;  m.r1c1 = n.r1c1;  m.r1c2 = n.r1c2;  m.r1c3 = n.r1c3;
    m.r2c0 = n.r2c0;  m.r2c1 = n.r2c1;  m.r2c2 = n.r2c2;  m.r2c3 = n.r2c3;
    m.r3c0 = n.r3c0;  m.r3c1 = n.r3c1;  m.r3c2 = n.r3c2;  m.r3c3 = n.r3c3;
    return m;
  };

  export const set: (r0c0: number, r0c1: number, r0c2: number, r0c3: number,
                     r1c0: number, r1c1: number, r1c2: number, r1c3: number,
                     r2c0: number, r2c1: number, r2c2: number, r2c3: number,
                     r3c0: number, r3c1: number, r3c2: number, r3c3: number,
                     m: Mat4) => Mat4 = (r0c0, r0c1, r0c2, r0c3,
                                         r1c0, r1c1, r1c2, r1c3,
                                         r2c0, r2c1, r2c2, r2c3,
                                         r3c0, r3c1, r3c2, r3c3,
                                         m) => {
    m.r0c0 = r0c0;  m.r0c1 = r0c1;  m.r0c2 = r0c2;  m.r0c3 = r0c3;
    m.r1c0 = r1c0;  m.r1c1 = r1c1;  m.r1c2 = r1c2;  m.r1c3 = r1c3;
    m.r2c0 = r2c0;  m.r2c1 = r2c1;  m.r2c2 = r2c2;  m.r2c3 = r2c3;
    m.r3c0 = r3c0;  m.r3c1 = r3c1;  m.r3c2 = r3c2;  m.r3c3 = r3c3;
    return m;
  };

  /**
   * m = m * n
   * @returns m
   */
  export const mulM: (n: Mat4, m: Mat4) => Mat4 = (n, m) => {
    let c0, c1, c2, c3;
    c0 = m.r0c0 * n.r0c0  +  m.r0c1 * n.r1c0  +  m.r0c2 * n.r2c0  +  m.r0c3 * n.r3c0;
    c1 = m.r0c0 * n.r0c1  +  m.r0c1 * n.r1c1  +  m.r0c2 * n.r2c1  +  m.r0c3 * n.r3c1;
    c2 = m.r0c0 * n.r0c2  +  m.r0c1 * n.r1c2  +  m.r0c2 * n.r2c2  +  m.r0c3 * n.r3c2;
    c3 = m.r0c0 * n.r0c3  +  m.r0c1 * n.r1c3  +  m.r0c2 * n.r2c3  +  m.r0c3 * n.r3c3;
    m.r0c0 = c0;  m.r0c1 = c1;  m.r0c2 = c2;  m.r0c3 = c3;
    c0 = m.r1c0 * n.r0c0  +  m.r1c1 * n.r1c0  +  m.r1c2 * n.r2c0  +  m.r1c3 * n.r3c0;
    c1 = m.r1c0 * n.r0c1  +  m.r1c1 * n.r1c1  +  m.r1c2 * n.r2c1  +  m.r1c3 * n.r3c1;
    c2 = m.r1c0 * n.r0c2  +  m.r1c1 * n.r1c2  +  m.r1c2 * n.r2c2  +  m.r1c3 * n.r3c2;
    c3 = m.r1c0 * n.r0c3  +  m.r1c1 * n.r1c3  +  m.r1c2 * n.r2c3  +  m.r1c3 * n.r3c3;
    m.r1c0 = c0;  m.r1c1 = c1;  m.r1c2 = c2;  m.r1c3 = c3;
    c0 = m.r2c0 * n.r0c0  +  m.r2c1 * n.r1c0  +  m.r2c2 * n.r2c0  +  m.r2c3 * n.r3c0;
    c1 = m.r2c0 * n.r0c1  +  m.r2c1 * n.r1c1  +  m.r2c2 * n.r2c1  +  m.r2c3 * n.r3c1;
    c2 = m.r2c0 * n.r0c2  +  m.r2c1 * n.r1c2  +  m.r2c2 * n.r2c2  +  m.r2c3 * n.r3c2;
    c3 = m.r2c0 * n.r0c3  +  m.r2c1 * n.r1c3  +  m.r2c2 * n.r2c3  +  m.r2c3 * n.r3c3;
    m.r2c0 = c0;  m.r2c1 = c1;  m.r2c2 = c2;  m.r2c3 = c3;
    c0 = m.r3c0 * n.r0c0  +  m.r3c1 * n.r1c0  +  m.r3c2 * n.r2c0  +  m.r3c3 * n.r3c0;
    c1 = m.r3c0 * n.r0c1  +  m.r3c1 * n.r1c1  +  m.r3c2 * n.r2c1  +  m.r3c3 * n.r3c1;
    c2 = m.r3c0 * n.r0c2  +  m.r3c1 * n.r1c2  +  m.r3c2 * n.r2c2  +  m.r3c3 * n.r3c2;
    c3 = m.r3c0 * n.r0c3  +  m.r3c1 * n.r1c3  +  m.r3c2 * n.r2c3  +  m.r3c3 * n.r3c3;
    m.r3c0 = c0;  m.r3c1 = c1;  m.r3c2 = c2;  m.r3c3 = c3;
    return m;
  };

  /**
   * m = m * n
   * @returns m
   */
  export const mulM3: (n: Mat3, m: Mat4) => Mat4 = (n, m) => {
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
   * a = m * b
   * @returns a
   */
  export const mulV: (a: Vec4, b: Vec4, m: Mat4) => Vec4 = (a, b, m) => Vec4.set(
    m.r0c0 * b.x  +  m.r0c1 * b.y  +  m.r0c2 * b.z  +  m.r0c3 * b.w,
    m.r1c0 * b.x  +  m.r1c1 * b.y  +  m.r1c2 * b.z  +  m.r1c3 * b.w,
    m.r2c0 * b.x  +  m.r2c1 * b.y  +  m.r2c2 * b.z  +  m.r2c3 * b.w,
    m.r3c0 * b.x  +  m.r3c1 * b.y  +  m.r3c2 * b.z  +  m.r3c3 * b.w,
    a
  );

  export const fill: (buffer: number[], m: Mat4) => number[] = (buffer, m) => {
    buffer[ 0] = m.r0c0;  buffer[ 1] = m.r1c0;  buffer[ 2] = m.r2c0;  buffer[ 3] = m.r3c0;
    buffer[ 4] = m.r0c1;  buffer[ 5] = m.r1c1;  buffer[ 6] = m.r2c1;  buffer[ 7] = m.r3c1;
    buffer[ 8] = m.r0c2;  buffer[ 9] = m.r1c2;  buffer[10] = m.r2c2;  buffer[11] = m.r3c2;
    buffer[12] = m.r0c3;  buffer[13] = m.r1c3;  buffer[14] = m.r2c3;  buffer[15] = m.r3c3;
    return buffer;
  };

  export const toString: (m: Mat4) => string
      = m => `[ ${pad(m.r0c0)} ${pad(m.r0c1)} ${pad(m.r0c2)} ${pad(m.r0c3)}\n`
          + `  ${pad(m.r1c0)} ${pad(m.r1c1)} ${pad(m.r1c2)} ${pad(m.r1c3)}\n`
          + `  ${pad(m.r2c0)} ${pad(m.r2c1)} ${pad(m.r2c2)} ${pad(m.r2c3)}\n`
          + `  ${pad(m.r3c0)} ${pad(m.r3c1)} ${pad(m.r3c2)} ${pad(m.r3c3)} ]`;
}

export default Mat4;
