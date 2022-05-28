import { default as snippet } from '../../snippet/index.ts';
import puppeteer from 'https://deno.land/x/puppeteer@14.1.1/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ bundle, option }: any): Promise<void> => {
  // ?
  snippet.file.emptyDir(snippet.path.resolve(option.hosted.urn, './~/preview/'));

  // ?
  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: true,
    defaultViewport: { width: 1200, height: 628 },
  });
  const page = await browser.newPage();

  // const pag = pages[0];

  // // for (const pag of pages) {
  // //   try {
  const key = '/reader/manual/getting-started'.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  // // const url = 'http://localhost:8080' + pag.urn;
  const url = 'https://example.com/';
  const out = snippet.path.resolve(option.hosted.urn, `./~/preview/${key}.png`);

  // console.log({ key, url, out });

  console.log(out);

  await page.goto(url);
  await page.screenshot({ path: out });
  // // } catch (err) {
  // //   console.log(err);
  // // }
  // // }

  await browser.close();
};

export default { ...fragment };
