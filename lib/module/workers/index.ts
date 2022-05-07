import { default as orderContent } from './order/order-content.ts';
import { default as orderPattern } from './order/order-pattern.ts';

import { default as tasksFetch } from './tasks/tasks-fetch.ts';
import { default as tasksParse } from './tasks/tasks-parse.ts';

import { default as tasksResolveFigure } from './tasks/task-resolve/resolve-figure.ts';
import { default as tasksResolveLocate } from './tasks/task-resolve/resolve-locate.ts';
import { default as tasksResolveModule } from './tasks/task-resolve/resolve-module.ts';
import { default as tasksResolveHosted } from './tasks/task-resolve/resolve-hosted.ts';

import { default as writeOrder } from './write/write-order.ts';
import { default as writeClear } from './write/write-clear.ts';
import { default as writeApply } from './write/write-apply.ts';

export default {
  order: {
    content: orderContent.request,
    pattern: orderPattern.request,
  },

  tasks: {
    fetch: tasksFetch.request,
    parse: tasksParse.request,
    resolve: {
      figure: tasksResolveFigure.request,
      locate: tasksResolveLocate.request,
      module: tasksResolveModule.request,
      hosted: tasksResolveHosted.request,
    },
  },

  write: {
    order: writeOrder.request,
    clear: writeClear.request,
    apply: writeApply.request,
  },
};
