import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ page, urn }: any): Promise<void> => {
  // await page.emulateMediaType('print');
  // await page.pdf({
  //   path: urn,
  //   format: 'A4',
  //   // printBackground: true,
  //   // displayHeaderFooter: false,
  //   // preferCSSPageSize: true,
  //   displayHeaderFooter: true,
  //   timeout: 3000,
  //   footerTemplate: '<html><head></head><body></body></html>',
  // });
};

export default { ...fragment };
