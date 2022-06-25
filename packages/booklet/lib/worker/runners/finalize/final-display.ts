import { default as snippet } from '../../snippet/index.ts';

// import puppeteer from 'https://deno.land/x/puppeteer@14.1.1/mod.ts';
import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts';
import { encodeUrl } from 'https://deno.land/x/encodeurl/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async function* ({ bundle, option }: any): AsyncGenerator<any> {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1538, height: 923, deviceScaleFactor: 1 },
    // defaultViewport: { width: 1200, height: 628, deviceScaleFactor: 1 },
  });

  // ?
  const page = await browser.newPage();

  try {
    const hash = `${option.hosted.path}`.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    const url = `http://localhost:8080${option.hosted.path}`;

    await page.goto(url, { waitUntil: ['networkidle2'] }).catch((err) => {
      console.log({ url, err });
    });

    yield { page, hash };
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
  }
};

export default { ...fragment };
