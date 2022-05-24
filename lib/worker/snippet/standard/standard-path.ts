import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.resolve = (...pathSegments: string[]): string => {
  return path.resolve(...pathSegments);
};

export default { ...fragment };
