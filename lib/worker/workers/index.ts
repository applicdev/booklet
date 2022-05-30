import { default as finalDisplay } from './final/final-display.ts';
import { default as finalPreview } from './final/final-preview.ts';
import { default as finalPrinted } from './final/final-printed.ts';

export default {
  finalDisplay: finalDisplay.request,
  finalPreview: finalPreview.request,
  finalPrinted: finalPrinted.request,
};
