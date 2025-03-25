//import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Blogs from './pages/blogs';
import Signin from './pages/signin';
import Signup from './pages/signup';
function App() {

  return (
    <BrowserRouter>
   <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/blog/:id" element={<Blogs/>}/>
   </Routes>
  </BrowserRouter>
  )
}

export default App;
