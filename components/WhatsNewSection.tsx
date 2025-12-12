import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import { Post, PostType } from '../types';

// ... (imports)

const PlusIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const DeleteIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> );
const REACTIONS = ['👍', '❤️', '🎉', '👀'];

const getYoutubeEmbedUrl = (url: string | undefined) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

const PostForm: React.FC<{
    onSave: (postData: Partial<Post>) => void;
    onCancel: () => void;
}> = ({ onSave, onCancel }) => {
    const [type, setType] = useState(PostType.TEXT);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);
    
    const handlePollOptionChange = (index: number, value: string) => { const newOptions = [...pollOptions]; newOptions[index] = value; setPollOptions(newOptions); };
    const addPollOption = () => setPollOptions([...pollOptions, '']);
    const removePollOption = (index: number) => setPollOptions(pollOptions.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        let postData: Partial<Post> = { type, title, content };
        if (type === PostType.IMAGE || type === PostType.VIDEO) postData.mediaUrl = mediaUrl;
        if (type === PostType.LINK) postData.linkUrl = linkUrl;
        if (type === PostType.POLL) { postData.pollOptions = pollOptions.filter(opt => opt.trim()).map((opt, i) => ({ id: `opt${Date.now() + i}`, text: opt })); }
        onSave(postData);
    };

    return (
        <Card className="mb-8 bg-yellow-50">
            <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="text-2xl font-heading">New Update</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                    {Object.values(PostType).map(pt => (<label key={pt} className={`sketch-button px-3 py-1 cursor-pointer ${type === pt ? 'bg-yellow-300' : 'bg-white'}`}><input type="radio" name="postType" value={pt} checked={type === pt} onChange={() => setType(pt)} className="sr-only"/>{pt}</label>))}
                </div>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" className="sketch-input w-full" />
                {type === PostType.TEXT && <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's new?" className="sketch-input w-full h-28" />}
                {(type === PostType.IMAGE || type === PostType.VIDEO) && <input value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} placeholder={type === PostType.IMAGE ? "Image URL" : "YouTube Video URL"} className="sketch-input w-full" />}
                {type === PostType.LINK && <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="Link URL" className="sketch-input w-full" />}
                {(type === PostType.IMAGE || type === PostType.VIDEO || type === PostType.LINK) && <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Caption (optional)" className="sketch-input w-full h-16" />}
                {type === PostType.POLL && (<div className="space-y-2">
                     <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Poll question/description" className="sketch-input w-full h-16" />
                    {pollOptions.map((opt, i) => ( <div key={i} className="flex items-center gap-2"><input value={opt} onChange={(e) => handlePollOptionChange(i, e.target.value)} placeholder={`Option ${i+1}`} className="sketch-input w-full" />{pollOptions.length > 2 && <button type="button" onClick={() => removePollOption(i)} className="sketch-button bg-red-200 px-2 text-xs">X</button>}</div> ))}
                    <button type="button" onClick={addPollOption} className="sketch-button bg-gray-200 text-sm px-3 py-1">Add Option</button>
                </div>)}
                <div className="flex gap-2"><button type="submit" className="sketch-button bg-green-300 px-4 py-1">Post</button><button type="button" onClick={onCancel} className="sketch-button bg-gray-200 px-4 py-1">Cancel</button></div>
            </form>
        </Card>
    );
};

const PostCard: React.FC<{
    post: Post;
    onReact: (postId: string, emoji: string) => void;
    onVote: (postId: string, optionId: string) => void;
    onDelete: (postId: string) => void;
    isAdmin: boolean;
}> = ({ post, onReact, onVote, onDelete, isAdmin }) => {
    const embedUrl = post.type === PostType.VIDEO ? getYoutubeEmbedUrl(post.mediaUrl) : null;
    const totalVotes = post.type === PostType.POLL && post.pollVotes ? Object.values(post.pollVotes).reduce((sum, count) => sum + Number(count), 0) : 0;
    
    return (
      <div className="border-b-2 border-dashed border-black py-6 last:border-b-0 relative group">
          {isAdmin && (
            <button onClick={() => onDelete(post.id)} className="sketch-button bg-red-300 p-2 absolute top-4 right-4"><DeleteIcon /></button>
          )}
          <span className="text-xs text-gray-500 font-alt">{post.timestamp}</span>
          <h3 className="text-3xl font-heading font-bold mt-1">{post.title}</h3>
          <p className="text-gray-800 mt-2 whitespace-pre-wrap">{post.content}</p>
          {post.type === PostType.IMAGE && post.mediaUrl && <img src={post.mediaUrl} alt={post.title} className="mt-4 border-2 border-black w-full md:max-w-lg" />}
          {post.type === PostType.VIDEO && embedUrl && <div className="aspect-video mt-4 w-full md:max-w-lg"><iframe src={embedUrl} title={post.title} className="w-full h-full border-2 border-black" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>}
          {post.type === PostType.LINK && post.linkUrl && <a href={post.linkUrl} target="_blank" rel="noopener noreferrer" className="sketch-button bg-blue-200 mt-4 block text-center py-2 truncate">Visit Link: {post.linkUrl}</a>}
          {post.type === PostType.POLL && post.pollOptions && (
              <div className="mt-4 space-y-2">
                  {post.pollOptions.map(opt => {
                      const votes = post.pollVotes?.[opt.id] || 0;
                      const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                      return (
                      <div key={opt.id}>
                           <div className="flex justify-between items-baseline text-sm mb-1"><span>{opt.text}</span><span className="font-alt">{votes} vote{votes !== 1 && 's'}</span></div>
                          <div className="flex items-center gap-2">
                              <div className="w-full progress-bar-container bg-gray-200 !h-8"><div className="progress-bar-fill !bg-yellow-400" style={{ width: `${percentage}%` }}></div></div>
                              <button onClick={() => onVote(post.id, opt.id)} className="sketch-button bg-yellow-200 px-3 py-1 text-sm">Vote</button>
                          </div>
                      </div>
                  )})}
              </div>
          )}
          <div className="mt-4 flex items-center gap-2">
              {REACTIONS.map(emoji => ( <button key={emoji} onClick={() => onReact(post.id, emoji)} className="sketch-button bg-white px-3 py-1 text-lg">{emoji} <span className="text-sm font-body ml-1">{post.reactions[emoji] || 0}</span></button> ))}
          </div>
      </div>
    )
};

interface WhatsNewSectionProps {
    posts: Post[];
    isAdmin: boolean;
    onAddPost: (postData: Partial<Post>) => void;
    onReact: (postId: string, emoji: string) => void;
    onVote: (postId: string, optionId: string) => void;
    onDelete: (postId: string) => void;
}

const WhatsNewSection: React.FC<WhatsNewSectionProps> = ({ posts, isAdmin, onAddPost, onReact, onVote, onDelete }) => {
    const [isAdding, setIsAdding] = useState(false);
    useEffect(() => { if (!isAdmin) setIsAdding(false); }, [isAdmin]);

    const handleSavePost = (postData: Partial<Post>) => { onAddPost(postData); setIsAdding(false); }

    return (
        <section>
            <div className="flex justify-between items-start">
                <SectionHeader title="What's New?" />
                {isAdmin && !isAdding && ( <button onClick={() => setIsAdding(true)} className="sketch-button bg-green-300 p-2 flex items-center gap-2 -mt-2"><PlusIcon /> New Post</button> )}
            </div>
            {isAdmin && isAdding && <PostForm onSave={handleSavePost} onCancel={() => setIsAdding(false)} />}
            <Card>
                {posts.length > 0 ? ( posts.map(post => <PostCard key={post.id} post={post} onReact={onReact} onVote={onVote} onDelete={onDelete} isAdmin={isAdmin} />) ) : ( <p className="font-alt text-gray-500 text-center py-4">No updates yet. Check back soon!</p> )}
            </Card>
        </section>
    );
};

export default WhatsNewSection;
