import { default as snippet } from '../snippet/index.ts';
import { default as statics } from '../../pattern/index.ts';

import * as file from 'https://deno.land/std@0.78.0/fs/mod.ts';
import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.create = async ({ option, content, pattern, publics }: any): Promise<void> => {
  await snippet.write.text({ urn: path.resolve(option.output.urn, './.nojekyll'), val: '' });
  await snippet.write.text({
    urn: path.resolve(option.output.urn, './README.md'),
    val: `
This branch is automated with [GitHub Actions][github-actions]. Its content should not be manually edited.

[github-actions]: https://github.com/features/actions  
    `,
  });

  const writePattern = async ({ pat, urn }: any) => {
    await snippet.write.text({
      urn: path.resolve(option.output.urn, urn), //
      val: await statics[pat].render({ page: {} }),
    });
  };

  // await writePattern({ pat: 'page:document', urn: './index.html' });
  await writePattern({ pat: 'static:fallback', urn: './404.html' });
  // await writePattern({ pat: 'pwa-file:webmanifest', urn: './index.webmanifest' });
  await writePattern({ pat: 'static:service-worker', urn: './service-worker.js' });
  // await writePattern({ pat: 'pwa-file:sitemap', urn: './sitemap.xml' });
};

export default { ...fragment };
