import { default as snippet } from '../../../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked, writes }: any) => {
  // [...]
};

export default { ...fragment };
