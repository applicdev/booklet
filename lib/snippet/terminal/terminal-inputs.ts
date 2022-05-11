import * as Colors from 'https://deno.land/std@0.132.0/fmt/colors.ts';
import { readLines } from 'https://deno.land/std@0.132.0/io/buffer.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.confirm = async (plain: string = ''): Promise<boolean> => {
  Deno.stdout.write(new TextEncoder().encode(`${Colors.green('?')} ${Colors.bold(plain)} (Y/n) `));

  let value = await internal.promptString();

  console.log('');
  return ['y', 'yes', ''].includes(value.toLowerCase());
};

internal.promptString = async () => {
  for await (const line of readLines(Deno.stdin)) {
    return line;
  }
};

internal.clearLine = () => {
  Deno.stdout.write(new TextEncoder().encode('\x1b' + '[A'));
  Deno.stdout.write(new TextEncoder().encode('\x1b' + '[K'));
};

export default { ...fragment };
