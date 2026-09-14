import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

        // Set Meta Tags
        document.title = `${data.title} | AIAndBeyond`;
        
        const setMetaTag = (property, content) => {
          let tag = document.querySelector(`meta[property="${property}"]`);
          if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
          }
          tag.setAttribute('content', content);
        };

        setMetaTag('og:title', data.title);
        setMetaTag('og:description', data.excerpt || '');
        if (data.cover_image) {
          setMetaTag('og:image', data.cover_image);
        }
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
        <div className="w-24 h-6 bg-dark-surface rounded mb-8"></div>
        <div className="w-32 h-8 bg-dark-surface rounded-full mb-6"></div>
        <div className="w-full h-12 bg-dark-surface rounded mb-4"></div>
        <div className="w-3/4 h-12 bg-dark-surface rounded mb-8"></div>
        <div className="w-full h-[400px] bg-dark-surface rounded-xl mb-10"></div>
        <div className="space-y-4">
          <div className="h-4 bg-dark-surface rounded w-full"></div>
          <div className="h-4 bg-dark-surface rounded w-full"></div>
          <div className="h-4 bg-dark-surface rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-text-1 mb-4">{error || 'Post not found'}</h1>
        <Link to="/blog" className="text-[#5A50EE] hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  const categoryColor = CATEGORY_COLORS[post.category] || '#5A50EE';
  const affiliate = categoryAffiliate ? categoryAffiliate[post.category] : null;

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 flex flex-col">
      {/* ── Top Header Banner (Pure White Tier) ── */}
      <div className="bg-white dark:bg-[#080C14] border-b-2 border-slate-200 dark:border-slate-800/80 py-10 sm:py-14 transition-colors">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors mb-6 text-sm font-semibold">
            <ArrowLeft size={16} />
            <span>Back to Blog</span>
          </Link>

          <div className="mb-4 inline-block">
            <Link 
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              className="px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase transition-transform hover:scale-105 inline-block"
              style={{ backgroundColor: `${categoryColor}20`, color: categoryColor, border: `1px solid ${categoryColor}40` }}
            >
              {post.category}
            </Link>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-medium">
                <Calendar size={15} className="text-indigo-600 dark:text-indigo-400" />
                <span>{new Date(post.published_at || post.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Clock size={15} className="text-indigo-600 dark:text-indigo-400" />
                <span>{post.read_time || '5 min'} read</span>
              </div>
            </div>
            
            <ShareButtons url={window.location.href} title={post.title} />
          </div>
        </div>
      </div>

      {/* ── Article Content Area (Soft Slate Tier with Elevated White Card) ── */}
      <div className="flex-1 bg-slate-100/90 dark:bg-[#0d1424] py-12 sm:py-16 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-12 shadow-md">
            {post.cover_image && (
              <figure className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800">
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

            <div className="prose prose-lg max-w-none mb-12 post-content text-slate-800 dark:text-slate-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }}>
              {/* Post content will be injected here */}
            </div>

            {affiliate && (
              <div className="mb-12">
                <AffiliateBlock affiliate={affiliate} />
              </div>
            )}

            {/* Pinterest Save CTA */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-slate-950 dark:to-slate-900 rounded-2xl p-8 border border-rose-200/80 dark:border-slate-800 text-center mb-10 shadow-xs">
              <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white mb-2">Save this for later!</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">Found this breakdown helpful? Pin it to your boards for quick reference.</p>
              <a 
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E60023] hover:bg-[#c9001f] text-white px-7 py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-rose-600/20 hover:scale-105"
              >
                <Bookmark size={18} />
                Save to Pinterest
              </a>
            </div>

            {/* About AIAndBeyond Micro Box */}
            <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start border border-slate-200/90 dark:border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md flex-shrink-0">
                AB
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white mb-1.5">Published by AIAndBeyond</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  We review the latest AI tools, craft deep-dive guides, and explore modern cloud hosting to help developers and creators level up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Posts Tier (Pure White Tier) ── */}
      {relatedPosts.length > 0 && (
        <div className="bg-white dark:bg-[#080C14] border-t-2 border-slate-200 dark:border-slate-800/80 py-16 transition-colors">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/90 dark:border-indigo-800/70 mb-3 shadow-xs">
              KEEP READING
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white mb-8">Related Reads</h2>
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
