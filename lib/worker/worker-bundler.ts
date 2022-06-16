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
  // await fragment.preps({ bundle, option });
  // yield { bundle, option };

  // // ?
  // await fragment.tasks({ bundle, option });
  // yield { bundle, option };

  // ---
  await fragment.debug({ bundle, option });
  // ---

  // ?
  // await fragment.finalize({ bundle, option });
  // yield { bundle, option };
}

fragment.initialize = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  // ? empty and ensure output directory
  await snippet.file.emptyDir(hosted.urn);
  await snippet.file.emptyDir(output.urn);

  // ? ensure static files
  const fil = { urn: snippet.path.dirname(snippet.path.fromFileUrl(import.meta.url)) };
  const ass = { urn: snippet.path.resolve(option.hosted.urn, './assets/') };
  const img = { urn: snippet.path.resolve(option.hosted.urn, './images/') };

  await snippet.file.copy(snippet.path.resolve(fil.urn, '../assets/'), ass.urn);
  await snippet.file.copy(snippet.path.resolve(fil.urn, '../images/'), img.urn);
};

fragment.order = async ({ bundle, option }: any): Promise<any> => {
  const { hosted, output } = option;

  for await (const node of bundles.order.traverse({ bundle, option })) {
    bundles.order.manage({ bundle, option }, { node });
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

  // ? create previews and print pages
  const pri = { urn: snippet.path.resolve(option.hosted.urn, './output/') };
  const pre = { urn: snippet.path.resolve(option.hosted.urn, './output/') };

  snippet.file.emptyDir(pri.urn);
  snippet.file.emptyDir(pre.urn);

  for await (const dis of bundles.finalize.display({ bundle, option })) {
    await bundles.finalize.preview({ bundle, option }, { page: dis.page, urn: snippet.path.resolve(pre.urn, `./${dis.hash}.png`) });
    await bundles.finalize.printed({ bundle, option }, { page: dis.page, urn: snippet.path.resolve(pri.urn, `./${dis.hash}.pdf`) });
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
  const out = { urn: snippet.path.resolve(option.hosted!.urn, `./overview/index.html`) };
  const man = { urn: snippet.path.resolve(option.hosted!.urn, `./booklet.webmanifest`) };
  const ser = { urn: snippet.path.resolve(option.hosted!.urn, `./booklet.service-worker.js`) };

  await snippet.file.emptyDir(snippet.path.dirname(out.urn));
  await snippet.file.writeTextFile(out.urn, plain);
  await snippet.file.writeTextFile(ser.urn, `self.addEventListener('fetch', () => {});`);
  await snippet.file.writeTextFile(
    man.urn,
    JSON.stringify({
      name: 'Booklet',
      short_name: 'Booklet',
      start_url: `${option.hosted!.path}overview`,
      display: 'fullscreen',
      display_override: ['fullscreen', 'window-controls-overlay'],
      background_color: '#f6f6f7',
      theme_color: '#f6f6f7',
      icons: [
        ...[512, 384, 192, 152, 144, 128, 96, 72].map((size) => ({
          src: `${option.hosted!.path}images/${size}w/booklet.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
        })),
        ...[512, 384, 192, 152, 144, 128, 96, 72].map((size) => ({
          src: `${option.hosted!.path}images/${size}w/booklet-maskable.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
          purpose: 'maskable',
        })),
      ],
    })
  );
};

internal.debugRender = async ({ bundle, option }: any): Promise<string> => {
  return `
<html lang="en-NL">
  <head>
    <meta charset="UTF-8" />
    <meta content="noarchive, notranslate, noindex" name="robots" />
    <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport" />

    <!---->
    <title>Debugging-Document</title>
    <!---->

    <!---->
    <meta content="#f6f6f7" name="theme-color" />
    <meta content="#f6f6f7" name="theme-color" media="(prefers-color-scheme: light)" />
    <meta content="#171b22" name="theme-color" media="(prefers-color-scheme: dark)" />
    <link rel="manifest" href="${option.hosted!.path}booklet.webmanifest" />
    <!---->

    <!---->
    <link href="${option.hosted!.path}/images/192w/booklet.png" rel="icon" />
    <link href="${option.hosted!.path}assets/stylesheets/all.css" rel="stylesheet" />
    <!---->

    <!---->
    <script>
      if ('serviceWorker' in navigator) navigator.serviceWorker.register('${option.hosted!.path}booklet.service-worker.js');
      globalThis.booklet = {
        hosted: { path: ${option.hosted!.path} },
        bundle: { }
      }
    </script>
    <script defer="" src="${option.hosted!.path}/assets/modules/booklet-inline.js"></script>
    <!---->
  </head>
  <body>
  </body>
</html>
`;
};
// ---
