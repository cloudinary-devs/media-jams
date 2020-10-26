/**
 * Function that will receive the full document that was selected for previewing.
 * The function must return a URL to your front end that is adapted to your front-ends URL structure.
 */
const previewSecret = 'MY_SECRET_TOKEN'; // TODO: generate an actual token string!
// TODO: update prod url to domain
const projectUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://poc-media-jams.vercel.app'
    : 'http://localhost:3000';

export default function resolveProductionUrl(document) {
  return `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document.slug.current}`;
}
