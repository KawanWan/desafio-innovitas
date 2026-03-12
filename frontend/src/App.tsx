import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Characters from './pages/Characters';
import CharacterDetails from './pages/CharacterDetails';
import './App.css';
import Login from './pages/Login';
import MyCharacters from './pages/MyCharacters';
import Home from './pages/Home';
import LocalCharacterDetails from './components/LocalCharacterDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f1114]">
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/characters" element={<Characters />} />

            <Route path="/characters/:id" element={<CharacterDetails />} />

            <Route path="/my-characters/:id" element={<LocalCharacterDetails />} />

            <Route path="/my-characters" element={<MyCharacters />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;