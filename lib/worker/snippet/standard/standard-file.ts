import * as file from 'https://deno.land/std@0.132.0/fs/mod.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.copy = async (path: string, target: string): Promise<void> => {
  return file.copy(path, target);
};

fragment.emptyDir = async (path: string): Promise<void> => {
  return file.emptyDir(path);
};

fragment.writeTextFile = async (path: string, data: string): Promise<any> => {
  return Deno.writeTextFile(path, data);
};

export default { ...fragment };
