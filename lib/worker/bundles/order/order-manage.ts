import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ bundle, option }: any, { node }: any): Promise<void> => {
  console.log(node);
  // ...
};

export default { ...fragment };
