import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PostList from './PostList';
import PostContent from './PostContent';
import About from './About';
import './App.css';
import neotribal from './assets/images/blog-neotribal.png';

function App({ view }) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const postsWindowRef = useRef(null);
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            const context = require.context('./posts', false, /\.md$/);
            const posts = await Promise.all(
                context.keys().map(async (key) => {
                    const content = await fetch(context(key)).then((res) => res.text());
                    return { content, key };
                })
            );
            console.log('Fetched posts:', posts); // Debugging log
            setPosts(posts);
        };

        fetchPosts();
    }, []);

    const scrollToTop = useCallback(() => {
        if (postsWindowRef.current) {
            postsWindowRef.current.scrollTo({ top: 0 });
        }
    }, []);

    const showPostList = useCallback(() => {
        setSelectedPost(null);
        scrollToTop();
    }, [scrollToTop]);

    const showPost = useCallback((post) => {
        console.log('Showing post:', post); // Debugging log
        setSelectedPost(post);
        scrollToTop();
    }, [scrollToTop]);

    const showLatestPost = useCallback(() => {
        if (posts.length > 0) {
            const latestPost = posts[posts.length - 1];
            showPost(latestPost);
        }
    }, [posts, showPost]);

    useEffect(() => {
        console.log('View:', view); // Debugging log
        if (view === 'latest') {
            showLatestPost();
        } else if (view === 'about') {
            setSelectedPost({ content: "Simple blog to display my thoughts. Not much to say to be honest.\n\nMade with <3 by abel. 2024" });
        } else if (view === 'post' && id) {
            const post = posts.find((p) => p.key === `./${id}.md`);
            if (post) {
                showPost(post);
            }
        } else if (view === 'index') {
            showPostList();
        } else {
            showPostList(); // Reset to post list for the homepage
        }
    }, [view, id, posts, showLatestPost, showPostList, showPost]);

    // Reset the state when the location changes
    useEffect(() => {
        if (location.pathname === '/blog' || location.pathname === '/') {
            showPostList();
        }
    }, [location, showPostList]);

    return (
        <div id="content">
            <img id='neotribal' src={neotribal} alt='neotribal' />
            <div id='header'>
                <Link to="/" className='headerTitle'>
                    <h1>abel's blog</h1>
                </Link>
                <div id='navbar' className='window'>
                    <Link to="/latest" className='headerButton'>
                        <p>latest</p>
                    </Link>
                    <hr className='verticalSeparator' aria-orientation="vertical" />
                    <Link to="/index" className='headerButton'>
                        <p>index</p>
                    </Link>
                    <hr className='verticalSeparator' aria-orientation="vertical" />
                    <Link to="/about" className='headerButton'>
                        <p>about</p>
                    </Link>
                </div>
            </div>
            <div id='posts-window' className='window' ref={postsWindowRef}>
                {selectedPost ? (
                    view === 'about' ? (
                        <About />
                    ) : (
                        <PostContent post={selectedPost} />
                    )
                ) : (
                    view === 'index' ? (
                        <PostList posts={posts} />
                    ) : (
                        <>
                            {posts.length === 0 ? (
                                <p>Seems empty... for now</p>
                            ) : (
                                posts.slice(-5).reverse().map((post, index) => (
                                    <div key={index} className="post">
                                        <ReactMarkdown>{post.content}</ReactMarkdown>
                                        {index < 4 && <hr className='horizontalSeparator' />}
                                    </div>
                                ))
                            )}
                            {posts.length > 0 && (
                                <div className="morePostsMessageContainer">
                                    <Link to="/index" className="morePostsMessage">Wanna see more? Check the index</Link>
                                </div>
                            )}
                        </>
                    )
                )}
            </div>
        </div>
    );
}

export default App;