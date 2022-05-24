import { default as ensureProperties } from './preps/ensure-properties.ts';
import { default as ensureWorkspaces } from './preps/ensure-workspaces.ts';

import { default as orderContent } from './order/order-content.ts';
import { default as orderPattern } from './order/order-pattern.ts';

import { default as tasksFetch } from './tasks/tasks-fetch.ts';
import { default as tasksParse } from './tasks/tasks-parse.ts';

import { default as tasksPatternFigure } from './tasks/pattern/locate.ts';

import { default as tasksResolveFigure } from './tasks/resolve/figure.ts';
import { default as tasksResolveLocate } from './tasks/resolve/locate.ts';
import { default as tasksResolveModule } from './tasks/resolve/module.ts';

import { default as writeOrder } from './write/write-order.ts';
import { default as writeApply } from './write/write-apply.ts';

export default {
  preps: {
    ensureProperties: ensureProperties.request,
    ensureWorkspaces: ensureWorkspaces.request,
  },

  order: {
    content: orderContent.request,
    pattern: orderPattern.request,
  },

  tasks: {
    fetch: tasksFetch.request,
    parse: tasksParse.request,

    pattern: {
      locate: tasksPatternFigure.request,
    },
    resolve: {
      figure: tasksResolveFigure.request,
      locate: tasksResolveLocate.request,
      module: tasksResolveModule.request,
    },
  },

  write: {
    order: writeOrder.request,
    apply: writeApply.request,
  },
};
