import { default as snippet } from '../../snippet/index.ts';

// import puppeteer from 'https://deno.land/x/puppeteer@14.1.1/mod.ts';
import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts';
import { encodeUrl } from 'https://deno.land/x/encodeurl/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async function* ({ bundle, option }: any): AsyncGenerator<any> {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1538, height: 923, deviceScaleFactor: 1 },
  });

  // ?
  const page = await browser.newPage();

  try {
    const hash = '/booklet/manual/getting-started'.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    const url = 'http://localhost:8080/booklet/manual/getting-started';

    // await page.goto(url, { waitUntil: ['domcontentloaded'] });
    await page.setContent(await internal.render(), { waitUntil: ['domcontentloaded'] });

    yield { page, hash };
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
  }
};

internal.render = async (): Promise<string> => {
  return `
    <link href="./booklet/assets/fonts/BreezeSans.css" rel="stylesheet">
    <link href="./booklet/assets/fonts/BreezeSans-Condensed.css" rel="stylesheet">
    <style>
      html {
        font-size: 16px;
      }

      body, body * {
        all: unset;
        box-sizing: border-box;
      }

      body {
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
        display: grid;
        grid-auto-flow: column;

        background: #fcfcfc;
        border-radius: 2px;
        outline: 1px solid #e9e9e9;

        width: 794px;
        height: 1123px;
      }

      @media print {
        body{
          gap: 0rem;
          padding: 0rem;
          background: transparent;
        }

        section {
          background: transparent;
          border-radius: none;
          outline: none;
        }
      }

      @page {
        size: var(--a4-wid) var(--a4-hei) portrait;
        margin: 0rem 0rem 0rem 0rem;
      }

      .type.watermark {
        margin: 8rem auto;
        font-family: BreezeSans;
        font-size: 4rem;
        color: #252525;
      }
    </style>

    <section>
      <h1 class="type watermark">Booklet</h1>
    </section>
    <section></section>
    <section></section>
  `;
};

export default { ...fragment };
