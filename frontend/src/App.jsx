import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LogIn';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Message from './pages/Message';
import Thread from './pages/Thread';
import Post from './pages/Post';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/threads/:threadId" element={<Thread />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
