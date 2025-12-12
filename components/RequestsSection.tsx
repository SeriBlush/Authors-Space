import React, { useState } from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import { Request } from '../types';

const DeleteIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>);
const UpvoteIcon = () => (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>);

interface RequestCardProps {
    request: Request;
    onUpvote: (id: string) => void;
    onDelete: (id: string) => void;
    isAdmin: boolean;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onUpvote, onDelete, isAdmin }) => {
    return (
        <div className="flex items-start gap-4 p-4 border-b-2 border-dashed border-black last:border-b-0 group">
            <button onClick={() => onUpvote(request.id)} className="flex flex-col items-center sketch-button bg-gray-100 p-2 text-center">
                <UpvoteIcon />
                <span className="font-bold text-lg">{request.upvotes}</span>
            </button>
            <div className="flex-grow">
                <p className="text-gray-800 text-lg">{request.text}</p>
                <span className="text-xs text-gray-500 font-alt">{request.timestamp} by an anonymous user</span>
            </div>
            {isAdmin && <button onClick={() => onDelete(request.id)} className="sketch-button bg-red-300 p-2"><DeleteIcon /></button>}
        </div>
    )
};

interface RequestsSectionProps {
    requests: Request[];
    isAdmin: boolean;
    onAddRequest: (text: string) => void;
    onUpvote: (id: string) => void;
    onDelete: (id: string) => void;
}

const RequestsSection: React.FC<RequestsSectionProps> = ({ requests, isAdmin, onAddRequest, onUpvote, onDelete }) => {
    const [newRequest, setNewRequest] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRequest.trim()) {
            onAddRequest(newRequest.trim());
            setNewRequest('');
        }
    };

    return (
        <section>
            <SectionHeader title="Requests & Ideas" />
             <Card className="space-y-6">
                <div className="bg-yellow-50 p-4 border-2 border-black">
                     <h3 className="text-xl font-heading font-bold">Have an idea?</h3>
                    <p className="text-sm mb-2 text-gray-600">Ask a question, request a feature, or post a trend hashtag. All submissions are anonymous!</p>
                    <form onSubmit={handleSubmit} className="flex items-stretch gap-2">
                        <input value={newRequest} onChange={(e) => setNewRequest(e.target.value)} placeholder="What's on your mind?..." className="sketch-input w-full"/>
                        <button type="submit" className="sketch-button bg-green-300 px-4">Submit</button>
                    </form>
                </div>
                <div>
                    {requests.length > 0 ? ( requests.map(req => <RequestCard key={req.id} request={req} onUpvote={onUpvote} onDelete={onDelete} isAdmin={isAdmin} />) ) : ( <p className="font-alt text-gray-500 text-center py-4">No requests yet. Be the first to share an idea!</p> )}
                </div>
            </Card>
        </section>
    );
};

export default RequestsSection;
