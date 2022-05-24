type InterfaceOption = {
  source?: { urn: string; listen?: boolean };
  output?: { urn: string };
  hosted?: { urn: string; path: string };
};

type InterfaceGenerator = AsyncGenerator<
  InterfaceGeneratorResult, //
  void,
  void
>;

type InterfaceGeneratorResult = {
  // ...
};

// type InterfaceMarkdownOption = {
//   changed?: Date;
//   created?: Date;
//   title?: string;
//   label?: string;

//   field?: { [prop: string]: any };

//   public?: { urn: string; role?: 'forward' }[];
//   figure?: { urn: string; role?: 'loaded' | 'masked' | 'window' }[];
//   module?: { urn: string; role?: 'loaded' | 'inline' }[];
// };
