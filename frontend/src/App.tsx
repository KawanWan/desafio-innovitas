import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Characters from './pages/Characters';
import CharacterDetails from './pages/CharacterDetails';
import './App.css';
import Login from './pages/Login';
import MyCharacters from './pages/MyCharacters';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<div>Home (Dashboard)</div>} />

            <Route path="/characters" element={<Characters />} />

            <Route path="/characters/:id" element={<CharacterDetails />} />

            <Route path="/my-characters" element={<MyCharacters />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;