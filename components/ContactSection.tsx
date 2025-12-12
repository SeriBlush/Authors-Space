import React from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';

const MailIcon = () => ( <svg className="w-6 h-6 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> );

interface ContactSectionProps {
    email: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ email }) => {
    return (
        <section>
            <SectionHeader title="Contact the Author" />
            <Card className="text-center">
                <p className="text-lg mb-4">Have a question or a project idea? I'd love to hear from you!</p>
                <a href={`mailto:${email}`} className="sketch-button bg-blue-300 px-8 py-3 text-xl inline-flex items-center"><MailIcon /> Send a Message</a>
            </Card>
        </section>
    );
};

export default ContactSection;
