import React, { useState } from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import { Comment } from '../types';

const DeleteIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> );
const COMMENT_REACTIONS = ['👍', '❤️', '😂', '🤔'];

interface DiscussionSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  onReact: (id: string, emoji: string) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

const CommentCard: React.FC<{
  comment: Comment;
  onReact: (id: string, emoji: string) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}> = ({ comment, onReact, onDelete, isAdmin }) => {
  return (
    <div className="flex gap-3 group">
      <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-black flex-shrink-0 flex items-center justify-center font-bold text-xl font-heading">{comment.author.charAt(0)}</div>
      <div className="flex-grow">
        <div className="sketch-card bg-gray-100 p-3 shadow-none hover:shadow-none" style={{borderRadius: '1.5rem 1.5rem 1.5rem 0.25rem'}}>
          <div className="flex items-baseline gap-3"><h4 className="font-bold text-lg font-alt">{comment.author}</h4><span className="text-xs text-gray-500">{comment.timestamp}</span></div>
          <p className="text-gray-800">{comment.text}</p>
        </div>
        <div className="mt-1 flex items-center gap-1">
            {COMMENT_REACTIONS.map(emoji => ( <button key={emoji} onClick={() => onReact(comment.id, emoji)} className="sketch-button bg-white px-2 py-0 text-sm">{emoji} <span className="font-body text-xs ml-1">{comment.reactions[emoji] || 0}</span></button> ))}
            {isAdmin && <button onClick={() => onDelete(comment.id)} className="sketch-button bg-red-300 p-1 ml-auto"><DeleteIcon /></button>}
        </div>
      </div>
    </div>
  );
}

const DiscussionSection: React.FC<DiscussionSectionProps> = ({ comments, onAddComment, onReact, onDelete, isAdmin }) => {
  const [newComment, setNewComment] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };
  return (
    <section>
      <SectionHeader title="Discussion Board" />
      <Card>
        <div className="space-y-6 mb-8">
            {comments.length > 0 ? comments.map(comment => ( <CommentCard key={comment.id} comment={comment} onReact={onReact} onDelete={onDelete} isAdmin={isAdmin} /> )) : <p className="font-alt text-gray-500 text-center py-4">No comments yet. Be the first to start a conversation!</p>}
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
            <h3 className="text-xl font-heading font-bold">Join the conversation</h3>
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Share your thoughts..." className="w-full sketch-input h-24 resize-none" />
            <button type="submit" className="sketch-button bg-green-300 px-6 py-2">Post Comment</button>
        </form>
      </Card>
    </section>
  );
};

export default DiscussionSection;
