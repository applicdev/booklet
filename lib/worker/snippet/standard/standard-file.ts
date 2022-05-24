const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = async (): Promise<void> => {
  // ...
};

export default { ...fragment };
