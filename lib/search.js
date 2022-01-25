let Fuse;

export async function initFuse() {
  if (Fuse) return Fuse;

  Fuse = (await import('fuse.js')).default;

  return Fuse;
}
