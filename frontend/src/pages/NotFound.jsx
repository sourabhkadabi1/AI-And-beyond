import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateSEO } from '../utils/seo';

export default function NotFound() {
  useEffect(() => {
    updateSEO({
      title: '404: Page Not Found | AIAndBeyond',
      description: 'The requested page could not be found on AIAndBeyond.',
      noindex: true
    });
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <div className="text-center bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-[10px] p-12 max-w-md mx-4 shadow-sm">
        <h1 className="text-6xl font-extrabold font-display text-[#F5A623] mb-4">404</h1>
        <p className="text-xl font-bold text-[#111111] dark:text-white mb-2">Page Not Found</p>
        <p className="text-[#555555] dark:text-[#A0A0A0] mb-8 text-sm leading-relaxed">
          The page you are looking for does not exist, has been removed, or has been relocated.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#E09915] text-[#111111] px-6 py-3 rounded-lg font-bold text-sm transition-colors shadow-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
