import { default as standardExit } from './standard/standard-exit.ts';
import { default as standardFile } from './standard/standard-file.ts';
import { default as standardFlag } from './standard/standard-flag.ts';
import { default as standardHash } from './standard/standard-hash.ts';
import { default as standardMime } from './standard/standard-mime.ts';
import { default as standardPath } from './standard/standard-path.ts';

import { default as standardRepo } from './standard/standard-repo.ts';

import { default as terminalInput } from './terminal/terminal-input.ts';
import { default as terminalPrint } from './terminal/terminal-print.ts';

import { default as packagesBuild } from './packages/packages-build.ts';

export class snippet {
  // ? deno
  static exit = { ...standardExit };
  static file = { ...standardFile };
  static flag = { ...standardFlag };
  static hash = { ...standardHash };
  static mime = { ...standardMime };
  static path = { ...standardPath };

  // ? git
  static repo = { ...standardRepo };

  // ? terminal interaction
  static input = { ...terminalInput };
  static print = { ...terminalPrint };

  // ? package tasks
  static build = { ...packagesBuild };
}

export default snippet;
