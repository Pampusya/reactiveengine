
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Mainpage from './pages/mainpage';
import Hed from './compact/header/Hed';
import Profilepage from './pages/profilepage';
import Catalog from './pages/catalog';
import Singinpage from './pages/singin';
import Singuppage from './pages/singup';
import Infoauto from './pages/infoauto';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Hed/>}>
          <Route index element={<Mainpage/>}/>
          <Route path='profile/:id' element={<Profilepage/>}/>
          <Route path='catalog' element={<Catalog/>}/>
          <Route path='in' element={<Singinpage/>}/>
          <Route path='up' element={<Singuppage/>}/>
          <Route path='car/:id' element={<Infoauto/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
