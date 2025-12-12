import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import { BlogPost } from '../types';

const PlusIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const EditIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>);
const DeleteIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>);
const PaperclipIcon = () => ( <svg className="absolute top-4 -left-2 text-gray-400" width="30" height="80" viewBox="0 0 30 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 78C15 78 28 65 28 45C28 25 15 2 15 2C15 2 2 18 2 38C2 58 15 78 15 78Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 65C15 65 21 56 21 45C21 34 15 15 15 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg> );

const emptyPost: BlogPost = { id: '', title: '', content: '', tags: [], timestamp: '' };

const BlogPostForm: React.FC<{
    post: BlogPost;
    onSave: (post: BlogPost) => void;
    onCancel: () => void;
}> = ({ post, onSave, onCancel }) => {
    const [formData, setFormData] = useState(post);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'tags') { setFormData(prev => ({...prev, tags: value.split(',').map(t => t.trim()) })); } else { setFormData(prev => ({...prev, [name]: value})); }
    }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if(formData.title.trim() && formData.content.trim()) { onSave(formData); } }
    return (
        <Card className="my-8 bg-blue-50">
            <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="text-2xl font-heading">{post.id ? 'Edit' : 'New'} Blog Post</h3>
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" className="sketch-input w-full font-typewriter" />
                <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Start writing your story..." className="sketch-input w-full h-64 font-typewriter" />
                <input name="tags" value={formData.tags.join(', ')} onChange={handleChange} placeholder="Tags (comma, separated)" className="sketch-input w-full font-typewriter"/>
                <div className="flex gap-2"><button type="submit" className="sketch-button bg-green-300 px-4 py-1">Save Post</button><button type="button" onClick={onCancel} className="sketch-button bg-gray-200 px-4 py-1">Cancel</button></div>
            </form>
        </Card>
    )
}

const BlogPostCard: React.FC<{
    post: BlogPost;
    isAdmin: boolean;
    onEdit: (post: BlogPost) => void;
    onDelete: (id: string) => void;
    authorName: string;
}> = ({ post, isAdmin, onEdit, onDelete, authorName }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="relative border-b-2 border-dashed border-black py-6 pl-4 last:border-b-0 font-typewriter">
            <PaperclipIcon />
            <div className="pl-8">
                <div className="flex justify-between items-start">
                    <div className="text-sm text-gray-700 space-y-1"><p><span className="font-bold">FROM:</span> {authorName}</p><p><span className="font-bold">DATE:</span> {post.timestamp}</p></div>
                    {isAdmin && <div className="flex gap-2"><button onClick={() => onEdit(post)} className="sketch-button bg-yellow-200 p-2"><EditIcon /></button><button onClick={() => onDelete(post.id)} className="sketch-button bg-red-300 p-2"><DeleteIcon /></button></div>}
                </div>
                <div className="mt-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    <h3 className="text-xl font-bold flex items-baseline"><span className="font-bold mr-2">SUBJECT:</span> <span className="font-heading text-3xl">{post.title}</span></h3>
                    <div className="border-t-2 border-dashed border-black my-4"></div>
                    {isExpanded ? ( <p className="text-gray-800 whitespace-pre-wrap text-lg leading-relaxed">{post.content}</p> ) : ( <p className="text-gray-600 whitespace-pre-wrap text-lg leading-relaxed">{post.content.split('\n\n')[0]}<span className="text-blue-600 font-bold ml-2">(Click to read more)</span></p> )}
                </div>
                {isExpanded && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                        <span className="font-bold text-sm">KEYWORDS:</span>
                        {post.tags.map(tag => ( <span key={tag} className="text-sm bg-gray-200 border border-black px-2 py-0.5">#{tag}</span>))}
                    </div>
                )}
            </div>
        </div>
    )
}

interface BlogSectionProps {
    posts: BlogPost[];
    isAdmin: boolean;
    onSave: (post: BlogPost) => void;
    onDelete: (id: string) => void;
    authorName: string;
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts, isAdmin, onSave, onDelete, authorName }) => {
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    useEffect(() => { if (!isAdmin) setEditingPost(null); }, [isAdmin]);

    const handleSave = (post: BlogPost) => { onSave(post); setEditingPost(null); };

    return (
        <section>
            <div className="flex justify-between items-start">
                <SectionHeader title="From the Blog" />
                {isAdmin && !editingPost && <button onClick={() => setEditingPost(emptyPost)} className="sketch-button bg-green-300 p-2 flex items-center gap-2 -mt-2"><PlusIcon /> New Post</button>}
            </div>
            {isAdmin && editingPost && <BlogPostForm post={editingPost} onSave={handleSave} onCancel={() => setEditingPost(null)} />}
            <Card className="bg-amber-50">
                {posts.length > 0 ? ( posts.map(post => <BlogPostCard key={post.id} post={post} isAdmin={isAdmin} onEdit={setEditingPost} onDelete={onDelete} authorName={authorName} />) ) : ( <p className="font-alt text-gray-500 text-center py-4">No blog posts yet. Stay tuned!</p> )}
            </Card>
        </section>
    );
};

export default BlogSection;
