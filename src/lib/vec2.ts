import Maths from './maths';

interface Vec2 { x: number;  y: number; }

namespace Vec2 {

  /** @ignore @private */
  const pad = Maths.fpad;

  export const of: (x: number, y: number) => Vec2 = (x, y) => ({ x, y } as Vec2);

  export const ofV: (b: Vec2) => Vec2 = b => setV({ } as Vec2, b);

  export const zero:  () => Vec2 = () => setZero({ } as Vec2);
  export const one:   () => Vec2 = () => setOne({ } as Vec2);
  export const unitX: () => Vec2 = () => setUnitX({ } as Vec2);
  export const unitY: () => Vec2 = () => setUnitY({ } as Vec2);

  export const setZero:  (a: Vec2) => Vec2 = a => { a.x = 0.0;  a.y = 0.0;  return a; };
  export const setOne:   (a: Vec2) => Vec2 = a => { a.x = 1.0;  a.y = 1.0;  return a; };
  export const setUnitX: (a: Vec2) => Vec2 = a => { a.x = 1.0;  a.y = 0.0;  return a; };
  export const setUnitY: (a: Vec2) => Vec2 = a => { a.x = 0.0;  a.y = 1.0;  return a; };

  export const setV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => { a.x = b.x;  a.y = b.y;  return a; };

  export const set: (a: Vec2, x: number, y: number) => Vec2 = (a, x, y) => { a.x = x;  a.y = y;  return a; };

  export const addV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => { a.x += b.x;  a.y += b.y;  return a; };
  export const subV: (a: Vec2, b: Vec2) => Vec2 = (a, b) => { a.x -= b.x;  a.y -= b.y;  return a; };

  export const addMul: (a: Vec2, b: Vec2, s: number) => Vec2
  = (a, b, s) => { a.x += b.x * s;  a.y += b.y * s;  return a; };

  export const mulV: (a: Vec2,   b: Vec2) => Vec2 = (a, b) => { a.x *= b.x;  a.y *= b.y;  return a; };
  export const mul:  (a: Vec2, s: number) => Vec2 = (a, s) => { a.x *= s;    a.y *= s;    return a; };
  export const divV: (a: Vec2,   b: Vec2) => Vec2 = (a, b) => { a.x /= b.x;  a.y /= b.y;  return a; };
  export const div:  (a: Vec2, s: number) => Vec2 = (a, s) => { a.x /= s;    a.y /= s;    return a; };

  export const inv: (a: Vec2) => Vec2 = a => { a.x = -a.x;  a.y = -a.y;  return a; };

  export const sqrMag: (a: Vec2) => number = a => a.x * a.x  +  a.y * a.y
  export const mag:    (a: Vec2) => number = a => Math.sqrt(sqrMag(a));
  export const norm:   (a: Vec2) => Vec2   = a => normTo(a, mag(a));

  export const normTo: (a: Vec2, mag: number) => Vec2 = (a, mag) => mag > 0.0 ? mul(a, 1.0 / mag) : a;

  export const dot: (a: Vec2, b: Vec2) => number = (a, b) => a.x * b.x  +  a.y * b.y;

  export const clampV: (a: Vec2, min: Vec2, max: Vec2) => Vec2 = (a, min, max) => {
    a.x = a.x < min.x ? min.x : (a.x > max.x ? max.x : a.x);
    a.y = a.y < min.y ? min.y : (a.y > max.y ? max.y : a.y);
    return a;
  };

  export const clamp: (a: Vec2, min: number, max: number) => Vec2 = (a, min, max) => {
    a.x = a.x < min ? min : (a.x > max ? max : a.x);
    a.y = a.y < min ? min : (a.y > max ? max : a.y);
    return a;
  };

  export const clamp01: (a: Vec2) => Vec2 = a => {
    a.x = a.x < 0.0 ? 0.0 : (a.x > 1.0 ? 1.0 : a.x);
    a.y = a.y < 0.0 ? 0.0 : (a.y > 1.0 ? 1.0 : a.y);
    return a;
  };

  export const toString: (a: Vec2) => string = a => `[ ${pad(a.x)} ${pad(a.y)} ]`;
}

export default Vec2;
