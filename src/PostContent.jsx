import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const PostContent = ({ post }) => (
    <div id='about-text' className='post'>
        <Link to="/" className="all-posts-button">
            Back to all posts
        </Link>
        <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
);

export default PostContent;