import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAdminPosts, fetchAdminPost, fetchPost, updatePost, uploadImage } from '../../utils/api';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';
import { Upload, Eye, EyeOff, Send, Image as ImageIcon, Loader2, X, Save } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TipTapLink from '@tiptap/extension-link';
import { TableKit } from '@tiptap/extension-table';

const MenuBar = ({ editor, onPasteHtml, onUploadContentImage, uploadingContentImage }) => {
  const fileInputRef = React.useRef(null);

  if (!editor) {
    return null;
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file && onUploadContentImage) {
      await onUploadContentImage(file);
    }
    e.target.value = '';
  };

  const isValidUrl = (url) => {
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
      return false;
    }
    return /^(https?:\/\/|mailto:|tel:|\/|#)/.test(trimmed) || !trimmed.includes(':');
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    if (!isValidUrl(url)) {
      toast.error('Invalid URL. Only http/https links are allowed.');
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={handleImageClick}
        disabled={uploadingContentImage}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors bg-dark-surface text-text-2 hover:text-text-1 hover:bg-dark-surface/80 disabled:opacity-50"
        title="Upload screenshot/image from your computer"
      >
        {uploadingContentImage ? (
          <>
            <Loader2 size={16} className="animate-spin text-accent" />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <ImageIcon size={16} />
            <span>Image</span>
          </>
        )}
      </button>
      <button
        type="button"
        onClick={onPasteHtml}
        className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30 ml-auto"
        title="Paste HTML code and instantly convert to formatted text"
      >
        Paste HTML
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
  const [showHtmlModal, setShowHtmlModal] = useState(false);
  const [htmlInput, setHtmlInput] = useState('');
  const [initialContent, setInitialContent] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TipTapLink.configure({ openOnClick: false }),
      TableKit.configure({
        table: { resizable: true },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[400px] p-4 focus:outline-none'
      },
      handlePaste: (view, event) => {
        const text = event.clipboardData?.getData('text/plain');
        if (text && /<\/?(p|h1|h2|h3|h4|div|ul|ol|li|blockquote|strong|em|table|hr)\b/i.test(text)) {
          event.preventDefault();
          const sanitized = DOMPurify.sanitize(text);
          editor?.commands.setContent(sanitized, false);
          return true;
        }
        return false;
      }
    }
  });

  const handlePasteHtml = () => {
    setHtmlInput('');
    setShowHtmlModal(true);
  };

  const handleApplyHtml = () => {
    if (htmlInput.trim()) {
      const sanitized = DOMPurify.sanitize(htmlInput);
      editor?.commands.setContent(sanitized, false);
      toast.success('HTML formatted content loaded into editor!');
    }
    setShowHtmlModal(false);
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        let post = null;

        // 1. Try dedicated single post endpoint
        try {
          const singleRes = await fetchAdminPost(id);
          if (singleRes?.data) {
            post = singleRes.data;
          }
        } catch {
          // Fallback to list search if single endpoint is not yet live
        }

        // 2. Fallback to admin posts list
        if (!post) {
          const res = await fetchAdminPosts();
          const posts = res.data || [];
          post = posts.find(p => p.id === parseInt(id) || p.id === id);
        }

        // 3. Fallback to public post by slug to guarantee we get full content
        if (post && (!post.content || post.content.trim() === '')) {
          try {
            const publicRes = await fetchPost(post.slug);
            if (publicRes?.data?.content) {
              post.content = publicRes.data.content;
            }
          } catch {
            // Post might be draft/unpublished
          }
        }

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

          if (post.content) {
            setInitialContent(post.content);
            if (editor && !editor.isDestroyed) {
              editor.commands.setContent(post.content, false);
            }
          }
        } else {
          toast.error('Post not found');
          navigate('/admin/dashboard');
        }
      } catch {
        toast.error('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id, navigate]);

  // Synchronize editor whenever editor becomes ready or initialContent arrives
  useEffect(() => {
    if (editor && initialContent && !editor.isDestroyed) {
      if (editor.isEmpty || editor.getHTML() === '<p></p>') {
        editor.commands.setContent(initialContent, false);
      }
    }
  }, [editor, initialContent]);

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

  const [uploadingContentImage, setUploadingContentImage] = useState(false);

  const handleContentImageUpload = async (file) => {
    if (!file) return;
    try {
      setUploadingContentImage(true);
      const data = new FormData();
      data.append('file', file);
      const response = await uploadImage(data);
      const result = response.data;
      if (result && result.url) {
        editor?.chain().focus().setImage({ src: result.url }).run();
        toast.success('Image inserted into article!');
      }
    } catch (err) {
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setUploadingContentImage(false);
    }
  };

  const handleSave = async (publishStatus = null) => {
    if (!editor) return;

    if (!formData.title?.trim()) {
      toast.error('Please enter a post title before saving.');
      return;
    }

    const editorHtml = editor.getHTML();
    const isPub = publishStatus !== null ? publishStatus : formData.is_published;

    if (isPub && (!editorHtml || editorHtml.trim() === '' || editorHtml === '<p></p>')) {
      toast.error('Post content is empty! Please write or paste your content before publishing.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const postData = {
        ...formData,
        is_published: isPub,
        content: editorHtml || '',
      };

      await updatePost(id, postData);
      toast.success(isPub ? 'Post published successfully!' : 'Draft updated successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Update post error:', err);
      const detail = err.response?.data?.detail;
      let errorMsg = 'Failed to update post. Please check backend connection.';
      if (typeof detail === 'string') {
        errorMsg = detail;
      } else if (Array.isArray(detail) && detail[0]?.msg) {
        errorMsg = `${detail[0].loc?.slice(1).join('.') || 'Field'}: ${detail[0].msg}`;
      } else if (err.message) {
        errorMsg = err.message;
      }
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
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
                        aiandbeyondtech.com/blog/
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
                      <MenuBar
                        editor={editor}
                        onPasteHtml={handlePasteHtml}
                        onUploadContentImage={handleContentImageUpload}
                        uploadingContentImage={uploadingContentImage}
                      />
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
                    <div>
                      <span className="text-text-2 text-sm font-medium block">Current Status</span>
                      <span className="text-xs text-text-2/60">
                        {formData.is_published ? 'Visible to public' : 'Hidden from public (Draft)'}
                      </span>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      formData.is_published 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {formData.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {formData.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-dark-border/50">
                    <span className="text-text-2 text-xs font-medium">Publish on save</span>
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
                  
                  <div className="pt-4 border-t border-dark-border space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handleSave(true)}
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Send size={18} />
                      <span>{isSubmitting ? 'Saving...' : (formData.is_published ? 'Update & Keep Published' : 'Publish Post')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSave(false)}
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center gap-2 bg-dark-surface hover:bg-dark-surface/80 text-amber-400 border border-amber-500/30 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Save size={16} />
                      <span>{formData.is_published ? 'Switch to Draft (Unpublish)' : 'Save Draft Changes'}</span>
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
                      <option value="AI Agents & Automation">AI Agents & Automation</option>
                      <option value="Tutorials">Tutorials</option>
                      <option value="Productivity">Productivity</option>
                      <option value="MakeMoneyWithAI">MakeMoneyWithAI</option>
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

      {showHtmlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-dark-surface border border-dark-border rounded-xl w-full max-w-3xl flex flex-col max-h-[85vh] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border bg-dark-surface-2">
              <h3 className="text-lg font-bold text-text-1">Paste HTML Content</h3>
              <button
                type="button"
                onClick={() => setShowHtmlModal(false)}
                className="text-text-2 hover:text-text-1 p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col overflow-hidden">
              <p className="text-xs text-text-2 mb-2">
                Paste your full raw HTML code here. Headings, tables, blockquotes, lists, and code blocks will convert into formatted editor content.
              </p>
              <textarea
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                placeholder="<h2>Section Title</h2><p>Paste your HTML content here...</p>"
                className="w-full flex-1 min-h-[320px] p-4 font-mono text-xs bg-dark-bg border border-dark-border rounded-lg text-text-1 focus:outline-none focus:border-accent resize-none"
              />
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-dark-border bg-dark-surface-2">
              <button
                type="button"
                onClick={() => setShowHtmlModal(false)}
                className="px-4 py-2 rounded-lg text-sm text-text-2 hover:text-text-1 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyHtml}
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-accent text-white hover:bg-accent/90 transition-colors"
              >
                Apply HTML to Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
