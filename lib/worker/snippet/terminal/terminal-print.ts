import * as Colors from 'https://deno.land/std@0.132.0/fmt/colors.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.bold = (plain: string = ''): string => {
  return Colors.bold(plain);
};

fragment.info = async (plain: string = '', state: string = ''): Promise<void> => {
  console.log(Colors.gray(plain), Colors.gray(state));
};

fragment.area = async (plain: string = '', state: string = ''): Promise<void> => {
  console.log('\n===', plain);
};

fragment.note = async (plain: string = '', state: string = ''): Promise<void> => {
  console.log(Colors.green('i '), plain, Colors.bold(state));
};

fragment.done = async (plain: string = '', state: string = ''): Promise<void> => {
  console.log(Colors.green('✔ '), plain, Colors.bold(state));
};

fragment.warn = async (plain: string = '', state: string = ''): Promise<void> => {
  console.log(Colors.red('✘ '), plain, Colors.bold(state));
};

fragment.fail = async (plain: string = '', state: string = ''): Promise<void> => {
  console.log(Colors.red(`\n${plain}`), Colors.gray(`${state}\n`));
};

export default { ...fragment };
