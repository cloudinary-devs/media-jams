/**
 * Function that will receive the full document that was selected for previewing.
 * The function must return a URL to your front end that is adapted to your front-ends URL structure.
 */
const previewSecret = 'MY_SECRET'; // Copy the string you used for SANITY_PREVIEW_SECRET
const projectUrl = 'http://localhost:3000';

export default function resolveProductionUrl(document) {
  return `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document.slug.current}`;
}
