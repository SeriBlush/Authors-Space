import React from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import { Project } from '../types';

const PlusIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const EditIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> );
const DeleteIcon = () => ( <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> );

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="w-full progress-bar-container bg-white mt-2">
      <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

interface UpcomingProjectsProps {
  projects: Project[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const UpcomingProjects: React.FC<UpcomingProjectsProps> = ({ projects, isAdmin, onAdd, onEdit, onDelete }) => {
  
  const UpcomingProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
      <div className="border-b-2 border-dashed border-black py-4 last:border-b-0 relative group">
          {isAdmin && (
            <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => onEdit(project)} className="sketch-button bg-yellow-200 p-2"><EditIcon/></button>
                <button onClick={() => onDelete(project.id)} className="sketch-button bg-red-300 p-2"><DeleteIcon/></button>
            </div>
          )}
          <div className="flex justify-between items-start">
              <div>
                  <h3 className="text-2xl font-heading font-bold">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.status}</p>
              </div>
              <span className="font-alt text-2xl font-bold">{project.progress ?? 0}%</span>
          </div>
          <ProgressBar progress={project.progress ?? 0} />
      </div>
    )
  }

  if (projects.length === 0 && !isAdmin) return null;

  return (
    <section>
      <div className="flex justify-between items-start">
          <SectionHeader title="What's Next?" />
          {isAdmin && <button onClick={onAdd} className="sketch-button bg-green-300 p-2 flex items-center gap-2 -mt-2"><PlusIcon/> Add Upcoming</button>}
      </div>
      <Card>
        <div className="space-y-4">
          {projects.map(project => ( <UpcomingProjectCard key={project.id} project={project} /> ))}
          {projects.length === 0 && <p className="font-alt text-gray-500 text-center py-4">Nothing in the pipeline. Add a new upcoming project!</p>}
        </div>
      </Card>
    </section>
  );
};

export default UpcomingProjects;
