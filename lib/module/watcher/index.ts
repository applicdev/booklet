import { default as orderContent } from './order/content.ts';
import { default as orderPattern } from './order/pattern.ts';

import { default as tasksPattern } from './tasks/content.ts';

// import { default as publics } from './watcher-publics.ts';
// import { default as statics } from './watcher-statics.ts';

export default {
  order: {
    content: orderContent.request,
    pattern: orderPattern.request,
  },

  tasks: {
    content: tasksPattern.request,
  },

  // publics,
  // statics,
};
