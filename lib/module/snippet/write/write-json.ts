const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import { default as snippet } from '../index.ts';

fragment.create = async ({ urn, val, zip }: { urn: string; val: { [prop: string]: any }; zip?: boolean }): Promise<any> => {
  await snippet.write.text({ urn, val: JSON.stringify(val), zip });
};

export default { ...fragment };
