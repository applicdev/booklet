const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.create = ({ time }: { time: number }) => {
  return `00/00/00`;
};

export default { ...fragment };
