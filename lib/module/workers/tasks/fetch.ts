import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ locate, orderd, tasked }: any) => {
  console.log({ locate, orderd, tasked });

  // ...

  tasked.fetch = {};
};

export default { ...fragment };
