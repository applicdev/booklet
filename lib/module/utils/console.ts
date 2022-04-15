import * as Colors from 'https://deno.land/std@0.132.0/fmt/colors.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.info = async (plain: string = '', state: string = ''): Promise<void> => {
  console.log(Colors.gray('[info] '), Colors.gray(plain), Colors.gray(state));
};

fragment.done = async (plain: string = '', state: string = ''): Promise<void> => {
  console.log(Colors.green('✔ '), plain, Colors.bold(state));
};

fragment.warn = async (plain: string = '', state: string = ''): Promise<void> => {
  console.log(Colors.red('✘ '), plain, Colors.bold(state));
};

export default { ...fragment };
