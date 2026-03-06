import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Characters from './pages/Characters';
import CharacterDetails from './pages/CharacterDetails';
import './App.css';

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
            
            <Route path="/my-characters" element={<div>Meus Personagens (Local)</div>} />
            
            <Route path="/login" element={<div>Login / Cadastro</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;