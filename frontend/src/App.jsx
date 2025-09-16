import './App.css'
import Toolbar from '../components /Toolbar'
import AnimatedHero from '../pages/AnimatedHero'
import Home from '../pages/home'

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route 
        path='/' 
        element={
          <>
            <Toolbar/>
            <AnimatedHero/>
            <Home/>
          </>
        }>
      </Route>
      </Routes>
      <Routes>
        <Route path="/About" element={<About/>} /> 
        <Route path="/Technology" element={<Technology/>} />   
      </Routes>
    </Router>
  );
}

export default App
