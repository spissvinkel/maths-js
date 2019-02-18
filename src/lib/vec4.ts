import Maths from './maths';

interface Vec4 { x: number;  y: number;  z: number;  w: number; }

namespace Vec4 {

  /** @ignore @private */
  const pad = Maths.fpad;

  export const of: (x: number, y: number, z: number, w: number) => Vec4 = (x, y, z, w) => ({ x, y, z, w } as Vec4);

  export const ofV: (b: Vec4) => Vec4 = b => setV({ } as Vec4, b);

  export const zero:  () => Vec4 = () => setZero({ } as Vec4);
  export const one:   () => Vec4 = () => setOne({ } as Vec4);
  export const unitX: () => Vec4 = () => setUnitX({ } as Vec4);
  export const unitY: () => Vec4 = () => setUnitY({ } as Vec4);
  export const unitZ: () => Vec4 = () => setUnitZ({ } as Vec4);
  export const unitW: () => Vec4 = () => setUnitW({ } as Vec4);

  export const setZero:  (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  a.w = 0.0;  return a; };
  export const setOne:   (a: Vec4) => Vec4 = a => { a.x = 1.0;  a.y = 1.0;  a.z = 1.0;  a.w = 1.0;  return a; };
  export const setUnitX: (a: Vec4) => Vec4 = a => { a.x = 1.0;  a.y = 0.0;  a.z = 0.0;  a.w = 0.0;  return a; };
  export const setUnitY: (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 1.0;  a.z = 0.0;  a.w = 0.0;  return a; };
  export const setUnitZ: (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 1.0;  a.w = 0.0;  return a; };
  export const setUnitW: (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  a.w = 1.0;  return a; };

  export const setV: (a: Vec4, b: Vec4) => Vec4
  = (a, b) => { a.x = b.x;  a.y = b.y;  a.z = b.z;  a.w = b.w;  return a; };

  export const set: (a: Vec4, x: number, y: number, z: number, w: number) => Vec4
  = (a, x, y, z, w) => { a.x = x;  a.y = y;  a.z = z;  a.w = w;  return a; };

  export const toString: (a: Vec4) => string = a => `[ ${pad(a.x)} ${pad(a.y)} ${pad(a.z)} ${pad(a.w)} ]`;
}

export default Vec4;
