import { default as orderContent } from './order/order-content.ts';
import { default as orderPattern } from './order/order-pattern.ts';

import { default as tasksFetch } from './tasks/tasks-fetch.ts';

import { default as writeOrder } from './write/write-order.ts';
import { default as writeClean } from './write/write-clean.ts';
import { default as writeApply } from './write/write-apply.ts';

export default {
  order: {
    content: orderContent.request,
    pattern: orderPattern.request,
  },

  tasks: {
    fetch: tasksFetch.request,
  },

  write: {
    order: writeOrder.request,
    clean: writeClean.request,
    apply: writeApply.request,
  },
};
