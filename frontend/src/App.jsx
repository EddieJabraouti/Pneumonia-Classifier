import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Toolbar from '../components/Toolbar'
import AnimatedHero from '../pages/AnimatedHero'
import Home from '../pages/home'
import About from '../pages/About'
import Model from '../pages/Model'
import Technology from '../pages/Technology'

function App() {
  return (
    <Router>
      <Toolbar/>
      <Routes>
        <Route 
        path='/' 
        element={
          <>
            <AnimatedHero/>
            <Home/>
          </>
        }>
      </Route>
      </Routes>
      <Routes>
        <Route path="/Technology" element={<Technology/>} />   
        <Route path="/Model" element={<Model/>}/>
      </Routes>
    </Router>
  );
}

export default App
