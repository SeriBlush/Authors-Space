import React, { useState } from 'react';
import { Project, ProjectType, ProjectStatus } from '../types';
import Card from './common/Card';

const getYoutubeEmbedUrl = (url: string | undefined) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
};

// --- Project Viewer Modal ---
interface ProjectViewerModalProps {
    project: Project;
    onClose: () => void;
}
export const ProjectViewerModal: React.FC<ProjectViewerModalProps> = ({ project, onClose }) => {
    const embedUrl = project.type === ProjectType.VIDEO ? getYoutubeEmbedUrl(project.mediaUrl) : null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="sketch-card bg-white p-6 w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-4xl font-heading font-bold">{project.title}</h2>
                    <button onClick={onClose} className="sketch-button bg-gray-200 px-3 py-1 font-bold">X</button>
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                    {project.type === ProjectType.IMAGE && <img src={project.mediaUrl} alt={project.title} className="w-full h-auto border-2 border-black" />}
                    {project.type === ProjectType.VIDEO && embedUrl && (
                        <div className="aspect-video w-full">
                            <iframe src={embedUrl} title={project.title} className="w-full h-full border-2 border-black" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    )}
                    {(project.type === ProjectType.EBOOK || project.type === ProjectType.DOCUMENT || project.type === ProjectType.OTHER) && (
                        <img src={project.mediaUrl} alt="Project preview" className="w-full h-auto border-2 border-black mb-4" />
                    )}
                    <div className="w-full border-t-2 border-dashed border-black my-4"></div>
                    <p className="text-gray-800 whitespace-pre-wrap">{project.description}</p>
                    {project.tags && project.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map(tag => ( <span key={tag} className="text-xs bg-gray-200 border border-black px-2 py-1">{tag}</span> ))}
                        </div>
                    )}
                </div>
                {project.projectUrl && project.type !== ProjectType.WEBSITE && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="sketch-button bg-blue-300 mt-4 text-center py-2">
                        Open Full Project
                    </a>
                )}
            </div>
        </div>
    );
};

// --- Project Form Modal ---
interface ProjectFormModalProps {
    project: Project;
    onSave: (project: Project) => void;
    onClose: () => void;
}
export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ project, onSave, onClose }) => {
    const [formData, setFormData] = useState<Project>(project);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(name === 'tags') {
            setFormData(prev => ({ ...prev, tags: value.split(',').map(t => t.trim()) }));
        } else if (name === 'progress') {
            setFormData(prev => ({ ...prev, progress: Number(value) }));
        } else {
            setFormData(prev => ({...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); onClose(); };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card as="form" onSubmit={handleSubmit} className="p-6 space-y-3 w-full max-w-lg max-h-full overflow-y-auto">
                <h2 className="text-3xl font-heading">{project.id ? 'Edit' : 'Add'} Project</h2>
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="sketch-input w-full"/>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="sketch-input w-full h-24"/>
                <input name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} placeholder="Media URL (Image/Video Preview)" className="sketch-input w-full"/>
                <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} placeholder="Project URL (Live site/Source)" className="sketch-input w-full"/>
                <input name="tags" value={formData.tags.join(', ')} onChange={handleChange} placeholder="Tags (comma, separated)" className="sketch-input w-full"/>
                <div className="grid grid-cols-2 gap-4">
                    <select name="type" value={formData.type} onChange={handleChange} className="sketch-input w-full">{Object.values(ProjectType).map(type => <option key={type} value={type}>{type}</option>)}</select>
                    <select name="status" value={formData.status} onChange={handleChange} className="sketch-input w-full">{Object.values(ProjectStatus).map(status => <option key={status} value={status}>{status}</option>)}</select>
                </div>
                 {formData.status !== ProjectStatus.COMPLETED && <div><label className="text-sm">Progress: {formData.progress}%</label><input type="range" name="progress" min="0" max="100" value={formData.progress} onChange={handleChange} className="w-full"/></div>}
                <div className="flex gap-2"><button type="submit" className="sketch-button bg-green-300 px-4 py-1">Save</button><button type="button" onClick={onClose} className="sketch-button bg-gray-200 px-4 py-1">Cancel</button></div>
            </Card>
        </div>
    );
};
