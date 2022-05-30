import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ page, urn }: any): Promise<void> => {
  await page.screenshot({
    path: urn,
    // clip: {
    //   x: 169,
    //   y: 0,
    //   width: 1200,
    //   height: 628,
    // },
  });
};

export default { ...fragment };
