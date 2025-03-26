import './App.css';
import { Routes, Route,  } from 'react-router-dom';

import Blogs from './pages/blogs';
import Signin from './pages/signin';
import Signup from './pages/signup';
import  {Homescreen}  from './components/home_screen';
import { Mainscreen } from './components/mainscreen';

function App() {
  

  return (
  
      <Routes>
        <Route path="/" element={<Homescreen/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blogs />} />
        <Route path="/mainscreen" element={<Mainscreen />} />
      </Routes>
  );
}

export default App;