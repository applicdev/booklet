import { setHandler } from 'https://deno.land/x/ctrlc/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.whenClosed = async (): Promise<void> => {
  return new Promise((resolve) => {
    setHandler(resolve);
  });
};

export default { ...fragment };
