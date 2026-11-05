import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { fetchPost, fetchPosts } from '../utils/api';
import ShareButtons from '../components/ShareButtons';
import VideoEmbed from '../components/VideoEmbed';
import AffiliateBlock from '../components/AffiliateBlock';
import BlogCard from '../components/BlogCard';
import { categoryAffiliate } from '../utils/affiliates';
import { ArrowLeft, Calendar, Clock, Bookmark } from 'lucide-react';

const CATEGORY_COLORS = {
  'AI Tools': '#5A50EE',
  'Web Hosting': '#0099BB',
  'AI Agents & Automation': '#FF8C42',
  'Tutorials': '#00B07D',
  'Productivity': '#FF6B9D',
  'MakeMoneyWithAI': '#16A34A'
};

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchPost(slug);
        const data = res.data;
        
        if (!data) {
          setError('Post not found');
          return;
        }
        
        setPost(data);

        // Fetch related posts
        if (data.category) {
          const relatedRes = await fetchPosts(data.category, null, 0);
          const relatedData = relatedRes.data || [];
          const filtered = relatedData.filter(p => p.slug !== slug).slice(0, 3);
          setRelatedPosts(filtered);
        }

        // Set Meta Tags & Google Indexing Directives
        document.title = `${data.title} | AIAndBeyond`;
        
        const setMetaTag = (attr, name, content) => {
          let tag = document.querySelector(`meta[${attr}="${name}"]`);
          if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attr, name);
            document.head.appendChild(tag);
          }
          tag.setAttribute('content', content);
        };

        const postUrl = `https://www.aiandbeyondtech.com/blog/${slug}`;
        const postDesc = data.meta_desc || data.excerpt || '';

        // Standard SEO Meta
        setMetaTag('name', 'description', postDesc);
        setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
        setMetaTag('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large');

        // Canonical Link
        let canonicalTag = document.querySelector('link[rel="canonical"]');
        if (!canonicalTag) {
          canonicalTag = document.createElement('link');
          canonicalTag.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalTag);
        }
        canonicalTag.setAttribute('href', postUrl);

        // Open Graph
        setMetaTag('property', 'og:title', data.title);
        setMetaTag('property', 'og:description', postDesc);
        setMetaTag('property', 'og:url', postUrl);
        setMetaTag('property', 'og:type', 'article');
        setMetaTag('property', 'og:site_name', 'AIAndBeyond');
        if (data.cover_image) {
          setMetaTag('property', 'og:image', data.cover_image);
        }

        // Twitter Cards
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', data.title);
        setMetaTag('name', 'twitter:description', postDesc);
        if (data.cover_image) {
          setMetaTag('name', 'twitter:image', data.cover_image);
        }

        // Google Article Structured Data (JSON-LD)
        let schemaTag = document.getElementById('schema-article');
        if (!schemaTag) {
          schemaTag = document.createElement('script');
          schemaTag.id = 'schema-article';
          schemaTag.type = 'application/ld+json';
          document.head.appendChild(schemaTag);
        }
        schemaTag.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": data.title,
          "description": postDesc,
          "image": data.cover_image || "https://www.aiandbeyondtech.com/hero.png",
          "datePublished": data.published_at || data.created_at || "2026-11-04",
          "dateModified": data.updated_at || data.published_at || data.created_at || "2026-11-04",
          "author": {
            "@type": "Organization",
            "name": "AIAndBeyond",
            "url": "https://www.aiandbeyondtech.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "AIAndBeyond",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.aiandbeyondtech.com/favicon.svg"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": postUrl
          }
        });
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    }
    loadPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 w-full animate-pulse">
        <div className="w-24 h-6 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded mb-8"></div>
        <div className="w-32 h-8 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded-lg mb-6"></div>
        <div className="w-full h-12 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded mb-4"></div>
        <div className="w-3/4 h-12 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded mb-8"></div>
        <div className="w-full h-[400px] bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded-xl mb-10"></div>
        <div className="space-y-4">
          <div className="h-4 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded w-full"></div>
          <div className="h-4 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded w-full"></div>
          <div className="h-4 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-4">{error || 'Post not found'}</h1>
        <Link to="/blog" className="text-[#F5A623] hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  const categoryColor = CATEGORY_COLORS[post.category] || '#F5A623';
  const affiliate = categoryAffiliate ? categoryAffiliate[post.category] : null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#FFFFFF] flex flex-col">
      {/* ── Article Header ── */}
      <div className="border-b border-[#E5E5E5] dark:border-[#262626] py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-8 sm:p-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[#555555] dark:text-[#A0A0A0] hover:text-[#F5A623] transition-colors mb-6 text-sm font-semibold">
              <ArrowLeft size={16} />
              <span>Back to Blog</span>
            </Link>

            <div className="mb-4 inline-block">
              <Link 
                to={`/blog?category=${encodeURIComponent(post.category)}`}
                className="px-3.5 py-1 rounded-lg text-xs font-extrabold tracking-wide uppercase transition-colors inline-block"
                style={{ backgroundColor: `${categoryColor}20`, color: categoryColor, border: `1px solid ${categoryColor}40` }}
              >
                {post.category}
              </Link>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] dark:text-[#FFFFFF] leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E5E5E5] dark:border-[#262626] text-xs sm:text-sm text-[#555555] dark:text-[#A0A0A0]">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar size={15} className="text-[#F5A623]" />
                  <span>{new Date(post.published_at || post.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Clock size={15} className="text-[#F5A623]" />
                  <span>{post.read_time || '5 min'} read</span>
                </div>
              </div>
              
              <ShareButtons url={post.slug} title={post.title} image={post.cover_image} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Article Content ── */}
      <div className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-6 sm:p-12">
            {post.cover_image && (
              <figure className="mb-10 rounded-lg overflow-hidden border border-[#E5E5E5] dark:border-[#262626]">
                <img 
                  src={post.cover_image} 
                  alt={post.title}
                  className="w-full object-cover max-h-[520px]"
                />
              </figure>
            )}

            {post.video_url && (
              <div className="mb-10">
                <VideoEmbed url={post.video_url} title={post.title} />
              </div>
            )}

            <div className="prose prose-lg max-w-none mb-12 post-content text-[#555555] dark:text-[#A0A0A0] leading-relaxed" dangerouslySetInnerHTML={{ __html: (() => {
              // Only allow iframes from trusted video domains
              DOMPurify.addHook('uponSanitizeElement', (node, data) => {
                if (data.tagName === 'iframe') {
                  const src = node.getAttribute('src') || '';
                  const allowed = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)\//i;
                  if (!allowed.test(src)) {
                    node.remove();
                  }
                }
              });
              const clean = DOMPurify.sanitize(post.content, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src'],
                ALLOW_UNKNOWN_PROTOCOLS: false,
              });
              DOMPurify.removeHook('uponSanitizeElement');

              // Guarantee 100% Mobile Responsive Tables on all devices
              let responsiveContent = clean;
              // Strip legacy wrapper divs if they exist to avoid double wrapping
              responsiveContent = responsiveContent.replace(
                /<div[^>]*style="[^"]*overflow-x:\s*auto[^"]*"[^>]*>\s*(<table[\s\S]*?<\/table>)\s*<\/div>/gi,
                '$1'
              );
              // Wrap every table with our dedicated touch-scrollable container & mobile hint
              responsiveContent = responsiveContent.replace(
                /(<table\b[^>]*>[\s\S]*?<\/table>)/gi,
                '<div class="table-container-responsive"><div class="table-scroll-hint sm:hidden"><span>↔ Swipe table horizontally</span></div>$1</div>'
              );

              return responsiveContent;
            })() }}>
              {/* Post content will be injected here */}
            </div>

            {affiliate && (
              <div className="mb-12">
                <AffiliateBlock affiliate={affiliate} />
              </div>
            )}

            {/* Pinterest Save CTA */}
            <div className="bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded-lg p-8 border border-[#E5E5E5] dark:border-[#262626] text-center mb-10">
              <h3 className="font-display text-xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-2">Save this for later!</h3>
              <p className="text-[#555555] dark:text-[#A0A0A0] text-sm mb-6">Found this breakdown helpful? Pin it to your boards for quick reference.</p>
              <a 
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(post.cover_image || '')}&description=${encodeURIComponent(post.pinterest_desc || post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E60023] hover:bg-[#c9001f] text-white px-7 py-3 rounded-lg font-bold text-sm transition-colors"
              >
                <Bookmark size={18} />
                Save to Pinterest
              </a>
            </div>

            {/* About AIAndBeyond Micro Box */}
            <div className="bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start border border-[#E5E5E5] dark:border-[#262626]">
              <div className="w-16 h-16 rounded-xl bg-[#F5A623] flex items-center justify-center text-[#0A0A0A] font-extrabold text-xl flex-shrink-0">
                AB
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#111111] dark:text-[#FFFFFF] mb-1.5">Published by AIAndBeyond</h3>
                <p className="text-[#555555] dark:text-[#A0A0A0] text-xs sm:text-sm leading-relaxed">
                  We review the latest AI tools, craft deep-dive guides, and explore modern cloud hosting to help developers and creators level up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Posts ── */}
      {relatedPosts.length > 0 && (
        <div className="bg-[#F5F5F5] dark:bg-[#141414] border-t border-[#E5E5E5] dark:border-[#262626] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/30 mb-3">
              KEEP READING
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-8">Related Reads</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
