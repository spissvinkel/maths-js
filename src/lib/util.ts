export const prePad: (s: string, c: string, n: number) => string = (s, c, n) => {
  let t = '' + s;
  const u = '' + c;
  while (t.length < n) t = u + t;
  return t;
};

export const postPad: (s: string, c: string, n: number) => string = (s, c, n) => {
  let t = '' + s;
  const u = '' + c;
  while (t.length < n) t = t + u;
  return t;
};

export const pad: (s: string, c: string, n: number, pre: boolean) => string
    = (s, c, n, pre) => pre ? prePad(s, c, n) : postPad(s, c, n);
