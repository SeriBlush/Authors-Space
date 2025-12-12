import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ProjectType, ProjectStatus, PostType,
  Profile, Project, Post, BlogPost, Request, Comment 
} from './types';

import ProfileSection from './components/ProfileSection';
import WhatsNewSection from './components/WhatsNewSection';
import ProjectsSection from './components/ProjectsSection';
import UpcomingProjects from './components/UpcomingProjects';
import RequestsSection from './components/RequestsSection';
import BlogSection from './components/BlogSection';
import DiscussionSection from './components/DiscussionSection';
import PatreonSection from './components/PatreonSection';
import ContactSection from './components/ContactSection';
import BackgroundSketches from './components/BackgroundSketches';
import EasterEgg from './components/EasterEgg';
import PrivacyPopup from './components/PrivacyPopup';
import { ProjectFormModal, ProjectViewerModal } from './components/ProjectModals';

declare var firebase: any;

const App = () => {
  const ADMIN_PASSWORD = 'emergent';
  const ADMIN_USERNAME = 'seri.wrts';

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  const initialData = {
    profile: {
      name: "Alex Sketcherman", avatarUrl: "https://picsum.photos/seed/alex/200", isVerified: true,
      expertise: "Creative Developer & Storyteller", location: "Sketchburg, ART",
      company: { name: "Inkwell Studios", url: "#" },
      bio: "I turn ideas into interactive, hand-drawn experiences...",
      socials: { linkedin: '#', github: '#', twitter: '#' },
      email: 'azaleatvm@gmail.com', patreonUrl: 'https://www.patreon.com/c/AzaleaAutumn',
    },
    projects: [
      { id: '1', title: 'Interactive Storybook', description: 'A web-based storybook...', type: ProjectType.WEBSITE, status: ProjectStatus.COMPLETED, mediaUrl: 'https://picsum.photos/seed/storybook/400/300', projectUrl: '#', tags: ['React', 'Animation', 'UI/UX'] },
      { id: '2', title: 'Character Sketches', description: 'A collection of character designs...', type: ProjectType.IMAGE, status: ProjectStatus.COMPLETED, mediaUrl: 'https://picsum.photos/seed/characters/400/300', tags: ['Illustration', 'Art'] },
      { id: '3', title: 'Animation Reel', description: 'A short reel showcasing animation...', type: ProjectType.VIDEO, status: ProjectStatus.COMPLETED, mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', tags: ['Animation', 'Motion Graphics'] },
      { id: '4', title: 'The Art of Sketching', description: 'An eBook guide to digital sketching...', type: ProjectType.EBOOK, status: ProjectStatus.COMPLETED, mediaUrl: 'https://picsum.photos/seed/ebook/400/300', projectUrl: '#', tags: ['Education', 'Art'] },
      { id: '5', title: 'Portfolio Backend API', description: 'The backend driving this portfolio.', type: ProjectType.OTHER, status: ProjectStatus.IN_PROGRESS, mediaUrl: 'https://picsum.photos/seed/api/400/300', tags: ['Node.js', 'API'], progress: 75 },
      { id: '6', title: 'SVG Icon Pack', description: 'A new set of hand-drawn SVG icons.', type: ProjectType.OTHER, status: ProjectStatus.UPCOMING, mediaUrl: 'https://picsum.photos/seed/svg/400/300', tags: ['Design', 'SVG'], progress: 20 },
    ],
    posts: [
      { id: 'post3', type: PostType.POLL, title: 'What should my next project be?', content: 'Vote for the idea you find most exciting!', timestamp: '1 day ago', reactions: {'🤔': 5}, pollOptions: [{id: 'opt1', text: 'A retro game'}, {id: 'opt2', text: 'An animated short'}, {id: 'opt3', text: 'A new icon pack'}], pollVotes: {'opt1': 12, 'opt2': 25, 'opt3': 8} },
      { id: 'post2', type: PostType.IMAGE, title: 'New Character Design', content: 'A sneak peek of a character...', mediaUrl: 'https://picsum.photos/seed/new-char/600/400', timestamp: '3 days ago', reactions: { '❤️': 18, '👀': 11 } },
      { id: 'post1', type: PostType.TEXT, title: 'Portfolio Launch!', content: 'Welcome to my new portfolio!', timestamp: '1 week ago', reactions: { '🎉': 25, '👍': 15 } },
    ],
    blogPosts: [
        { id: 'blog1', title: 'My Journey into Creative Coding', content: 'It all started with a single blinking cursor...', timestamp: '2 weeks ago', tags: ['creative-coding', 'react', 'design'] },
        { id: 'blog2', title: 'The Power of a Sketch', content: 'Never underestimate the power of a simple sketch...', timestamp: '1 month ago', tags: ['art', 'philosophy', 'ui/ux'] }
    ],
    requests: [
        { id: 'req1', text: 'Can you make a tutorial on sketchy borders?', timestamp: '4 days ago', upvotes: 18 },
        { id: 'req2', text: '#MoreAnimations! The wiggle effect is great.', timestamp: '1 week ago', upvotes: 12 },
    ],
    comments: [
      { id: 'c1', author: 'ArtFan', text: 'This portfolio is so creative!', timestamp: '2 hours ago', reactions: { '❤️': 10, '👍': 5 } },
      { id: 'c2', author: 'DevDude', text: 'Nice work on the animations.', timestamp: '1 hour ago', reactions: { '🤔': 3 } },
    ]
  };

  const dbRef = useRef<any>(null);

  const [profile, setProfile] = useState<Profile>(initialData.profile);
  const [projects, setProjects] = useState<Project[]>(initialData.projects);
  const [posts, setPosts] = useState<Post[]>(initialData.posts);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialData.blogPosts);
  const [requests, setRequests] = useState<Request[]>(initialData.requests);
  const [comments, setComments] = useState<Comment[]>(initialData.comments);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  
  useEffect(() => {
    if (firebaseConfig.apiKey === "YOUR_API_KEY") {
      console.warn("Firebase config is not set. Please add your credentials.");
      return;
    }
    try {
      const app = firebase.initializeApp(firebaseConfig);
      const db = firebase.database();
      dbRef.current = db.ref('/');
      setIsDbConnected(true);
      const onDataChange = (snapshot: any) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setProfile(data.profile || initialData.profile);
          setProjects(data.projects || initialData.projects);
          setPosts(data.posts || initialData.posts);
          setBlogPosts(data.blogPosts || initialData.blogPosts);
          setRequests(data.requests || initialData.requests);
          setComments(data.comments || initialData.comments);
        } else {
          dbRef.current.set(initialData);
        }
      };
      dbRef.current.on('value', onDataChange);
      return () => dbRef.current.off('value', onDataChange);
    } catch (error) {
      console.error("Error initializing Firebase:", error);
      alert("Could not connect to the database. Check config.");
    }
  }, []);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const emptyProject: Project = { id: '', title: '', description: '', type: ProjectType.WEBSITE, status: ProjectStatus.COMPLETED, mediaUrl: 'https://picsum.photos/400/300', projectUrl: '', tags: [], progress: 0 };
  
  const keySequence = useRef('');
  const sequenceTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        if (sequenceTimeout.current) clearTimeout(sequenceTimeout.current);
        keySequence.current += e.key.toLowerCase();
        if (keySequence.current.length > 5) keySequence.current = keySequence.current.slice(-5);
        if (keySequence.current === 'story') { setShowEasterEgg(true); keySequence.current = ''; }
        sequenceTimeout.current = window.setTimeout(() => { keySequence.current = ''; }, 1500);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (sequenceTimeout.current) clearTimeout(sequenceTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('hasSeenPrivacyPopup')) setShowPrivacyPopup(true);
  }, []);

  const handleDismissPrivacyPopup = () => {
    localStorage.setItem('hasSeenPrivacyPopup', 'true');
    setShowPrivacyPopup(false);
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.toLowerCase() === ADMIN_USERNAME && passwordInput === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      setShowLogin(false);
    } else {
      alert('Incorrect credentials.');
    }
    setUsernameInput('');
    setPasswordInput('');
  }

  const handleResetData = () => {
    if (!isDbConnected) return alert("Database not connected.");
    if (window.confirm('Reset ALL content to defaults? This cannot be undone.')) {
      dbRef.current.set(initialData);
    }
  };

  const handleViewProject = (project: Project) => {
    if (project.type === ProjectType.WEBSITE && project.projectUrl) {
      window.open(project.projectUrl, '_blank', 'noopener,noreferrer');
    } else {
      setViewingProject(project);
    }
  };

  const handleUpdateProfile = (newProfile: Profile) => { if(isAdminMode && isDbConnected) firebase.database().ref('profile').set(newProfile); };
  
  const handleSaveProject = (projectToSave: Project) => {
    if(!isAdminMode || !isDbConnected) return;
    const currentProjects = projects || [];
    const projectIndex = currentProjects.findIndex(p => p.id === projectToSave.id);
    let newProjects;
    if (projectIndex > -1) {
      newProjects = currentProjects.map(p => p.id === projectToSave.id ? projectToSave : p);
    } else {
      newProjects = [...currentProjects, { ...projectToSave, id: `p${Date.now()}` }];
    }
    firebase.database().ref('projects').set(newProjects);
    setEditingProject(null);
  };
  
  const handleDeleteProject = (id: string) => {
    if(isAdminMode && isDbConnected && window.confirm('Delete this project?')) {
      firebase.database().ref('projects').set(projects.filter(p => p.id !== id));
    }
  };

  const handleAddPost = (postData: Partial<Post>) => {
    if (!isAdminMode || !isDbConnected) return;
    const newPost: Post = { 
      id: `post${Date.now()}`,
      timestamp: 'Just now',
      reactions: {}, 
      ...postData,
      type: postData.type || PostType.TEXT,
      title: postData.title || '',
      content: postData.content || '',
      ...(postData.type === PostType.POLL && { pollVotes: {} })
    };
    firebase.database().ref('posts').set([newPost, ...(posts || [])]);
  };
  
  const handleDeletePost = (postId: string) => { if (isAdminMode && isDbConnected && window.confirm('Delete post?')) firebase.database().ref('posts').set(posts.filter(p => p.id !== postId)); };
  
  const handleReactToPost = (postId: string, emoji: string) => {
    if (!isDbConnected) return;
    const newPosts = posts.map(p => p.id === postId ? {...p, reactions: {...p.reactions, [emoji]: (p.reactions[emoji] || 0) + 1}} : p);
    firebase.database().ref('posts').set(newPosts);
  };

  const handleVoteOnPoll = (postId: string, optionId: string) => {
    if (!isDbConnected) return;
    const newPosts = posts.map(p => {
        if (p.id === postId && p.type === PostType.POLL) { 
          const newVotes = { ...(p.pollVotes || {}) }; 
          newVotes[optionId] = (newVotes[optionId] || 0) + 1; 
          return {...p, pollVotes: newVotes}; 
        }
        return p;
    });
    firebase.database().ref('posts').set(newPosts);
  };

  const handleAddComment = (commentText: string) => {
    if (!isDbConnected) return;
    const newComment: Comment = { id: `c${Date.now()}`, author: 'Anonymous Reader', text: commentText, timestamp: 'Just now', reactions: {} };
    firebase.database().ref('comments').set([...(comments || []), newComment]);
  };

  const handleDeleteComment = (id: string) => { if(isAdminMode && isDbConnected) firebase.database().ref('comments').set(comments.filter(c => c.id !== id)); };

  const handleReactToComment = (commentId: string, emoji: string) => {
    if (!isDbConnected) return;
    const newComments = comments.map(c => c.id === commentId ? {...c, reactions: {...c.reactions, [emoji]: (c.reactions[emoji] || 0) + 1}} : c);
    firebase.database().ref('comments').set(newComments);
  };

  const handleSaveBlogPost = (postToSave: BlogPost) => {
    if(!isAdminMode || !isDbConnected) return;
    const currentPosts = blogPosts || [];
    const postIndex = currentPosts.findIndex(p => p.id === postToSave.id);
    let newBlogPosts;
    if (postIndex > -1) {
      newBlogPosts = currentPosts.map(p => p.id === postToSave.id ? postToSave : p);
    } else {
      newBlogPosts = [{ ...postToSave, id: `blog${Date.now()}`, timestamp: 'Just now' }, ...currentPosts];
    }
    firebase.database().ref('blogPosts').set(newBlogPosts);
  };

  const handleDeleteBlogPost = (id: string) => { if(isAdminMode && isDbConnected && window.confirm('Delete blog post?')) firebase.database().ref('blogPosts').set(blogPosts.filter(p => p.id !== id)); };
  
  const handleAddRequest = (text: string) => {
    if (!isDbConnected) return;
    const newRequest: Request = { id: `req${Date.now()}`, text, timestamp: 'Just now', upvotes: 1 };
    firebase.database().ref('requests').set([newRequest, ...(requests || [])]);
  };

  const handleUpvoteRequest = (id: string) => {
    if (!isDbConnected) return;
    const newRequests = requests.map(r => r.id === id ? {...r, upvotes: r.upvotes + 1} : r);
    firebase.database().ref('requests').set(newRequests);
  };

  const handleDeleteRequest = (id: string) => { if(isAdminMode && isDbConnected) firebase.database().ref('requests').set(requests.filter(r => r.id !== id)); };
  
  const completedProjects = useMemo(() => (projects || []).filter(p => p.status === ProjectStatus.COMPLETED), [projects]);
  const upcomingProjects = useMemo(() => (projects || []).filter(p => p.status !== ProjectStatus.COMPLETED).sort((a,b) => (b.progress || 0) - (a.progress || 0)), [projects]);

  return (
    <div className="bg-white text-black min-h-screen font-body relative overflow-x-hidden">
      <BackgroundSketches />
      {showEasterEgg && <EasterEgg onClose={() => setShowEasterEgg(false)} />}
      {showPrivacyPopup && <PrivacyPopup onDismiss={handleDismissPrivacyPopup} />}
      {editingProject && <ProjectFormModal project={editingProject} onSave={handleSaveProject} onClose={() => setEditingProject(null)} />}
      {viewingProject && <ProjectViewerModal project={viewingProject} onClose={() => setViewingProject(null)} />}
      {showLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <form onSubmit={handleLogin} className="sketch-card bg-white p-8 space-y-4 text-center w-80">
                  <h2 className="text-3xl font-heading">Login</h2>
                   <input type="text" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} placeholder="Username" className="sketch-input w-full text-center" autoFocus/>
                  <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Password" className="sketch-input w-full text-center"/>
                  <div className="flex gap-2 justify-center">
                    <button type="submit" className="sketch-button bg-green-300 px-4 py-1">Login</button>
                    <button type="button" onClick={() => setShowLogin(false)} className="sketch-button bg-gray-200 px-4 py-1">Cancel</button>
                  </div>
              </form>
          </div>
      )}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
        <header className="text-center space-y-2 relative max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-24">
            <h1 className="text-6xl md:text-8xl font-heading font-bold">Welcome</h1>
            <p className="text-xl md:text-2xl font-alt">to my creative sketchbook!</p>
            <div className="absolute top-0 right-0 flex flex-col sm:flex-row gap-2">
                {isAdminMode ? (
                  <>
                    <button onClick={handleResetData} className="sketch-button bg-gray-300 px-4 py-1 text-sm">Reset Data</button>
                    <button onClick={() => setIsAdminMode(false)} className="sketch-button bg-red-300 px-4 py-1 text-sm">Logout</button>
                  </>
                ) : (
                  <button onClick={() => setShowLogin(true)} className="sketch-button bg-yellow-200 px-4 py-1 text-sm">Login</button>
                )}
            </div>
        </header>
        <main className="max-w-5xl mx-auto space-y-16">
          <ProfileSection profile={profile} onUpdateProfile={handleUpdateProfile} isAdmin={isAdminMode} />
          <WhatsNewSection posts={posts} onAddPost={handleAddPost} onReact={handleReactToPost} onVote={handleVoteOnPoll} onDelete={handleDeletePost} isAdmin={isAdminMode} />
          <ProjectsSection projects={completedProjects} isAdmin={isAdminMode} onAdd={() => setEditingProject(emptyProject)} onEdit={setEditingProject} onDelete={handleDeleteProject} onView={handleViewProject} />
          <UpcomingProjects projects={upcomingProjects} isAdmin={isAdminMode} onAdd={() => setEditingProject({...emptyProject, status: ProjectStatus.IN_PROGRESS })} onEdit={setEditingProject} onDelete={handleDeleteProject} />
          <RequestsSection requests={requests} onAddRequest={handleAddRequest} onUpvote={handleUpvoteRequest} onDelete={handleDeleteRequest} isAdmin={isAdminMode}/>
          <BlogSection posts={blogPosts} onSave={handleSaveBlogPost} onDelete={handleDeleteBlogPost} isAdmin={isAdminMode} authorName={profile.name} />
          <DiscussionSection comments={comments} onAddComment={handleAddComment} onReact={handleReactToComment} onDelete={handleDeleteComment} isAdmin={isAdminMode} />
          {profile.patreonUrl && <PatreonSection url={profile.patreonUrl} />}
          <ContactSection email={profile.email} />
        </main>
        <footer className="text-center text-gray-600 font-alt border-t-2 border-dashed border-black pt-8 mt-16 max-w-5xl mx-auto">
            <p>&copy; 2025 Azalea.Avtm. All sketches reserved.</p>
            <p>Crafted by the author for curious readers.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
