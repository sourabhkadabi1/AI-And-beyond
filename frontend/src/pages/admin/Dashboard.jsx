import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminPosts, deletePost, fetchSubscribers, deleteSubscriber } from '../../utils/api';
import toast from 'react-hot-toast';
import { FileText, Eye, EyeOff, Plus, Edit, Trash2, Calendar, Users, Download, Mail, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'subscribers'

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [postsRes, subsRes] = await Promise.allSettled([
        fetchAdminPosts(),
        fetchSubscribers()
      ]);

      if (postsRes.status === 'fulfilled') {
        setPosts(postsRes.value.data || []);
      } else {
        toast.error('Failed to load posts');
      }

      if (subsRes.status === 'fulfilled') {
        setSubscribers(subsRes.value.data || []);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await deletePost(id);
        toast.success('Post deleted successfully');
        const res = await fetchAdminPosts();
        setPosts(res.data || []);
      } catch (err) {
        toast.error('Failed to delete post');
      }
    }
  };

  const handleDeleteSubscriber = async (id) => {
    if (window.confirm('Are you sure you want to remove this subscriber?')) {
      try {
        await deleteSubscriber(id);
        toast.success('Subscriber removed');
        setSubscribers(prev => prev.filter(s => s.id !== id));
      } catch (err) {
        toast.error('Failed to remove subscriber');
      }
    }
  };

  const exportSubscribersCSV = () => {
    if (subscribers.length === 0) {
      toast('No subscribers to export yet!', { icon: 'ℹ️' });
      return;
    }

    const headers = 'ID,Email,Subscribed Date\n';
    const rows = subscribers
      .map(s => `${s.id},"${s.email}","${new Date(s.created_at).toISOString()}"`)
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `aiandbeyond-subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Subscribers list exported as CSV!');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-slate-50 dark:bg-[#080C14] flex justify-center items-start">
        <div className="text-slate-600 dark:text-slate-400 font-medium">Loading dashboard...</div>
      </div>
    );
  }

  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.is_published).length;
  const draftPosts = totalPosts - publishedPosts;
  const totalSubscribers = subscribers.length;

  const categories = posts.reduce((acc, post) => {
    const cat = post.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-slate-50 dark:bg-[#080C14] text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Manage articles, categories, and newsletter subscribers.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/new-post"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20 font-bold text-sm"
            >
              <Plus size={18} />
              <span>New Post</span>
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-8 text-sm">
            {error}
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="bg-indigo-50 dark:bg-indigo-950/50 p-3.5 rounded-xl text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              <FileText size={22} />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Posts</p>
              <p className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-0.5">{totalPosts}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="bg-emerald-50 dark:bg-emerald-950/50 p-3.5 rounded-xl text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <Eye size={22} />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Published</p>
              <p className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-0.5">{publishedPosts}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="bg-amber-50 dark:bg-amber-950/50 p-3.5 rounded-xl text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <EyeOff size={22} />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Drafts</p>
              <p className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-0.5">{draftPosts}</p>
            </div>
          </div>

          {/* Subscribers Card */}
          <div 
            onClick={() => setActiveTab('subscribers')}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm cursor-pointer hover:border-indigo-500/50 transition-all group"
          >
            <div className="bg-cyan-50 dark:bg-cyan-950/50 p-3.5 rounded-xl text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 group-hover:scale-105 transition-transform">
              <Users size={22} />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Subscribers</p>
              <p className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-0.5">{totalSubscribers}</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'posts'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900'
            }`}
          >
            <FileText size={16} />
            <span>Articles ({totalPosts})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'subscribers'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900'
            }`}
          >
            <Mail size={16} />
            <span>Subscribers ({totalSubscribers})</span>
          </button>
        </div>

        {/* TAB 1: POSTS VIEW */}
        {activeTab === 'posts' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Categories breakdown */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3 font-display">Active Categories</h2>
              <div className="flex flex-wrap gap-2.5">
                {Object.entries(categories).map(([cat, count]) => (
                  <div key={cat} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span>{cat}</span>
                    <span className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold">{count}</span>
                  </div>
                ))}
                {Object.keys(categories).length === 0 && (
                  <p className="text-xs text-slate-500">No categories active yet.</p>
                )}
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">All Articles</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="text-left py-4 px-6">Title</th>
                      <th className="text-left py-4 px-6">Category</th>
                      <th className="text-left py-4 px-6">Status</th>
                      <th className="text-left py-4 px-6">Date</th>
                      <th className="text-right py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                    {posts.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-slate-500">
                          No posts found. Create your first post!
                        </td>
                      </tr>
                    ) : (
                      posts.map((post) => (
                        <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white max-w-[320px] truncate">
                            {post.title}
                          </td>
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                            {post.category || 'None'}
                          </td>
                          <td className="py-4 px-6">
                            {post.is_published ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                <Eye size={12} /> Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                <EyeOff size={12} /> Draft
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={13} />
                              {new Date(post.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                to={`/admin/edit/${post.id}`}
                                className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                title="Edit post"
                              >
                                <Edit size={16} />
                              </Link>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="p-2 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                                title="Delete post"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SUBSCRIBERS VIEW */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">Newsletter Subscribers</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Readers who joined via the homepage email box.
                  </p>
                </div>
                <button
                  onClick={exportSubscribersCSV}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  <Download size={14} />
                  <span>Export as CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="text-left py-4 px-6">ID</th>
                      <th className="text-left py-4 px-6">Email Address</th>
                      <th className="text-left py-4 px-6">Joined Date</th>
                      <th className="text-right py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                    {subscribers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-14 text-center text-slate-500">
                          <Users size={36} className="mx-auto mb-3 opacity-30 text-indigo-500" />
                          <p className="font-bold text-slate-800 dark:text-slate-200">No subscribers yet</p>
                          <p className="text-xs mt-1">When visitors join via the homepage newsletter box, they will appear here.</p>
                        </td>
                      </tr>
                    ) : (
                      subscribers.map((sub, idx) => (
                        <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-mono text-xs text-slate-400">
                            #{sub.id}
                          </td>
                          <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <Mail size={15} className="text-indigo-600 dark:text-indigo-400" />
                            <span>{sub.email}</span>
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={13} />
                              {new Date(sub.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleDeleteSubscriber(sub.id)}
                              className="p-2 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                              title="Delete subscriber"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
