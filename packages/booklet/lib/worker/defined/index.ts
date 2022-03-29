// ?
type InterfaceOption = {
  source: { urn: string };
  output: { urn: string };
  stable: { urn: string };
  hosted: { urn: string; path: string };
  module: { urn: string };
};

// ?
type RunnerOption = InterfaceOption;
type RunnerBundle = {
  // ...
};

// ?
type BundlerGenerator = AsyncGenerator<
  {
    bundle: RunnerBundle;
    option: RunnerOption;
  },
  void,
  void
>;

// ?
type StreamsGenerator = AsyncGenerator<
  { [prop: string]: any }, //
  void,
  void
>;

// ?
type WatcherGenerator = AsyncGenerator<
  { [prop: string]: any }, //
  void,
  void
>;

// ?
type InterfaceInputs = {
  source?: InterfaceOption['source'];
  output?: InterfaceOption['output'];
  stable?: InterfaceOption['stable'];
  hosted?: InterfaceOption['hosted'];
};

export type defined = {
  'interface:option': InterfaceOption;
  'interface:inputs': InterfaceInputs;

  'runner:option': RunnerOption;
  'runner:bundle': RunnerBundle;

  'bundler:option': InterfaceOption;
  'bundler*': BundlerGenerator;

  'streams:option': InterfaceOption;
  'streams*': StreamsGenerator;

  'watcher:option': InterfaceOption;
  'watcher*': WatcherGenerator;
};

export default defined;
