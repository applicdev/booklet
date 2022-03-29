import { defined } from './defined/index.ts';
import { snippet } from './snippet/index.ts';
import { runners } from './runners/index.ts';

// const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

// 📦 ensure correct property values and apply standard; when required
// 🏷️ index and order relevant files from the work directories
// 🗃️ run all interlinked tasks
// 🗂️ run remaining tasks in parallel
// ❌ stop write; when another change event was instantiated

export async function* bundler(option: defined['runner:option']): defined['bundler*'] {
  const bundle: defined['runner:bundle'] = {};

  // 🔍 locate the work directories
  await internal.whenTraverse({ bundle, option });

  // ✔️ ensure, and clear out contents of, output directory
  await internal.whenPrepared({ bundle, option });

  // ---
  await internal.debug({ bundle, option });
  // ---

  // ✏️ clean-up output directory
  const fin = performance.now();
  await internal.whenComplete({ bundle, option });
  snippet.print.done('finalized', `took ${~~(performance.now() - fin)} ms`);

  yield { bundle, option };
}

internal.whenTraverse = async ({ bundle, option }: any): Promise<void> => {
  const { hosted, output } = option;

  for await (const node of runners.order.traverse({ bundle, option })) {
    runners.order.manage({ bundle, option }, { node });
    // [...]
  }
};

internal.whenPrepared = async ({ bundle, option }: any): Promise<void> => {
  const { hosted, output } = option;

  // ? empty and ensure output directory
  await snippet.file.emptyDir(hosted.urn);
  await snippet.file.emptyDir(output.urn);

  // ? ensure static files
  const asset = { urn: snippet.path.resolve(option.hosted.urn, './assets/') };
  const modul = { urn: snippet.path.resolve(option.module.urn, './packages/booklet-content/lib/assets/') };

  await snippet.file.copy(modul.urn, asset.urn);
};

internal.whenComplete = async ({ bundle, option }: any): Promise<void> => {
  const { hosted, output } = option;

  // ? create previews and print pages
  const previ = { urn: snippet.path.resolve(option.hosted.urn, './output/') };
  const print = { urn: snippet.path.resolve(option.hosted.urn, './output/') };

  snippet.file.emptyDir(previ.urn);
  // snippet.file.emptyDir(print.urn);

  for await (const dis of runners.finalize.display({ bundle, option })) {
    await runners.finalize.preview({ bundle, option }, { page: dis.page, urn: snippet.path.resolve(previ.urn, `./${dis.hash}.png`) });
    await runners.finalize.printed({ bundle, option }, { page: dis.page, urn: snippet.path.resolve(print.urn, `./${dis.hash}.pdf`) });
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
internal.debug = async ({ bundle, option }: any): Promise<void> => {
  // ?
  //const fal = { urn: snippet.path.resolve(option.hosted!.urn, `./404.html`) };
  const doc = { urn: snippet.path.resolve(option.hosted!.urn, `./index.html`) };

  //await snippet.file.writeTextFile(fal.urn, await internal.debugRender({ role: 'fallback', bundle, option }));
  await snippet.file.writeTextFile(doc.urn, await internal.debugRender({ role: 'document', bundle, option }));

  // ?
  const ser = { urn: snippet.path.resolve(option.hosted!.urn, `./booklet.service-worker.js`) };
  const man = { urn: snippet.path.resolve(option.hosted!.urn, `./booklet.webmanifest`) };

  await snippet.file.writeTextFile(ser.urn, `self.addEventListener('fetch', () => {});`);
  await snippet.file.writeTextFile(
    man.urn,
    JSON.stringify({
      name: 'Booklet',
      short_name: 'Booklet',
      start_url: `${option.hosted!.path}`,
      display: 'standalone',
      display_override: ['standalone', 'window-controls-overlay'],
      background_color: '#f6f6f7',
      theme_color: '#f6f6f7',
      icons: [
        ...[512, 384, 192, 152, 144, 128, 96, 72].map((size) => ({
          src: `${option.hosted!.path}assets/images/${size}w/booklet.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
        })),
        ...[512, 384, 192, 152, 144, 128, 96, 72].map((size) => ({
          src: `${option.hosted!.path}assets/images/${size}w/booklet-maskable.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
          purpose: 'maskable',
        })),
      ],
    })
  );
};

internal.debugRender = async ({ role, bundle, option }: any): Promise<string> => {
  const pattern = (await import(`../../../booklet-content/lib/pattern/${role}.ts`)).default;
  return pattern.create({ role }).render({
    parsed: {
      title: 'Booklet',
      urn: `${option.hosted!.path}`,

      field: {
        caption: null,
        keyword: null,
      },

      figure: {
        '512w': `${option.hosted!.path}assets/images/512w/booklet.png`,
        '384w': `${option.hosted!.path}assets/images/384w/booklet.png`,
        '192w': `${option.hosted!.path}assets/images/192w/booklet.png`,
        '152w': `${option.hosted!.path}assets/images/152w/booklet.png`,
        '144w': `${option.hosted!.path}assets/images/144w/booklet.png`,
        '128w': `${option.hosted!.path}assets/images/128w/booklet.png`,
        '96w': `${option.hosted!.path}assets/images/96w/booklet.png`,
        '72w': `${option.hosted!.path}assets/images/72w/booklet.png`,

        maskable: {
          '512w': `${option.hosted!.path}assets/images/512w/booklet-maskable.png`,
          '384w': `${option.hosted!.path}assets/images/384w/booklet-maskable.png`,
          '192w': `${option.hosted!.path}assets/images/192w/booklet-maskable.png`,
          '152w': `${option.hosted!.path}assets/images/152w/booklet-maskable.png`,
          '144w': `${option.hosted!.path}assets/images/144w/booklet-maskable.png`,
          '128w': `${option.hosted!.path}assets/images/128w/booklet-maskable.png`,
          '96w': `${option.hosted!.path}assets/images/96w/booklet-maskable.png`,
          '72w': `${option.hosted!.path}assets/images/72w/booklet-maskable.png`,
        },
      },

      static: {
        webmanifest: `${option.hosted!.path}booklet.webmanifest`,
      },

      append: ``,
      module: ``,
    },
  });
};
// ---
