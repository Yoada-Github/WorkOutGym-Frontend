import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home';

function App() {

  return (
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/home' element={<Home />} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
  )
}

export default App
