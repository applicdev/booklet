// import { bundle } from 'https://deno.land/x/bundler@0.8.1/mod.ts';

// import * as file from 'https://deno.land/std@0.78.0/fs/mod.ts';
// import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

// const fragment: { [prop: string]: any } = {};
// const internal: { [prop: string]: any } = {};

// // ---
// fragment.test = async (): Promise<void> => {
//   const inputMap = {
//     'src/index.ts': `console.log("Hello World")`,
//   };

//   const fileMap = {
//     'src/index.ts': 'dist/index.js',
//   };

//   const { outputMap, cacheMap, graph } = await bundle(inputMap, { fileMap });
//   for (const [output, source] of Object.entries(outputMap)) {
//     await file.ensureFile(output);
//     await Deno.writeTextFile(output, source as string);
//   }
// };
// // ---

// export default { ...fragment };
