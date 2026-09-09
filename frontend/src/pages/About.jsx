import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';

const TOPICS = [
  { name: 'AI Tools', color: '#5A50EE' },
  { name: 'Web Hosting', color: '#0099BB' },
  { name: 'Tech Reviews', color: '#FF8C42' },
  { name: 'Tutorials', color: '#00B07D' },
  { name: 'Productivity', color: '#FF6B9D' }
];

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 w-full">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-text-1 mb-10">
        About AIAndBeyond
      </h1>
      
      <div className="prose prose-lg max-w-none text-text-2 space-y-6">
        <p>
          Welcome to AIAndBeyond! We are passionate about exploring the frontiers of artificial intelligence, web development, and digital tools. Our goal is to make sense of the rapidly evolving tech landscape and share those insights with you.
        </p>
        
        <p>
          <strong>Why this blog exists:</strong> Technology can be overwhelming, especially for students, beginners, and even seasoned professionals trying to keep up. AIAndBeyond was created to bridge that gap. We aim to help you navigate through the noise by providing honest reviews, clear tutorials, and practical advice on tools that genuinely improve your workflow and understanding.
        </p>

        <h2 className="font-display text-2xl font-bold text-text-1 mt-12 mb-6">What We Cover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {TOPICS.map(topic => (
            <div key={topic.name} className="flex items-center gap-3 p-4 bg-dark-surface border border-dark-border rounded-xl">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0" 
                style={{ backgroundColor: topic.color }}
              ></div>
              <span className="font-medium text-text-1">{topic.name}</span>
            </div>
          ))}
        </div>

        <div className="bg-dark-surface-2 border border-dark-border p-8 rounded-2xl text-center my-12 shadow-sm">
          <h3 className="font-display text-2xl font-bold text-text-1 mb-4">Join us on Pinterest</h3>
          <p className="mb-6">We regularly post infographics, quick guides, and visual summaries of our best content. Follow us to get daily tech inspiration.</p>
          <a 
            href="https://pinterest.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E60023] hover:bg-[#c9001f] text-white px-6 py-3 rounded-full font-bold transition-colors"
          >
            <Bookmark size={20} />
            Follow on Pinterest <ExternalLink size={16} />
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-dark-border text-sm text-slate-400">
          <h4 className="font-bold text-text-1 mb-2">Affiliate Disclosure</h4>
          <p>
            Some of the links on this blog are affiliate links. This means that if you click on a link and make a purchase, we may receive a small commission at no extra cost to you. We only recommend products and services that we have personally used and believe will add value to our readers. Your support helps keep AIAndBeyond running. Thank you!
          </p>
        </div>
      </div>
    </div>
  );
}
