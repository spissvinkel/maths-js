namespace Maths {

  export const TWO_PI      = Math.PI * 2.0;
  export const PI_BY_2     = Math.PI / 2.0;
  export const PI_BY_180   = Math.PI / 180.0;
  export const TWO_PI_ROOT = Math.sqrt(Math.PI * 2.0);

  export const cotan: (angle: number) => number = angle => 1.0 / Math.tan(angle);

  export const deg2rad: (degrees: number) => number = degrees => degrees * PI_BY_180;

  export const clamp: (x: number, min: number, max: number) => number
    = (x, min, max) => x < min ? min : (x > max ? max : x);

  export const clamp01: (x: number) => number = x => clamp(x, 0.0, 1.0);

  export const fpad: (n: number) => string = n => {
    const d = 4, c = ' ', w = 10;
    let s = n.toFixed(d);
    while (s.length < w) s = c + s;
    return s;
  };
}

export default Maths;
