import { default as out } from './console-output.ts';

import { default as fetchFind } from './fetch/fetch-find.ts';

import { default as localDate } from './local/local-date.ts';
import { default as localPath } from './local/local-path.ts';

import { default as parseTS } from './parse/parse-typescript.ts';
import { default as parseMD } from './parse/parse-markdown.ts';

import { default as writeGzip } from './write/write-gzip.ts';
import { default as writeHash } from './write/write-hash.ts';
import { default as writeJson } from './write/write-json.ts';
import { default as writeText } from './write/write-text.ts';

export default {
  out,

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

  parse: {
    ts: parseTS.parse,
    md: parseMD.parse,
  },
};
