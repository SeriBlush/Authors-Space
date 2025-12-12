import React from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';

const PatreonIcon = () => ( <svg role="img" viewBox="0 0 24 24" className="w-6 h-6 inline-block mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Patreon</title><path d="M15.219.015c-4.433 0-8.035 3.602-8.035 8.035s3.602 8.035 8.035 8.035 8.035-3.602 8.035-8.035S19.652.015 15.219.015zm-9.035 2.55h-3.6v18.88h3.6V2.565z"/></svg> );

interface PatreonSectionProps {
    url: string;
}

const PatreonSection: React.FC<PatreonSectionProps> = ({ url }) => {
    return (
        <section>
            <SectionHeader title="Become a Patron" />
            <Card className="text-center bg-orange-100">
                <p className="text-lg mb-4">If you enjoy my work, consider supporting me on Patreon! You'll get access to exclusive content, behind-the-scenes updates, and more.</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="sketch-button bg-orange-400 px-8 py-3 text-xl inline-flex items-center"><PatreonIcon /> Support me on Patreon</a>
            </Card>
        </section>
    );
};

export default PatreonSection;
