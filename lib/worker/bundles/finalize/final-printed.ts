import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ page, urn }: any): Promise<void> => {
  // await page.emulateMediaType('print');
  await page.pdf({
    path: urn,
    format: 'A4',

    displayHeaderFooter: false,
    printBackground: true,

    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  });
};

export default { ...fragment };
