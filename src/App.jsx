import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import neotribal from './assets/images/blog-neotribal.png';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentView, setCurrentView] = useState('posts'); // 'posts' or 'list'
  const [selectedPost, setSelectedPost] = useState(null);
  const postsWindowRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const context = require.context('./posts', false, /\.md$/);
      const posts = await Promise.all(
        context.keys().map(async (key) => {
          const content = await fetch(context(key)).then((res) => res.text());
          return { content, key };
        })
      );
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  const scrollToTop = () => {
    if (postsWindowRef.current) {
      postsWindowRef.current.scrollTo({ top: 0 });
    }
  };

  const showPostList = () => {
    setCurrentView('list');
    scrollToTop();
  };

  const showPost = (post) => {
    setSelectedPost(post);
    setCurrentView('posts');
    scrollToTop();
  };

  const goBackToMain = () => {
    setSelectedPost(null);
    setCurrentView('posts');
    scrollToTop();
  };

  const showLatestPost = () => {
    if (posts.length > 0) {
      const latestPost = posts[posts.length - 1]; // Assuming the last post is the most recent
      showPost(latestPost);
    }
  };

  const showAbout = () => {
    const aboutContent = "Simple blog to display my thoughts. Not much to say to be honest.\n\nMade with <3 by abel. 2024";
    setSelectedPost({ content: aboutContent });
    setCurrentView('about');
    scrollToTop();
  };

  return (
    <div id="content">
      <img id='neotribal' src={ neotribal } alt='neotribal' />
      <div id='header'>
        <h1>abel's blog</h1>
        <div id='navbar' className='window'>
          <div className='headerButton' onClick={showLatestPost}>
            <p>latest</p>
          </div>
          <hr className='verticalSeparator' aria-orientation="vertical" />
          <div className='headerButton' onClick={showPostList}>
            <p>index</p>
          </div>
          <hr className='verticalSeparator' aria-orientation="vertical" />
          <div className='headerButton' onClick={showAbout}>
            <p>about</p>
          </div>
        </div>
      </div>
      <div id='posts-window' className='window' ref={postsWindowRef}>
        {currentView === 'list' ? (
          <div className="post-list">
            <button className="right-aligned-button" onClick={goBackToMain}>Back to all posts</button>
            {posts.length === 0 ? (
              <p>Seems empty... for now</p>
            ) : (
              posts.slice().reverse().map((post, index) => (
                <div key={index} className="postListItem" onClick={() => showPost(post)}>
                  <p>{post.key.replace('./', '').replace('.md', '')}</p>
                </div>
              ))
            )}
          </div>
        ) : (
          selectedPost ? (
            <div id='about-text' className={`post ${currentView === 'about' ? 'centered-content' : ''}`}>
              <button className="right-aligned-button" onClick={goBackToMain}>Back to all posts</button>
              <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
            </div>
          ) : (
            <>
              {posts.length === 0 ? (
                <p>Seems empty... for now</p>
              ) : (
                posts.slice(-5).reverse().map((post, index) => ( // Display only the last 5 posts in reverse order
                  <div key={index} className="post">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                    {index < 4 && <hr className='horizontalSeparator' />} {/* Add separator after each post except the last one */}
                  </div>
                ))
              )}
              {posts.length > 0 && (
                <div className="morePostsMessageContainer">
                  <span className="morePostsMessage" onClick={showPostList}>Wanna see more? Check the index</span>
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