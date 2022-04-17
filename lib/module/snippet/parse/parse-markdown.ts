import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.parse = async (plain: string = ''): Promise<any> => {
  const md = Marked.parse(plain);
  return { ...md.meta, content: md.content };
};

export default { ...fragment };
