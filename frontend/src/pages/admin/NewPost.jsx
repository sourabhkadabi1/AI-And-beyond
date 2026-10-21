import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, uploadImage } from '../../utils/api';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';
import { Upload, Eye, Send, Image as ImageIcon, Loader2, X } from 'lucide-react';
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
    // Trigger file picker
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file && onUploadContentImage) {
      await onUploadContentImage(file);
    }
    // reset input so the same file can be picked again if needed
    e.target.value = '';
  };

  const isValidUrl = (url) => {
    // Block dangerous URL schemes
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
      return false;
    }
    // Allow http, https, mailto, tel, and relative URLs
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

export default function NewPost() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editor) return;

    try {
      setIsSubmitting(true);
      
      const postData = {
        ...formData,
        content: editor.getHTML(),
      };

      await createPost(postData);
      toast.success('Post created successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-dark-bg">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-text-1">Create New Post</h1>
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
                        'Publishing...'
                      ) : (
                        <>
                          <Send size={18} />
                          {formData.is_published ? 'Publish Post' : 'Save Draft'}
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
