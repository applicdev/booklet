import { default as snippet } from './snippet/index.ts';
import { default as workers } from './workers/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

export async function* modules(option: InterfaceOption): AsyncGenerator<
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

  // ? ensure preview and printed directories and capture contents
  await Promise.all([
    workers.finalPreview({ bundle, option }), //
    workers.finalPrinted({ bundle, option }),
  ]);

  // ? ensure github details
  const noj = { urn: './.nojekyll', plain: '' };
  const rea = { urn: './README.md', plain: 'This branch is automated with [GitHub Actions](https://github.com/features/actions). Its content should not be manually edited.' };

  await Promise.all([
    snippet.file.writeTextFile(snippet.path.resolve(hosted.urn, noj.urn), noj.plain), //
    snippet.file.writeTextFile(snippet.path.resolve(hosted.urn, rea.urn), rea.plain),
  ]);
};
