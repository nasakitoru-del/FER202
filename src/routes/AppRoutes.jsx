import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Management from '../pages/Management';
import Natural from '../pages/Natural';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Favorites from '../pages/Favorites';

export default function AppRoutes({ isLoggedIn, userProfile, setUserProfile }) {
  return (
    <Routes>
      <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
      <Route path="/detail/:id" element={<Detail userProfile={userProfile} isLoggedIn={isLoggedIn} />} />
      <Route 
        path="/management" 
        element={
          isLoggedIn && userProfile?.isAdmin 
            ? <Management isLoggedIn={isLoggedIn} /> 
            : <Navigate to="/" replace />
        } 
      />
      <Route path="/profile" element={<Profile userProfile={userProfile} setUserProfile={setUserProfile} />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/natural" element={<Natural />} />
      <Route path="/contact" element={<Contact userProfile={userProfile} isLoggedIn={isLoggedIn} />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}