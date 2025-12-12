export enum ProjectType {
  WEBSITE = 'Website',
  IMAGE = 'Image',
  VIDEO = 'Video',
  EBOOK = 'eBook',
  DOCUMENT = 'Document',
  OTHER = 'Other',
}

export enum ProjectStatus {
  COMPLETED = 'Completed',
  IN_PROGRESS = 'In Progress',
  UPCOMING = 'Upcoming',
}

export enum PostType {
  TEXT = 'Text',
  IMAGE = 'Image',
  VIDEO = 'Video',
  LINK = 'Link',
  POLL = 'Poll',
}

export interface Profile {
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  expertise: string;
  location: string;
  company: {
    name: string;
    url: string;
  };
  bio: string;
  socials: {
    linkedin: string;
    github: string;
    twitter: string;
  };
  email: string;
  patreonUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  mediaUrl: string;
  projectUrl?: string;
  tags: string[];
  progress?: number;
}

export interface Post {
    id: string;
    type: PostType;
    title: string;
    content: string;
    timestamp: string;
    reactions: { [key: string]: number };
    mediaUrl?: string;
    linkUrl?: string;
    pollOptions?: { id: string; text: string }[];
    pollVotes?: { [key: string]: number };
}

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    timestamp: string;
    tags: string[];
}

export interface Request {
    id: string;
    text: string;
    timestamp: string;
    upvotes: number;
}

export interface Comment {
    id: string;
    author: string;
    text: string;
    timestamp: string;
    reactions: { [key: string]: number };
}
