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
