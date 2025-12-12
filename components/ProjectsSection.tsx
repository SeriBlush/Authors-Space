import React, { useState } from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import { Project, ProjectType } from '../types';

const EditIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> );
const DeleteIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> );
const PlusIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> );

interface ProjectsSectionProps {
  projects: Project[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onView: (project: Project) => void;
}

const ProjectCard: React.FC<{
  project: Project;
  isAdmin: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onView: (project: Project) => void;
}> = ({ project, isAdmin, onEdit, onDelete, onView }) => {
    return (
        <Card className="flex flex-col h-full group">
            {isAdmin && ( <div className="absolute top-2 right-2 flex gap-2"><button onClick={() => onEdit(project)} className="sketch-button bg-yellow-200 p-2"><EditIcon/></button><button onClick={() => onDelete(project.id)} className="sketch-button bg-red-300 p-2"><DeleteIcon/></button></div> )}
            <div className="aspect-[4/3] bg-gray-100 border-2 border-black mb-4 cursor-pointer" onClick={() => onView(project)}>
              <img src={project.mediaUrl} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow flex flex-col">
                <span className="text-sm bg-black text-white px-2 py-0.5 self-start font-alt mb-2">{project.type}</span>
                <h3 className="text-2xl font-heading font-bold">{project.title}</h3>
                <p className="text-gray-700 flex-grow mt-1">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">{project.tags.map(tag => ( <span key={tag} className="text-xs bg-gray-200 border border-black px-2 py-1">{tag}</span> ))}</div>
            </div>
            <button onClick={() => onView(project)} className="sketch-button bg-blue-300 mt-4 text-center py-2">View Project</button>
        </Card>
    );
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, isAdmin, onAdd, onEdit, onDelete, onView }) => {
  const [filter, setFilter] = useState('All');
  const projectTypes = ['All', ...Object.values(ProjectType)];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.type === filter);
  
  return (
    <section>
      <div className="flex justify-between items-start">
        <SectionHeader title="My Projects" />
        {isAdmin && <button onClick={onAdd} className="sketch-button bg-green-300 p-2 flex items-center gap-2 -mt-2"><PlusIcon/> Add Project</button>}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {projectTypes.map(type => ( <button key={type} onClick={() => setFilter(type)} className={`sketch-button px-4 py-1 text-sm ${filter === type ? 'bg-yellow-300' : 'bg-white'}`}>{type}</button>))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map(project => ( <ProjectCard key={project.id} project={project} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} onView={onView} /> ))}
        {filteredProjects.length === 0 && <p className="font-alt text-gray-500">No projects of this type yet. Scribble some up!</p>}
      </div>
    </section>
  );
};

export default ProjectsSection;
