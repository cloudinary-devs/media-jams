/**
 * Function that will receive the full document that was selected for previewing.
 * The function must return a URL to your front end that is adapted to your front-ends URL structure.
 */
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;
/**
 * For local dev we want 'localhost:3000', meaning we're also running the mediajams app too
 * For prod the url would be mediajams.dev
 * The studio has 2 deployments studio-stage & studio.
 * We can also replace `localhost:3000` with the preview domain of our PR branch from Vercel to check the studio running at `localhost:3333`
 * with the deployed PR, something like `https://mediajams-iwd3vb20q.vercel.app` NOT the branch URL
 */
const projectUrl =
  process.env.NODE_ENV === 'production' // Prod Build or Dev
    ? process.env.SANITY_STUDIO_ENV === 'production' // Production or Preview
      ? `https://mediajams.dev`
      : process.env.SANITY_STUDIO_MEDIAJAM_URL
    : `http://localhost:3000`;

export function resolveProductionUrl(document) {
  return document?.slug
    ? `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document?.slug.current}&media=0`
    : null;
}
export function resolveMediaPreviewUrl(document) {
  return document?.slug
    ? `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document?.slug.current}&media=1`
    : null;
}

export function resolveLiveEditUrl(document) {
  return document?.slug
    ? `${projectUrl}/api/live-edit?secret=${previewSecret}&slug=${document?.slug.current}`
    : null;
}

export function resolveMediaSneakPeakUrl(document) {
  return document?.slug
    ? `https://dev.mediajams.dev/api/preview?secret=${previewSecret}&slug=${document?.slug.current}&media=1`
    : null;
}
