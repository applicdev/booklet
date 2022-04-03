import * as Colors from 'https://deno.land/std@0.132.0/fmt/colors.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.audit = async (plain: string, start?: boolean): Promise<void> => {
  console.log(start ? Colors.green('\ne ') : Colors.gray('+ '), plain);
};

export default { ...fragment };
