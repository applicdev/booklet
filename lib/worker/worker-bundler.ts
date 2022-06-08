import { default as snippet } from './snippet/index.ts';
import { default as bundles } from './bundles/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

export async function* bundler(option: InterfaceOption): AsyncGenerator<
  { [prop: string]: any }, //
  void,
  void
> {
  const bundle: any = { locate: {}, orderd: {}, tasked: {} };

  // ?
  snippet.print.area('Initialize');
  await fragment.initialize({ bundle, option });
  yield { bundle, option };

  // ?
  snippet.print.area('Order');
  await fragment.order({ bundle, option });
  yield { bundle, option };

  // ?
  snippet.print.area('Preps');
  await fragment.preps({ bundle, option });
  yield { bundle, option };

  // ?
  snippet.print.area('Tasks');
  await fragment.tasks({ bundle, option });
  yield { bundle, option };

  // ---
  await fragment.debug({ bundle, option });
  // ---

  // ?
  snippet.print.area('Finalize');
  await fragment.finalize({ bundle, option });
  yield { bundle, option };
}

fragment.initialize = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // ? empty and ensure output directory
  await snippet.file.emptyDir(hosted.urn);
  await snippet.file.emptyDir(output.urn);
};

fragment.order = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  for await (const fil of bundles.order.traverse({ bundle, option })) {
    console.log(fil);
    // [...]
  }
};

fragment.preps = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // [...]
};

fragment.tasks = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // [...]
};

fragment.finalize = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // ? ensure static files
  const fil = { urn: snippet.path.dirname(snippet.path.fromFileUrl(import.meta.url)) };
  const ass = { urn: snippet.path.resolve(option.hosted.urn, './assets/') };

  await snippet.file.copy(snippet.path.resolve(fil.urn, '../assets/'), ass.urn);

  // ? create previews and print pages
  const pri = { urn: snippet.path.resolve(option.hosted.urn, './~/printed/') };
  const pre = { urn: snippet.path.resolve(option.hosted.urn, './~/preview/') };

  snippet.file.emptyDir(pri.urn);
  snippet.file.emptyDir(pre.urn);

  for await (const dis of bundles.finalize.display({ bundle, option })) {
    await bundles.finalize.preview({ page: dis.page, urn: snippet.path.resolve(pre.urn, `./${dis.hash}.png`) });
    await bundles.finalize.printed({ page: dis.page, urn: snippet.path.resolve(pri.urn, `./${dis.hash}.pdf`) });
  }

  // ? create github configs
  const noj = { urn: './.nojekyll', plain: '' };
  const rea = { urn: './README.md', plain: 'This branch is automated with [GitHub Actions](https://github.com/features/actions). Its content should not be manually edited.' };

  await Promise.all([
    snippet.file.writeTextFile(snippet.path.resolve(hosted.urn, noj.urn), noj.plain), //
    snippet.file.writeTextFile(snippet.path.resolve(hosted.urn, rea.urn), rea.plain),
  ]);
};

// ---
fragment.debug = async ({ bundle, option }: any): Promise<any> => {
  const plain = await internal.debugRender({ bundle, option });
  const out = { urn: snippet.path.resolve(option.hosted!.urn, `./manual/getting-started/index.html`) };

  await snippet.file.emptyDir(snippet.path.dirname(out.urn));
  await snippet.file.writeTextFile(out.urn, plain);
};

internal.debugRender = async ({ bundle, option }: any): Promise<string> => {
  return `
<html lang="en-NL">
  <head>
    <meta charset="UTF-8" />
    <meta content="noarchive, notranslate, noindex" name="robots" />
    <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport" />

    <!---->
    <title>&#65279;</title>
    <!---->

    <!---->
    <meta content="#f6f6f6" name="theme-color" />
    <meta content="#f6f6f6" name="theme-color" media="(prefers-color-scheme: light)" />
    <meta content="#171b22" name="theme-color" media="(prefers-color-scheme: dark)" />
    <!---->

    <!---->
    <link href="${option.hosted.path}assets/fonts/BreezeSans.css" rel="stylesheet" />
    <!---->

    <style>
      html {
        font-size: 16px;
      }

      body,
      body * {
        all: unset;
        box-sizing: border-box;
      }

      body {
        background: #f6f6f6;

        overflow: hidden scroll;
        overflow: hidden overlay;
      }

      main {
        display: grid;
        justify-content: center;

        grid-auto-flow: row;
        gap: 1.25rem;
        padding: 1.25rem;

        width: 100vw;
        margin: 0rem 0rem;
      }

      header {
        display: flex;
        flex-direction: row;
        align-items: center;

        height: 3.125rem;
        padding: 0rem 2.5rem;
      }

      section {
        display: grid;
        grid-auto-flow: column;
        align-items: flex-start;

        width: 794px;
        height: 1123px;

        background: #fcfcfc;
        border-radius: 2px;
        outline: 1px solid #e9e9e9;

        box-shadow: 0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%);
      }

      @media print {
        body {
          margin: 0rem;
          padding: 0rem;
        }

        main {
          gap: 0rem;
          padding: 0rem;
          background: transparent;
        }

        section {
          background: transparent;
          border-radius: none;
          outline: none;
          box-shadow: none;
        }
      }

      @page {
        margin: 0rem 0rem 0rem 0rem;
      }

      .type.watermark {
        font-family: 'Breeze Sans';
        font-size: 4rem;

        margin: 8rem auto;
        color: #252525;
      }
    </style>

    <style>
      .nav.breadcrumb > ol {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;

        margin-bottom: 0;
        padding: 0;
        background: none;

        border-radius: 0.25rem;
        list-style: none;
      }

      .nav.breadcrumb > ol > .breadcrumb-item {
        display: inline-block;
      }

      .nav.breadcrumb > ol > .breadcrumb-item .item-text,
      .nav.breadcrumb > ol > .breadcrumb-item::after {
        display: inline-block;
        vertical-align: middle;

        font-family: 'Breeze Sans';
        font-size: 0.875rem;
        font-weight: 500;
        line-height: calc(0.875rem + 0.5rem);
        color: #6e6e6e;
        vertical-align: middle;
      }

      .nav.breadcrumb > ol > .breadcrumb-item:not(:last-child)::after {
        content: '›';

        margin: 0rem 0.25rem 0.1rem;
        color: #9e9e9e;
      }

      .nav.breadcrumb > ol > .breadcrumb-item:first-child .item-text {
        font-weight: 500;
        color: #c24d63;
      }

      @media print {
        header {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <nav class="nav breadcrumb">
        <ol>
          <li class="breadcrumb-item"><a class="item-text" href="/booklet">Booklet</a></li>
          <!-- breadcrumb-item here!! -->
          <li class="breadcrumb-item"><a href="#" class="item-text">Getting Started</a></li>
        </ol>
      </nav>
    </header>

    <main>
      <section>
        <h1 class="type watermark">Booklet</h1>
      </section>
      <section></section>
      <section></section>
    </main>
  </body>
</html>
  `;
};
// ---
