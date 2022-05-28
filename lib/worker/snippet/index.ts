import { default as standardRepo } from './standard/standard-repo.ts';
import { default as standardFile } from './standard/standard-file.ts';
import { default as standardPath } from './standard/standard-path.ts';
import { default as standardMime } from './standard/standard-mime.ts';
import { default as standardFlag } from './standard/standard-flag.ts';

import { default as terminalInput } from './terminal/terminal-input.ts';
import { default as terminalPrint } from './terminal/terminal-print.ts';

import { default as fetchFind } from './fetch/fetch-find.ts';

import { default as localDate } from './local/local-date.ts';
import { default as localPath } from './local/local-path.ts';

import { default as writeGzip } from './write/write-gzip.ts';
import { default as writeHash } from './write/write-hash.ts';
import { default as writeJson } from './write/write-json.ts';
import { default as writeText } from './write/write-text.ts';

export default {
  // ? standard
  repo: { ...standardRepo },

  // ? standard
  file: { ...standardFile },
  path: { ...standardPath },
  mime: { ...standardMime },
  flag: { ...standardFlag },

  // ? terminal interactions
  input: { ...terminalInput },
  print: { ...terminalPrint },

  local: {
    date: localDate.create,
    path: localPath.create,
  },

  fetch: {
    find: fetchFind.request,
    gzip: writeGzip.decompress,
  },

  write: {
    gzip: writeGzip.compress,
    hash: writeHash.create,
    json: writeJson.create,
    text: writeText.create,
  },
};
