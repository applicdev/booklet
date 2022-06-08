import { default as standardFile } from './standard/standard-file.ts';
import { default as standardFlag } from './standard/standard-flag.ts';
import { default as standardHash } from './standard/standard-hash.ts';
import { default as standardMime } from './standard/standard-mime.ts';
import { default as standardPath } from './standard/standard-path.ts';

import { default as standardRepo } from './standard/standard-repo.ts';

import { default as terminalInput } from './terminal/terminal-input.ts';
import { default as terminalPrint } from './terminal/terminal-print.ts';

export default {
  // ? Deno
  file: { ...standardFile },
  flag: { ...standardFlag },
  hash: { ...standardHash },
  mime: { ...standardMime },
  path: { ...standardPath },

  // ? Git
  repo: { ...standardRepo },

  // ? Terminal Interaction
  input: { ...terminalInput },
  print: { ...terminalPrint },
};
