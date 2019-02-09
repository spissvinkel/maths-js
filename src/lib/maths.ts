import { prePad } from './util';

export const TWO_PI      = Math.PI * 2.0;
export const PI_BY_2     = Math.PI / 2.0;
export const PI_BY_180   = Math.PI / 180.0;
export const TWO_PI_ROOT = Math.sqrt(Math.PI * 2.0);

export const cotan: (angle: number) => number = angle => 1.0 / Math.tan(angle);

export const deg2rad: (degrees: number) => number = degrees => degrees * PI_BY_180;

export const clamp: (min: number, max: number, x: number) => number
    = (min, max, x) => x < min ? min : (x > max ? max : x);

export const clamp01: (x: number) => number = x => x < 0.0 ? 0.0 : (x > 1.0 ? 1.0 : x);

export const fpad: (n: number) => string = n => prePad(n.toFixed(4), ' ', 10);
