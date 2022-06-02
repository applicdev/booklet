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
  await fragment.initialize({ bundle, option });
  yield { bundle, option };

  // // ?
  // await fragment.order({ bundle, option });
  // yield { bundle, option };

  // // ?
  // await fragment.tasks({ bundle, option });
  // yield { bundle, option };

  // ---
  const plain = await internal.render();
  const out = { urn: snippet.path.resolve(option!.hosted!.urn, './manual/getting-started/index.html') };

  await snippet.file.emptyDir(snippet.path.dirname(out.urn));
  await snippet.file.writeTextFile(out.urn, plain);
  // ---

  // ?
  await fragment.finalize({ bundle, option });
  yield { bundle, option };
}

fragment.initialize = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // ? empty and ensure output directory
  await snippet.file.emptyDir(hosted.urn);
  await snippet.file.emptyDir(output.urn);
};

// fragment.order = async ({ bundle, option }: any): Promise<any> => {
//   // ...
// };

// fragment.tasks = async ({ bundle, option }: any): Promise<any> => {
//   // ...
// };

fragment.finalize = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // ? ensure assets
  const fil = { urn: snippet.path.dirname(snippet.path.fromFileUrl(import.meta.url)) };
  const ass = { urn: snippet.path.resolve(option.hosted.urn, './assets/') };

  await snippet.file.copy(snippet.path.resolve(fil.urn, '../assets/'), ass.urn);

  // ? ensure preview and printed output directories
  const pri = { urn: snippet.path.resolve(option.hosted.urn, './~/printed/') };
  const pre = { urn: snippet.path.resolve(option.hosted.urn, './~/preview/') };

  snippet.file.emptyDir(pri.urn);
  snippet.file.emptyDir(pre.urn);

  // ? create previews and print pages
  for await (const dis of bundles.finalize.display({ bundle, option })) {
    await bundles.finalize.preview({ page: dis.page, urn: snippet.path.resolve(pre.urn, `./${dis.hash}.png`) });
    await bundles.finalize.printed({ page: dis.page, urn: snippet.path.resolve(pri.urn, `./${dis.hash}.pdf`) });
  }

  // ? ensure github details
  const noj = { urn: './.nojekyll', plain: '' };
  const rea = { urn: './README.md', plain: 'This branch is automated with [GitHub Actions](https://github.com/features/actions). Its content should not be manually edited.' };

  await Promise.all([
    snippet.file.writeTextFile(snippet.path.resolve(hosted.urn, noj.urn), noj.plain), //
    snippet.file.writeTextFile(snippet.path.resolve(hosted.urn, rea.urn), rea.plain),
  ]);
};

// ---
internal.render = async (): Promise<string> => {
  return `
    <link href="/booklet/assets/fonts/BreezeSans.css" rel="stylesheet">

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
        size: 794px 1123px portrait;
        margin: 0rem 0rem 0rem 0rem;
      }

      .type.watermark {
        font-family: 'Breeze Sans';
        font-size: 4rem;
        
        margin: 8rem auto;
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
// ---
