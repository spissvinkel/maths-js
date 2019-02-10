import { fpad as pad } from './maths';

interface Vec2 { x: number;  y: number; }

namespace Vec2 {

  export const of: (x: number, y: number) => Vec2 = (x, y) => ({ x, y });

  export const zero:  () => Vec2 = () => setZero({ } as Vec2);
  export const unit:  () => Vec2 = () => setUnit({ } as Vec2);
  export const unitX: () => Vec2 = () => setUnitX({ } as Vec2);
  export const unitY: () => Vec2 = () => setUnitY({ } as Vec2);

  export const copy: (b: Vec2) => Vec2 = b => setV(b, { } as Vec2);

  export const setZero:  (a: Vec2) => Vec2 = a => { a.x = 0.0;  a.y = 0.0;  return a; };
  export const setUnit:  (a: Vec2) => Vec2 = a => { a.x = 1.0;  a.y = 1.0;  return a; };
  export const setUnitX: (a: Vec2) => Vec2 = a => { a.x = 1.0;  a.y = 0.0;  return a; };
  export const setUnitY: (a: Vec2) => Vec2 = a => { a.x = 0.0;  a.y = 1.0;  return a; };

  export const setV: (b: Vec2, a: Vec2) => Vec2 = (b, a) => { a.x = b.x;  a.y = b.y;  return a; };

  export const set: (x: number, y: number, a: Vec2) => Vec2 = (x, y, a) => { a.x = x;  a.y = y;  return a; };

  export const add: (b: Vec2, a: Vec2) => Vec2 = (b, a) => { a.x += b.x;  a.y += b.y;  return a; };
  export const sub: (b: Vec2, a: Vec2) => Vec2 = (b, a) => { a.x -= b.x;  a.y -= b.y;  return a; };

  export const addMul: (b: Vec2, s: number, a: Vec2) => Vec2
  = (b, s, a) => { a.x += b.x * s;  a.y += b.y * s;  return a; };

  export const mulV: (b: Vec2,   a: Vec2) => Vec2 = (b, a) => { a.x *= b.x;  a.y *= b.y;  return a; };
  export const mulS: (s: number, a: Vec2) => Vec2 = (s, a) => { a.x *= s;    a.y *= s;    return a; };
  export const divV: (b: Vec2,   a: Vec2) => Vec2 = (b, a) => { a.x /= b.x;  a.y /= b.y;  return a; };
  export const divS: (s: number, a: Vec2) => Vec2 = (s, a) => { a.x /= s;    a.y /= s;    return a; };

  export const inv: (a: Vec2) => Vec2 = a => { a.x = -a.x;  a.y = -a.y;  return a; };

  export const sqrMag: (a: Vec2) => number = a => a.x * a.x  +  a.y * a.y
  export const mag:    (a: Vec2) => number = a => Math.sqrt(sqrMag(a));
  export const norm:   (a: Vec2) => Vec2   = a => normTo(mag(a), a);

  export const normTo: (mag: number, a: Vec2) => Vec2 = (mag, a) => mag > 0.0 ? mulS(1.0 / mag, a) : a;

  export const dot: (b: Vec2, a: Vec2) => number = (b, a) => a.x * b.x  +  a.y * b.y;

  export const clampV: (min: Vec2, max: Vec2, a: Vec2) => Vec2 = (min, max, a) => {
    a.x = a.x < min.x ? min.x : (a.x > max.x ? max.x : a.x);
    a.y = a.y < min.y ? min.y : (a.y > max.y ? max.y : a.y);
    return a;
  };

  export const clampS: (min: number, max: number, a: Vec2) => Vec2 = (min, max, a) => {
    a.x = a.x < min ? min : (a.x > max ? max : a.x);
    a.y = a.y < min ? min : (a.y > max ? max : a.y);
    return a;
  };

  export const clamp01: (a: Vec2) => Vec2 = a => {
    a.x = a.x < 0.0 ? 0.0 : (a.x > 1.0 ? 1.0 : a.x);
    a.y = a.y < 0.0 ? 0.0 : (a.y > 1.0 ? 1.0 : a.y);
    return a;
  };

  export const toString: ({ x, y }: Vec2) => string = ({ x, y }) => `[ ${pad(x)} ${pad(y)} ]`;
}

export default Vec2;
