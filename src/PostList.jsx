import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => (
    <>
        {posts.length === 0 ? (
            <p>Seems empty... for now</p>
        ) : (
            posts.map((post, index) => (
                <div key={index} className="post">
                    <Link to={`/post/${post.key.replace('./', '').replace('.md', '')}`}>
                        <p>{post.key.replace('./', '').replace('.md', '')}</p>
                    </Link>
                </div>
            ))
        )}
    </>
);

export default PostList;