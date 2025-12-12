import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import { Profile } from '../types';

const VerifiedBadge = () => ( <svg className="w-6 h-6 inline-block text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.121 7.293a1 1 0 010 1.414l-4.5 4.5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 111.414-1.414L9.5 11.086l3.793-3.793a1 1 0 011.414 0z" /></svg> );
const LocationIcon = () => ( <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> );
const CompanyIcon = () => ( <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 21h-20v-16h20v16zm-10-12h-6v2h6v-2zm-6 4h6v2h-6v-2zm-2-8v-3h12v3h-12z" /></svg> );
const EditIcon = () => ( <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> );
const GithubIcon = () => ( <svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>);
const LinkedinIcon = () => ( <svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>);
const TwitterIcon = () => ( <svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>);
const PatreonIcon = () => ( <svg role="img" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Patreon</title><path d="M15.219.015c-4.433 0-8.035 3.602-8.035 8.035s3.602 8.035 8.035 8.035 8.035-3.602 8.035-8.035S19.652.015 15.219.015zm-9.035 2.55h-3.6v18.88h3.6V2.565z"/></svg>);

interface ProfileSectionProps {
  profile: Profile;
  onUpdateProfile: (newProfile: Profile) => void;
  isAdmin: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile, onUpdateProfile, isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState(profile);
  useEffect(() => { setEditableProfile(profile); }, [profile]);
  useEffect(() => { if (!isAdmin) setIsEditing(false); }, [isAdmin]);

  const handleSave = () => { onUpdateProfile(editableProfile); setIsEditing(false); };
  const handleCancel = () => { setEditableProfile(profile); setIsEditing(false); }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setEditableProfile(prev => ({...prev, avatarUrl: loadEvent.target?.result as string}));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
        // FIX: Cast `prev[keys[0] as keyof Profile]` to `object` to resolve spread type error.
        // This is safe because the form structure ensures that properties with a '.' in their name (e.g., 'socials.github') have an object as their parent.
        setEditableProfile(prev => ({...prev, [keys[0]]: {...(prev[keys[0] as keyof Profile] as object), [keys[1]]: value}}));
    } else {
        setEditableProfile(prev => ({...prev, [name]: value}));
    }
  }

  return (
    <Card>
      {isAdmin && !isEditing && ( <button onClick={() => setIsEditing(true)} className="sketch-button absolute top-4 right-4 bg-yellow-200 p-2 z-10 animate-wiggle"><EditIcon /></button> )}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
            <img src={editableProfile.avatarUrl} alt={profile.name} className="w-32 h-32 rounded-full border-2 border-black p-1 shadow-md" />
            {isEditing && (
              <div className="mt-2">
                <label htmlFor="avatarUpload" className="sketch-button bg-gray-200 text-sm py-1 px-3 cursor-pointer"> Upload Photo </label>
                <input type="file" id="avatarUpload" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
            )}
        </div>
        {isEditing ? <input type="text" name="name" value={editableProfile.name} onChange={handleChange} className="sketch-input text-3xl font-heading font-bold text-center w-full"/> : <h1 className="text-3xl font-heading font-bold flex items-center gap-2">{profile.name} {profile.isVerified && <VerifiedBadge />}</h1>}
        {isEditing ? <input type="text" name="expertise" value={editableProfile.expertise} onChange={handleChange} className="sketch-input text-lg text-gray-700 text-center w-full mt-1"/> : <p className="text-lg text-gray-700">{profile.expertise}</p>}
        {isEditing ? (
            <div className="text-left w-full mt-4 space-y-2 text-sm">
                <h4 className="font-heading font-bold text-lg mb-1">Edit Social Links</h4>
                <div className="flex items-center gap-2"><GithubIcon /> <input type="text" name="socials.github" value={editableProfile.socials.github || ''} onChange={handleChange} placeholder="GitHub URL" className="sketch-input w-full" /></div>
                <div className="flex items-center gap-2"><LinkedinIcon /> <input type="text" name="socials.linkedin" value={editableProfile.socials.linkedin || ''} onChange={handleChange} placeholder="LinkedIn URL" className="sketch-input w-full" /></div>
                <div className="flex items-center gap-2"><TwitterIcon /> <input type="text" name="socials.twitter" value={editableProfile.socials.twitter || ''} onChange={handleChange} placeholder="Twitter URL" className="sketch-input w-full" /></div>
                <div className="flex items-center gap-2"><PatreonIcon /> <input type="text" name="patreonUrl" value={editableProfile.patreonUrl || ''} onChange={handleChange} placeholder="Patreon URL" className="sketch-input w-full" /></div>
            </div>
        ) : (
            <div className="flex justify-center gap-4 my-4">
                {profile.socials.github && <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><GithubIcon/></a>}
                {profile.socials.linkedin && <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><LinkedinIcon/></a>}
                {profile.socials.twitter && <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><TwitterIcon/></a>}
            </div>
        )}
        <div className="text-left w-full mt-2 space-y-2 text-md">
            <div className="flex items-center"><LocationIcon /> {isEditing ? <input type="text" name="location" value={editableProfile.location} onChange={handleChange} className="sketch-input w-full"/> : profile.location}</div>
            <div className="flex items-center"><CompanyIcon /> {isEditing ? <input type="text" name="company.name" value={editableProfile.company.name} onChange={handleChange} className="sketch-input w-full"/> : `Works at ${profile.company.name}`}</div>
        </div>
        <div className="w-full border-t-2 border-dashed border-black my-6"></div>
        <div className="text-left w-full">
            <h3 className="text-2xl font-heading font-bold mb-2">About me</h3>
            {isEditing ? ( <textarea name="bio" value={editableProfile.bio} onChange={handleChange} className="w-full sketch-input h-40 resize-none" /> ) : ( <p className="text-gray-800 whitespace-pre-wrap">{profile.bio}</p> )}
        </div>
        {isEditing && ( <div className="flex gap-2 mt-4"><button onClick={handleSave} className="sketch-button bg-green-300 px-4 py-1 text-sm">Save</button><button onClick={handleCancel} className="sketch-button bg-gray-200 px-4 py-1 text-sm">Cancel</button></div> )}
      </div>
    </Card>
  );
};

export default ProfileSection;
