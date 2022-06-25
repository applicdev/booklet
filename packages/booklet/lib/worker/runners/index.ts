import { default as orderTraverse } from './order/order-traverse.ts';
import { default as orderManage } from './order/order-manage.ts';

import { default as finalDisplay } from './finalize/final-display.ts';
import { default as finalPreview } from './finalize/final-preview.ts';
import { default as finalPrinted } from './finalize/final-printed.ts';

export class runners {
  static order = {
    traverse: orderTraverse.request,
    manage: orderManage.request,
  };

  static finalize = {
    display: finalDisplay.request,
    preview: finalPreview.request,
    printed: finalPrinted.request,
  };
}

export default runners;
