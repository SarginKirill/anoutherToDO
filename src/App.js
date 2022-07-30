import { Route, Routes } from 'react-router-dom';
import './App.scss';
import NavBar from './Components/NavBar/NavBar';
import Registration from './Pages/Registration/Registration';
import HomePage from './Pages/HomePage/HomePage';


// Привет:)

function App() {

  return (

  <>
    <NavBar />
    <Routes>
      <Route path='/' element={ <HomePage /> } />
      <Route path='/registration' element={<Registration />} />
    </Routes>
  </>
  );
}

export default App;
