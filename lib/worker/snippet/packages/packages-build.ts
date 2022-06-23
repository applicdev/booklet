import { rollup } from 'https://deno.land/x/drollup@2.58.0+0.20.0/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

// fragment.confirm = async (plain: string = ''): Promise<void> => {
//   const options = {
//     input: './mod.ts',
//     output: {
//       dir: './dist',
//       format: 'es' as const,
//       sourcemap: true,
//     },
//   };

//   const bundle = await rollup(options);
//   await bundle.write(options.output);
//   await bundle.close();
// };

export default { ...fragment };
