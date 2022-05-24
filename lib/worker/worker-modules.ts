const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

export async function* modules({ source, output, hosted }: InterfaceOption): AsyncGenerator<
  { [prop: string]: any }, //
  void,
  void
> {
  const [locate, orderd, tasked, option]: any = [{}, {}, {}, { source, output, hosted }];

  // ?
  await fragment.preps({ locate, orderd, tasked, option });
  yield { locate, orderd, tasked, option };

  // ?
  await fragment.order({ locate, orderd, tasked, option });
  yield { locate, orderd, tasked, option };

  // ?
  await fragment.tasks({ locate, orderd, tasked, option });
  yield { locate, orderd, tasked, option };

  // ?
  await fragment.write({ locate, orderd, tasked, option });
}

fragment.preps = async ({ locate, orderd, tasked, option }: any): Promise<any> => {
  // ...
};

fragment.order = async ({ locate, orderd, tasked, option }: any): Promise<any> => {
  // ...
};

fragment.tasks = async ({ locate, orderd, tasked, option }: any): Promise<any> => {
  // ...
};

fragment.write = async ({ locate, orderd, tasked, option }: any): Promise<any> => {
  // ...
};
