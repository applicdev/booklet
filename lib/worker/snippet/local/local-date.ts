const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.create = ({ val }: { val: number | Date }) => {
  return `00/00/00`;
};

export default { ...fragment };
