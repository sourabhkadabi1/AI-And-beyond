/**
 * Image optimization helper for Cloudinary and local assets.
 * Converts raw Cloudinary URLs to modern responsive formats (AVIF/WebP)
 * with automatic quality compression and dimension capping.
 */
export function optimizeImageUrl(url, { width = 800, quality = 'auto', format = 'auto' } = {}) {
  if (!url || typeof url !== 'string') return url;

  // Cloudinary URL transformation
  if (url.includes('res.cloudinary.com') && url.includes('/image/upload/')) {
    // Avoid double transformation if already present
    if (url.includes('/image/upload/f_auto') || url.includes('/image/upload/w_') || url.includes('/image/upload/c_')) {
      return url;
    }
    const transform = `f_${format},q_${quality},w_${width},c_limit`;
    return url.replace('/image/upload/', `/image/upload/${transform}/`);
  }

  return url;
}
