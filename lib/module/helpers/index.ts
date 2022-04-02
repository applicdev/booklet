// import * as Colors from 'https://deno.land/std@0.132.0/fmt/colors.ts';
// import Ask from 'https://deno.land/x/ask@1.0.6/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

// fragment.confirm = async (plain: string): Promise<boolean> => {
//   const result = await new Ask().prompt([
//     {
//       name: 'value',
//       message: plain,
//       type: 'confirm',
//     },
//   ]);

//   console.log(result);

//   return !!result.value;
// };

fragment.audit = async (host: string, plain: string): Promise<void> => {
  // console.log(Colors.rgb24(host, 0x5674e0), plain);
  console.log(host, plain);
};

export default { ...fragment };
