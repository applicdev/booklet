import { default as snippet } from '../../snippet/index.ts';

import puppeteer from 'https://deno.land/x/puppeteer@14.1.1/mod.ts';
import { encodeUrl } from 'https://deno.land/x/encodeurl/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ bundle, option }: any): Promise<void> => {
  // ?
  snippet.file.emptyDir(snippet.path.resolve(option.hosted.urn, './~/preview/'));

  // ?
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1538, height: 923, deviceScaleFactor: 2 },
  });
  const page = await browser.newPage();

  const key = '/reader/manual/getting-started'.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  const url = 'data:text/html;charset=UTF-8,';
  const out = snippet.path.resolve(option.hosted.urn, `./~/preview/${key}.png`);

  await page.goto(url);
  await page.setContent(await internal.render());
  await page.screenshot({
    path: out,
    clip: {
      x: 169,
      y: 0,
      width: 1200,
      height: 628,
    },
  });

  await browser.close();
};

internal.render = async (): Promise<string> => {
  return `
    <style>
      html {
        font-size: 16px;
      }
     
      body {
        display: grid;
        justify-content: center;
        align-content: center;

        grid-auto-flow: row;
        gap: 1.25rem;
        padding: 1.25rem;
        
        background: #f2f2f2;
        margin: 0rem 0rem;
      }

      section {
        background: #fcfcfc;
        border-radius: 2px;
        outline: 1px solid #e9e9e9;

        width: 794px;
        height: 1123px;
      }
    </style>

    <section></section>
  `;
};

export default { ...fragment };
