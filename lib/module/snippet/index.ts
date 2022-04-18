import { default as out } from './console-output.ts';

import { default as indexHash } from './index/index-hash.ts';

import { default as parseTS } from './parse/parse-typescript.ts';
import { default as parseMD } from './parse/parse-markdown.ts';

export default {
  out,

  index: {
    hash: indexHash.create,
  },

  parse: {
    ts: parseTS.parse,
    md: parseMD.parse,
  },
};
