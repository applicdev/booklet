import { default as terminalInputs } from './terminal/terminal-inputs.ts';
import { default as terminalOutput } from './terminal/terminal-output.ts';

import { default as fetchFind } from './fetch/fetch-find.ts';

import { default as localDate } from './local/local-date.ts';
import { default as localPath } from './local/local-path.ts';

import { default as writeGzip } from './write/write-gzip.ts';
import { default as writeHash } from './write/write-hash.ts';
import { default as writeJson } from './write/write-json.ts';
import { default as writeText } from './write/write-text.ts';

export default {
  // ? terminal interactions
  input: {
    confirm: terminalInputs.confirm,
  },

  // ? terminal outputs
  print: {
    bold: terminalOutput.bold,
    info: terminalOutput.info,
    done: terminalOutput.done,
    warn: terminalOutput.warn,
    fail: terminalOutput.fail,
  },

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
