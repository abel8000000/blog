import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

const AppRouter = () => (
    <Router basename="/blog">
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/latest" element={<App view="latest" />} />
            <Route path="/index" element={<App view="index" />} />
            <Route path="/about" element={<App view="about" />} />
            <Route path="/post/:id" element={<App view="post" />} />
        </Routes>
    </Router>
);

export default AppRouter;