import { default as finalPreview } from './final/final-preview.ts';
import { default as finalPrinted } from './final/final-printed.ts';

export default {
  finalPreview: finalPreview.request,
  finalPrinted: finalPrinted.request,
};
