const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

export async function* modules({ source, output, hosted }: InterfaceOption): AsyncGenerator<
  { [prop: string]: any }, //
  void,
  void
> {
  const [bundle, option]: any = [
    { locate: {}, orderd: {}, tasked: {} },
    { source, output, hosted },
  ];

  // ?
  await fragment.preps({ bundle, option });
  yield { bundle, option };

  // ?
  await fragment.order({ bundle, option });
  yield { bundle, option };

  // ?
  await fragment.tasks({ bundle, option });
  yield { bundle, option };

  // ?
  await fragment.finalize({ bundle, option });
  yield { bundle, option };
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

fragment.finalize = async ({ locate, orderd, tasked, option }: any): Promise<any> => {
  // await fragment.createPreview({ locate, orderd, tasked, option });
  // await fragment.createPrinted({ locate, orderd, tasked, option });
};
