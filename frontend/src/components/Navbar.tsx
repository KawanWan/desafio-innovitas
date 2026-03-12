import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsOpen(false);
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-100 bg-[#0f1114]/90 backdrop-blur-xl border-b border-white/5">

      <div className="w-full flex justify-between items-center px-0">

        <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group bg-black/20 py-4 px-4">
          <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          </div>
          <span className="text-white font-black uppercase tracking-tighter text-lg md:text-xl">
            C-137 <span className="text-orange-500 font-light opacity-80">INTELLIGENCE</span>
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-4 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="space-y-1.5">
            <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        <div className="hidden md:flex items-center space-x-10 pr-4">
          <NavItem to="/" label="Home" active={isActive('/')} />
          <NavItem to="/characters" label="Multiverso" active={isActive('/characters')} />
          {isLoggedIn && <NavItem to="/my-characters" label="Minha Coleção" active={isActive('/my-characters')} />}
          <AuthButton isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </div>

        <div
          className={`absolute top-full right-0 mt-0 w-64 bg-[#14161a] border-l border-b border-white/10 p-6 flex flex-col items-start space-y-6 shadow-2xl transition-all duration-300 md:hidden z-110 
          ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}
        >
          <NavItem to="/" label="Dashboard" active={isActive('/')} onClick={closeMenu} />
          <NavItem to="/characters" label="Multiverse" active={isActive('/characters')} onClick={closeMenu} />
          {isLoggedIn && <NavItem to="/my-characters" label="Collection" active={isActive('/my-characters')} onClick={closeMenu} />}
          <div className="pt-4 border-t border-white/5 w-full">
            <AuthButton isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label, active, onClick }: { to: string; label: string; active: boolean; onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative flex flex-col items-start md:items-center group w-full md:w-auto"
  >
    <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold transition-colors duration-300 ${active ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>
      {label}
    </span>
    <div className={`h-0.5 bg-orange-500 transition-all duration-300 mt-1 ${active ? 'w-full' : 'w-0 group-hover:w-1/2 opacity-0'}`} />
  </Link>
);

const AuthButton = ({ isLoggedIn, onLogout }: { isLoggedIn: boolean; onLogout: () => void }) => (
  isLoggedIn ? (
    <button
      onClick={onLogout}
      className="border border-red-500/50 text-red-500 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 w-full md:w-auto text-center"
    >
      Logout
    </button>
  ) : (
    <Link
      to="/login"
      className="bg-orange-600 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-orange-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-600/20 text-center block w-full md:w-auto"
    >
      Login
    </Link>
  )
);

export default Navbar;