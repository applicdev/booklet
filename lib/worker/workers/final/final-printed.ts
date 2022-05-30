import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ page, urn }: any): Promise<void> => {
  const env = Deno.env.toObject();

  if (!('OS' in env) && env.OS != 'Windows_NT') {
    await page.emulateMediaType('print');
    await page.pdf({
      path: urn,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false,
      timeout: 10000,
    });
  }
};

export default { ...fragment };
