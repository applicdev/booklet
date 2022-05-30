import { default as snippet } from '../../snippet/index.ts';

import puppeteer from 'https://deno.land/x/puppeteer@14.1.1/mod.ts';
import { encodeUrl } from 'https://deno.land/x/encodeurl/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async function* ({ bundle, option }: any): AsyncGenerator<any> {
  const browser = await puppeteer.launch({
    dumpio: true,
    headless: true,
    args: ['--disable-gpu', '--no-sandbox', '--disable-extensions'],
    defaultViewport: { width: 1538, height: 923, deviceScaleFactor: 1 },
  });

  // ?
  const page = await browser.newPage();

  try {
    const hash = '/reader/manual/getting-started'.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    // const url = 'https://google.com'; //'data:text/html;charset=UTF-8,' + escape(await internal.render());

    // await page.goto(url, { waitUntil: ['domcontentloaded'] });
    await page.setContent(await internal.render(), { waitUntil: ['domcontentloaded'] });

    yield { page, hash };
  } catch (err) {
    console.log(err);
  }

  console.log('done');

  await browser.close();
};

internal.render = async (): Promise<string> => {
  return `
    <style>
      html {
        font-size: 16px;
      }

      body, body * { 
        all: unset; 
        box-sizing: border-box; 
      }

      body {
        width: 100vw;
        height: 100vh;
        margin: 0rem 0rem;

        overflow: hidden;
      }

      main {
        position: fixed;
        inset: 0rem 0rem;

        display: grid;
        justify-content: center;
        
        grid-auto-flow: row;
        gap: 1.25rem;
        padding: 1.25rem;
        
        width: 100%;
        margin: 0rem 0rem;
        
        background: #f6f8fa;
        
        overflow: hidden scroll;
        overflow: hidden overlay;
      }

      section {
        background: #fcfcfc;
        border-radius: 2px;
        outline: 1px solid #e9e9e9;

        width: 794px;
        height: 1123px;
      }
    </style>

    <main>
      <section></section>
    </main>
  `;
};

export default { ...fragment };
