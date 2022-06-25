import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.dirname = (urn: string): string => {
  return path.dirname(urn);
};

fragment.fromFileUrl = (urn: string): string => {
  return path.fromFileUrl(urn);
};

fragment.resolve = (...pathSegments: string[]): string => {
  return path.resolve(...pathSegments);
};

export default { ...fragment };
