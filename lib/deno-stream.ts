import { default as watcher } from './module/watcher.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.root = Deno.cwd();
