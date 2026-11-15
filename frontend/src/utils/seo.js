/**
 * Universal SEO manager for AIAndBeyond Single Page Application (SPA).
 * Dynamically synchronizes document.title, meta descriptions, canonical link,
 * Googlebot / robots indexing directives, Open Graph, and Twitter metadata.
 */

export function updateSEO({
  title,
  description,
  canonical,
  noindex = false,
  image = 'https://www.aiandbeyondtech.com/hero.png',
  type = 'website'
} = {}) {
  // 1. Title
  if (title) {
    document.title = title;
  }

  // 2. Helper to set or create meta tag
  const setMeta = (attr, key, val) => {
    if (!val) return;
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  };

  // 3. Robots & Googlebot Directives (Critical for resolving Soft 404s and duplicate canonicals)
  if (noindex) {
    setMeta('name', 'robots', 'noindex, nofollow');
    setMeta('name', 'googlebot', 'noindex, nofollow');
  } else {
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  }

  // 4. Meta Descriptions
  if (description) {
    setMeta('name', 'description', description);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:description', description);
  }

  // 5. Titles for Social Cards
  if (title) {
    setMeta('property', 'og:title', title);
    setMeta('name', 'twitter:title', title);
  }

  // 6. Type, Site Name & Cards
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', 'AIAndBeyond');
  setMeta('name', 'twitter:card', 'summary_large_image');
  if (image) {
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:image', image);
  }

  // 7. Canonical Tag Management (Critical for "Alternate page with proper canonical tag" & "Duplicate without user-selected canonical")
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (noindex) {
    // If a page is marked noindex (e.g. 404 or error), strip canonical so Google doesn't attempt to resolve it
    if (canonicalEl) {
      canonicalEl.remove();
    }
  } else if (canonical) {
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);
    setMeta('property', 'og:url', canonical);
  }
}
