const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.compress = async ({ plain }: { plain: string }) => {
  const byteArray = new TextEncoder().encode(plain);

  const cs = new CompressionStream('gzip');
  const writer = cs.writable.getWriter();

  writer.write(byteArray);
  writer.close();

  return new Uint8Array(
    await new Response(cs.readable).arrayBuffer() //
  );
};

fragment.decompress = async ({ buffer }: { buffer: Uint8Array }) => {
  const cs = new DecompressionStream('gzip');
  const writer = cs.writable.getWriter();

  writer.write(buffer as any);
  writer.close();

  return new Response(cs.readable).arrayBuffer().then(function (arrayBuffer) {
    return new TextDecoder().decode(arrayBuffer);
  });
};

export default { ...fragment };
