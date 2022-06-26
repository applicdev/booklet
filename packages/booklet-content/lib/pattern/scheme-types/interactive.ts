// import { default as snippet } from '../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

internal.createPattern = ({}) => {
  return ({ parsed }: any) => ` 
    a, button {
      z-index: 1;

      border-radius: calc(var(--p-border-radius-1) + .0625rem);
      border-top-left-radius: ;
      border-top-right-radius: ;
      border-bottom-right-radius: ;
      border-bottom-left-radius: ;
      bottom: -0.0625rem;
      
      box-shadow: 0 0 0 -.0625rem var(--p-focused);
      content: "";
      display: block;
      left: -.0625rem;
      pointer-events: none;
      position: absolute;
      right: -.0625rem;
      top: -.0625rem;
      transition: box-shadow var(--p-duration-100) var(--p-ease);
    }
      
    a:focus, 
    button:focus {
      box-shadow: 0 0 0 .125rem var(--p-focused);
      outline: var(--p-border-width-1) solid #0000;
    }
  `;
};

fragment.create = ({ role }: { role: string }) => ({ role, render: internal.createPattern({}) });

export default { ...fragment };

// import { default as snippet } from '../snippet/index.ts';

const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};
