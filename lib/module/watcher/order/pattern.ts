import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate }: any) => {
  const result = {};

  // [...]

  return { ...result };
};

export default { ...fragment };
