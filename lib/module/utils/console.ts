import * as Colors from 'https://deno.land/std@0.132.0/fmt/colors.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.info = async (plain: string): Promise<void> => {
  console.log(Colors.gray('[INFO]'), Colors.gray(plain));
};

console.info = async (plain: string): Promise<void> => {
  console.log(Colors.gray('i '), Colors.gray(plain));
};

export default { ...fragment };
