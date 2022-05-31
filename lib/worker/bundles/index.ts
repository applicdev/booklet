import { default as finalDisplay } from './finalize/final-display.ts';
import { default as finalPreview } from './finalize/final-preview.ts';
import { default as finalPrinted } from './finalize/final-printed.ts';

export default {
  finalize: {
    display: finalDisplay.request,
    preview: finalPreview.request,
    printed: finalPrinted.request,
  },
};
