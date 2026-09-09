import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminPosts, deletePost } from '../../utils/api';
import toast from 'react-hot-toast';
import { FileText, Eye, EyeOff, Plus, Edit, Trash2, Calendar } from 'lucide-react';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminPosts();
      setPosts(res.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await deletePost(id);
        toast.success('Post deleted successfully');
        loadPosts();
      } catch (err) {
        toast.error('Failed to delete post');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-dark-bg flex justify-center items-start">
        <div className="text-text-2">Loading dashboard...</div>
      </div>
    );
  }

  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.is_published).length;
  const draftPosts = totalPosts - publishedPosts;

  const categories = posts.reduce((acc, post) => {
    const cat = post.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-1">Dashboard</h1>
          <Link
            to="/admin/new-post"
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-lg transition-colors font-medium"
          >
            <Plus size={20} />
            <span>New Post</span>
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-dark-surface-2 border border-dark-border p-6 rounded-xl flex items-center gap-4">
            <div className="bg-accent/20 p-4 rounded-lg text-accent">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-text-2 text-sm font-medium">Total Posts</p>
              <p className="text-2xl font-bold text-text-1">{totalPosts}</p>
            </div>
          </div>
          <div className="bg-dark-surface-2 border border-dark-border p-6 rounded-xl flex items-center gap-4">
            <div className="bg-green-500/20 p-4 rounded-lg text-green-400">
              <Eye size={24} />
            </div>
            <div>
              <p className="text-text-2 text-sm font-medium">Published</p>
              <p className="text-2xl font-bold text-text-1">{publishedPosts}</p>
            </div>
          </div>
          <div className="bg-dark-surface-2 border border-dark-border p-6 rounded-xl flex items-center gap-4">
            <div className="bg-yellow-500/20 p-4 rounded-lg text-yellow-400">
              <EyeOff size={24} />
            </div>
            <div>
              <p className="text-text-2 text-sm font-medium">Drafts</p>
              <p className="text-2xl font-bold text-text-1">{draftPosts}</p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-text-1 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(categories).map(([cat, count]) => (
              <div key={cat} className="bg-dark-surface-2 border border-dark-border px-4 py-2 rounded-full text-text-1 flex items-center gap-2">
                <span>{cat}</span>
                <span className="bg-dark-surface text-text-2 text-xs px-2 py-0.5 rounded-full">{count}</span>
              </div>
            ))}
            {Object.keys(categories).length === 0 && (
              <p className="text-text-2">No categories found.</p>
            )}
          </div>
        </div>

        <div className="bg-dark-surface-2 border border-dark-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-dark-border">
            <h2 className="text-xl font-semibold text-text-1">All Posts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-surface border-b border-dark-border">
                <tr>
                  <th className="text-left py-4 px-6 text-text-2 font-medium text-sm">Title</th>
                  <th className="text-left py-4 px-6 text-text-2 font-medium text-sm">Category</th>
                  <th className="text-left py-4 px-6 text-text-2 font-medium text-sm">Status</th>
                  <th className="text-left py-4 px-6 text-text-2 font-medium text-sm">Date</th>
                  <th className="text-right py-4 px-6 text-text-2 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-text-2">
                      No posts found. Create your first post!
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="border-b border-dark-border/50 hover:bg-dark-surface transition-colors">
                      <td className="py-4 px-6 text-text-1 font-medium max-w-[300px] truncate">
                        {post.title}
                      </td>
                      <td className="py-4 px-6 text-text-2">
                        {post.category || 'None'}
                      </td>
                      <td className="py-4 px-6">
                        {post.is_published ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            <Eye size={12} /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                            <EyeOff size={12} /> Draft
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-text-2 text-sm flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            to={`/admin/edit/${post.id}`}
                            className="p-2 text-text-2 hover:text-accent transition-colors bg-dark-surface rounded-lg hover:bg-dark-surface-2 border border-transparent hover:border-dark-border"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-text-2 hover:text-red-400 transition-colors bg-dark-surface rounded-lg hover:bg-dark-surface-2 border border-transparent hover:border-red-500/20"
                          >
                            <Trash2 size={18} />
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
    </div>
  );
}
