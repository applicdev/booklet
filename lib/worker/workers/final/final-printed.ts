import { default as snippet } from '../../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async ({ bundle, option }: any): Promise<void> => {
  // ?
  snippet.file.emptyDir(snippet.path.resolve(option.hosted.urn, './~/printed/'));
  // ...
};

export default { ...fragment };
