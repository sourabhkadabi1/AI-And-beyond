import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAdminPosts, updatePost, uploadImage } from '../../utils/api';
import toast from 'react-hot-toast';
import { Upload, Eye, Send } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TipTapLink from '@tiptap/extension-link';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-dark-surface-2 border-b border-dark-border rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${editor.isActive('bold') ? 'bg-accent text-white' : 'bg-dark-surface text-text-2 hover:text-text-1'}`}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${editor.isActive('italic') ? 'bg-accent text-white' : 'bg-dark-surface text-text-2 hover:text-text-1'}`}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-accent text-white' : 'bg-dark-surface text-text-2 hover:text-text-1'}`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-accent text-white' : 'bg-dark-surface text-text-2 hover:text-text-1'}`}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${editor.isActive('bulletList') ? 'bg-accent text-white' : 'bg-dark-surface text-text-2 hover:text-text-1'}`}
      >
        Bullet List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${editor.isActive('orderedList') ? 'bg-accent text-white' : 'bg-dark-surface text-text-2 hover:text-text-1'}`}
      >
        Ordered List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${editor.isActive('codeBlock') ? 'bg-accent text-white' : 'bg-dark-surface text-text-2 hover:text-text-1'}`}
      >
        Code Block
      </button>
      <button
        type="button"
        onClick={setLink}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${editor.isActive('link') ? 'bg-accent text-white' : 'bg-dark-surface text-text-2 hover:text-text-1'}`}
      >
        Link
      </button>
      <button
        type="button"
        onClick={addImage}
        className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors bg-dark-surface text-text-2 hover:text-text-1"
      >
        Image
      </button>
    </div>
  );
};

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'AI Tools',
    excerpt: '',
    cover_image: '',
    video_url: '',
    pinterest_desc: '',
    meta_desc: '',
    tags: '',
    is_published: true
  });
  
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TipTapLink.configure({ openOnClick: false }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[400px] p-4 focus:outline-none'
      }
    }
  });

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const res = await fetchAdminPosts();
        const posts = res.data || [];
        const post = posts.find(p => p.id === parseInt(id) || p.id === id);
        
        if (post) {
          setFormData({
            title: post.title || '',
            slug: post.slug || '',
            category: post.category || 'AI Tools',
            excerpt: post.excerpt || '',
            cover_image: post.cover_image || '',
            video_url: post.video_url || '',
            pinterest_desc: post.pinterest_desc || '',
            meta_desc: post.meta_desc || '',
            tags: post.tags || '',
            is_published: post.is_published !== false
          });
          
          if (editor && post.content) {
            editor.commands.setContent(post.content);
          }
        } else {
          toast.error('Post not found');
          navigate('/admin/dashboard');
        }
      } catch (err) {
        toast.error('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id, editor, navigate]);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    setFormData(prev => ({
      ...prev,
      title,
      slug
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const data = new FormData();
      data.append('file', file);
      
      const response = await uploadImage(data);
      const result = response.data;
      if (result && result.url) {
        setFormData(prev => ({ ...prev, cover_image: result.url }));
        toast.success('Image uploaded successfully');
      }
    } catch (err) {
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editor) return;

    try {
      setIsSubmitting(true);
      
      const postData = {
        ...formData,
        content: editor.getHTML(),
      };

      await updatePost(id, postData);
      toast.success('Post updated successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error('Failed to update post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-dark-bg flex justify-center items-start">
        <div className="text-text-2">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-dark-bg">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-text-1">Edit Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-dark-surface-2 border border-dark-border rounded-xl p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-text-2 text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleTitleChange}
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-text-1 focus:outline-none focus:border-accent"
                      placeholder="Enter post title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-text-2 text-sm font-medium mb-2">Slug</label>
                    <div className="flex items-center border border-dark-border rounded-lg bg-dark-surface overflow-hidden">
                      <span className="px-3 text-text-2/50 text-sm bg-dark-surface-2 border-r border-dark-border py-3">
                        ainandbeyond.com/blog/
                      </span>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full bg-transparent px-3 py-3 text-text-1 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-text-2 text-sm font-medium mb-2">Content</label>
                    <div className="border border-dark-border rounded-lg bg-dark-surface overflow-hidden">
                      <MenuBar editor={editor} />
                      <EditorContent editor={editor} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-text-2 text-sm font-medium mb-2">
                      Excerpt 
                      <span className="text-text-2/50 ml-2 text-xs font-normal">
                        ({formData.excerpt.length} chars - 150-300 chars recommended)
                      </span>
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-text-1 focus:outline-none focus:border-accent resize-none"
                      placeholder="Brief description for blog listing..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-dark-surface-2 border border-dark-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text-1 mb-4">Publish Settings</h3>
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-text-2 text-sm font-medium">Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_published"
                        checked={formData.is_published}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-dark-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                  
                  <div className="pt-4 border-t border-dark-border">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        'Saving...'
                      ) : (
                        <>
                          <Send size={18} />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-dark-surface-2 border border-dark-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text-1 mb-4">Post Details</h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-text-2 text-sm font-medium mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-text-1 focus:outline-none focus:border-accent appearance-none"
                    >
                      <option value="AI Tools">AI Tools</option>
                      <option value="Web Hosting">Web Hosting</option>
                      <option value="Tech Reviews">Tech Reviews</option>
                      <option value="Tutorials">Tutorials</option>
                      <option value="Productivity">Productivity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-text-2 text-sm font-medium mb-2">Cover Image</label>
                    <div className="border-2 border-dashed border-dark-border rounded-lg p-4 text-center hover:bg-dark-surface transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="cover-upload"
                      />
                      <label htmlFor="cover-upload" className="cursor-pointer flex flex-col items-center">
                        <Upload size={24} className="text-text-2 mb-2" />
                        <span className="text-sm text-text-2 font-medium">
                          {uploadingImage ? 'Uploading...' : 'Click to upload image'}
                        </span>
                      </label>
                    </div>
                    {formData.cover_image && (
                      <div className="mt-3 relative rounded-lg overflow-hidden border border-dark-border">
                        <img src={formData.cover_image} alt="Cover preview" className="w-full h-auto" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-text-2 text-sm font-medium mb-2">Video URL (Optional)</label>
                    <input
                      type="text"
                      name="video_url"
                      value={formData.video_url}
                      onChange={handleChange}
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-text-1 focus:outline-none focus:border-accent"
                      placeholder="YouTube URL"
                    />
                  </div>

                  <div>
                    <label className="block text-text-2 text-sm font-medium mb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-text-1 focus:outline-none focus:border-accent"
                      placeholder="react, tutorial, web (comma separated)"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-dark-surface-2 border border-dark-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text-1 mb-4">SEO Settings</h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-text-2 text-sm font-medium mb-2">
                      Meta Description
                      <span className="text-text-2/50 ml-2 text-xs font-normal">
                        ({formData.meta_desc.length}/160)
                      </span>
                    </label>
                    <textarea
                      name="meta_desc"
                      value={formData.meta_desc}
                      onChange={handleChange}
                      maxLength={160}
                      rows="3"
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-text-1 focus:outline-none focus:border-accent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-text-2 text-sm font-medium mb-2">Pinterest Description</label>
                    <textarea
                      name="pinterest_desc"
                      value={formData.pinterest_desc}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-text-1 focus:outline-none focus:border-accent resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
