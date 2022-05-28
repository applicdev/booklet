import { mime } from 'https://deno.land/x/mimetypes@v1.0.0/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.getType = (path: string): string | undefined => {
  return mime.getType(path);
};

export default { ...fragment };
