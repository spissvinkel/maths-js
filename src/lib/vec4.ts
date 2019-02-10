import { fpad as pad } from './maths';

interface Vec4 { x: number;  y: number;  z: number;  w: number; }

namespace Vec4 {

  export const of: (x: number, y: number, z: number, w: number) => Vec4 = (x, y, z, w) => ({ x, y, z, w });

  export const zero:  () => Vec4 = () => setZero({ } as Vec4);
  export const unit:  () => Vec4 = () => setUnit({ } as Vec4);
  export const unitX: () => Vec4 = () => setUnitX({ } as Vec4);
  export const unitY: () => Vec4 = () => setUnitY({ } as Vec4);
  export const unitZ: () => Vec4 = () => setUnitZ({ } as Vec4);
  export const unitW: () => Vec4 = () => setUnitW({ } as Vec4);

  export const copy: (b: Vec4) => Vec4 = b => setV(b, { } as Vec4);

  export const setZero:  (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  a.w = 0.0;  return a; };
  export const setUnit:  (a: Vec4) => Vec4 = a => { a.x = 1.0;  a.y = 1.0;  a.z = 1.0;  a.w = 1.0;  return a; };
  export const setUnitX: (a: Vec4) => Vec4 = a => { a.x = 1.0;  a.y = 0.0;  a.z = 0.0;  a.w = 0.0;  return a; };
  export const setUnitY: (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 1.0;  a.z = 0.0;  a.w = 0.0;  return a; };
  export const setUnitZ: (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 1.0;  a.w = 0.0;  return a; };
  export const setUnitW: (a: Vec4) => Vec4 = a => { a.x = 0.0;  a.y = 0.0;  a.z = 0.0;  a.w = 1.0;  return a; };

  export const setV: (b: Vec4, a: Vec4) => Vec4
  = (b, a) => { a.x = b.x;  a.y = b.y;  a.z = b.z;  a.w = b.w;  return a; };

  export const set: (x: number, y: number, z: number, w: number, a: Vec4) => Vec4
  = (x, y, z, w, a) => { a.x = x;  a.y = y;  a.z = z;  a.w = w;  return a; };

  export const toString: ({ x, y, z, w }: Vec4) => string
  = ({ x, y, z, w }) => `[ ${pad(x)} ${pad(y)} ${pad(z)} ${pad(w)} ]`;
}

export default Vec4;
