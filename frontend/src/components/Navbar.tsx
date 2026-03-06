import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Rick & Morty Innovitas</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/characters" className="hover:text-blue-200">Personagens</Link>
          <Link to="/my-characters" className="hover:text-blue-200">Meus Personagens</Link>
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50">
            Login / Cadastro
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;