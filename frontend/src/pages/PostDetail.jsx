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
  'Tech Reviews': '#FF8C42',
  'Tutorials': '#00B07D',
  'Productivity': '#FF6B9D'
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
    <article className="max-w-3xl mx-auto px-6 py-12 w-full">
      <Link to="/blog" className="inline-flex items-center gap-2 text-text-2 hover:text-text-1 transition-colors mb-10">
        <ArrowLeft size={18} />
        <span className="font-medium">Back to Blog</span>
      </Link>

      <header className="mb-10">
        <div className="mb-6 inline-block">
          <Link 
            to={`/blog?category=${encodeURIComponent(post.category)}`}
            className="px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase transition-transform hover:scale-105 inline-block"
            style={{ backgroundColor: `${categoryColor}20`, color: categoryColor, border: `1px solid ${categoryColor}40` }}
          >
            {post.category}
          </Link>
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold text-text-1 leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-dark-border">
          <div className="flex items-center gap-6 text-sm text-text-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(post.published_at || post.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.read_time || '5 min'} read</span>
            </div>
          </div>
          
          <ShareButtons url={window.location.href} title={post.title} />
        </div>
      </header>

      {post.cover_image && (
        <figure className="mb-12">
          <img 
            src={post.cover_image} 
            alt={post.title}
            className="w-full rounded-2xl shadow-xl object-cover max-h-[500px]"
          />
        </figure>
      )}

      {post.video_url && (
        <div className="mb-12">
          <VideoEmbed url={post.video_url} title={post.title} />
        </div>
      )}

      <div className="prose prose-lg max-w-none mb-16 post-content" dangerouslySetInnerHTML={{ __html: post.content }}>
        {/* Post content will be injected here */}
      </div>

      {affiliate && (
        <div className="mb-16">
          <AffiliateBlock affiliate={affiliate} />
        </div>
      )}

      {/* Pinterest Save CTA */}
      <div className="bg-dark-surface-2 rounded-2xl p-8 border border-dark-border text-center mb-16 shadow-sm">
        <h3 className="font-display text-2xl font-bold text-text-1 mb-3">Save this for later!</h3>
        <p className="text-text-2 mb-6">Found this helpful? Pin it to your boards so you don't lose it.</p>
        <a 
          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#E60023] hover:bg-[#c9001f] text-white px-8 py-3 rounded-full font-bold transition-colors"
        >
          <Bookmark size={20} />
          Save to Pinterest
        </a>
      </div>

      {/* About Section */}
      <div className="bg-dark-surface rounded-2xl p-8 mb-16 flex flex-col md:flex-row gap-8 items-center md:items-start border border-dark-border">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#5A50EE] to-[#0099BB] flex-shrink-0"></div>
        <div>
          <h3 className="font-display text-2xl font-bold text-text-1 mb-3">About AIAndBeyond</h3>
          <p className="text-text-2 leading-relaxed">
            AIAndBeyond is dedicated to breaking down complex technical topics into practical, easy-to-understand guides. We review the latest tools, share tutorials, and explore the intersection of AI, tech, and productivity to help you stay ahead in the digital world.
          </p>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-dark-border pt-16">
          <h2 className="font-display text-3xl font-bold text-text-1 mb-8">Related Reads</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
