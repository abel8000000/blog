import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const About = () => {
    const aboutContent = "Simple blog to display my thoughts. Not much to say to be honest.\n\nMade with <3 by abel. 2024";
    return (
        <div id='about-text' className='post centered-content'>
            <Link to="#/" className="all-posts-button">
                Back to all posts
            </Link>
            <ReactMarkdown>{aboutContent}</ReactMarkdown>
        </div>
    );
};

export default About;