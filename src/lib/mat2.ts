import { fpad as pad } from './maths';
import Vec2 from './vec2';

interface Mat2 {
  r0c0: number, r0c1: number,
  r1c0: number, r1c1: number
}

namespace Mat2 {

  export const of: (r0c0: number, r0c1: number,
                    r1c0: number, r1c1: number) => Mat2
  = (r0c0, r0c1, r1c0, r1c1) => ({
    r0c0, r0c1,
    r1c0, r1c1
  });

  export const zero: () => Mat2 = () => setZero({ } as Mat2);
  export const id:   () => Mat2 = () => setId({ } as Mat2);

  export const setZero: (m: Mat2) => Mat2 = m => {
    m.r0c0 = 0.0;  m.r0c1 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = 0.0;
    return m;
  };

  export const setId: (m: Mat2) => Mat2 = m => {
    m.r0c0 = 1.0;  m.r0c1 = 0.0;
    m.r1c0 = 0.0;  m.r1c1 = 1.0;
    return m;
  };

  export const setRot: (r: number, m: Mat2) => Mat2 = (r, m) => {
    const c = Math.cos(r), s = Math.sin(r);
    m.r0c0 =  c;   m.r0c1 = -s;
    m.r1c0 =  s;   m.r1c1 =  c;
    return m;
  };

  export const setInvRot: (r: number, m: Mat2) => Mat2 = (r, m) => setRot(-r, m);

  export const setM: (n: Mat2, m: Mat2) => Mat2 = (n, m) => {
    m.r0c0 = n.r0c0;  m.r0c1 = n.r0c1;
    m.r1c0 = n.r1c0;  m.r1c1 = n.r1c1;
    return m;
  };

  export const set: (r0c0: number, r0c1: number,
                     r1c0: number, r1c1: number,
                     m: Mat2) => Mat2
  = (r0c0, r0c1, r1c0, r1c1, m) => {
    m.r0c0 = r0c0;  m.r0c1 = r0c1;
    m.r1c0 = r1c0;  m.r1c1 = r1c1;
    return m;
  };

  /**
   * m = m * n
   * @returns m
   */
  export const mulM: (n: Mat2, m: Mat2) => Mat2 = (n, m) => {
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
   * a = m * b
   * @returns a
   */
  export const mulV: (a: Vec2, b: Vec2, m: Mat2) => Vec2 = (a, b, m) => Vec2.set(
    m.r0c0 * b.x  +  m.r0c1 * b.y,
    m.r1c0 * b.x  +  m.r1c1 * b.y,
    a
  );

  export const fill: (buffer: number[], m: Mat2) => number[] = (buffer, m) => {
    buffer[0] = m.r0c0;  buffer[1] = m.r1c0;
    buffer[2] = m.r0c1;  buffer[3] = m.r1c1;
    return buffer;
  };

  export const toString: (m: Mat2) => string
  = m => `[ ${pad(m.r0c0)} ${pad(m.r0c1)}\n`
       + `  ${pad(m.r1c0)} ${pad(m.r1c1)} ]`;
}

export default Mat2;
