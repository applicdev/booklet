import * as path from 'https://deno.land/std@0.132.0/path/mod.ts';
import * as file from 'https://deno.land/std@0.132.0/fs/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.requestConfig = async (): Promise<null | { name: string }> => {
  if (!(await file.exists(path.resolve('./.git')))) {
    throw new Error(`Not in a directory initialized as a repository (could not locate .git)`);
  }

  const cmd = Deno.run({
    cmd: ['git', 'config', '--get', 'remote.origin.url'],
    stdout: 'piped',
    stderr: 'piped',
  });

  const output = await cmd.output();
  const outStr = new TextDecoder().decode(output);

  return {
    name: outStr.split('/').pop()!.replace('.git', '').replaceAll('\n', ''),
  };
};

export default { ...fragment };
