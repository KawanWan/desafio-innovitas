import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLocal } from '../services/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const response = await apiLocal.post('/auth/login', { email, password });
        localStorage.setItem('token', response.data.access_token);
        navigate('/');
      } else {
        await apiLocal.post('/auth/register', { name, email, password });
        alert('Registro concluído na base de dados. Proceda com o login.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Falha na autenticação/registro:', error);
      alert('Falha na autenticação. Verifique suas credenciais de acesso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f1114] px-6">

      <div className="fixed inset-0 z-0">
        <img
          src="/rick-and-morty-wallpaper.jpg"
          className="w-full h-full object-cover opacity-20 grayscale-[0.5]"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1114] via-transparent to-[#0f1114]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 p-10 shadow-2xl">

        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500" />

        <div className="mb-10 text-center">
          <span className="text-orange-500 text-[10px] tracking-[0.6em] uppercase font-bold mb-4 block animate-pulse">
            Security Clearance Required
          </span>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
            {isLogin ? 'Acesso' : 'Registro'} <br />
            <span className="opacity-30 italic">Terminal</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Nome de Identificação</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-orange-500/50 transition-all font-mono"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">E-mail de Cadastro</label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-orange-500/50 transition-all font-mono"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Chave de Segurança</label>
            <input
              type="password"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-orange-500/50 transition-all font-mono"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 text-[11px] uppercase tracking-[0.4em] transition-all active:scale-95 disabled:opacity-50 mt-4 shadow-lg shadow-orange-500/20"
          >
            {loading ? 'Processando...' : isLogin ? 'Validar Acesso' : 'Criar Registro'}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-white/5 pt-8">
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-4">
            {isLogin ? 'Não possui credenciais?' : 'Já possui autorização?'}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.2em] hover:underline"
          >
            {isLogin ? '[ Solicitar Registro ]' : '[ Voltar ao Login ]'}
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 text-white/10 text-[9px] uppercase tracking-[1em] pointer-events-none">
        Innovitas Authentication System v.2.6
      </div>
    </div>
  );
};

export default Login;