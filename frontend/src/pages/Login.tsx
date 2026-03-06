import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLocal } from '../services/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await apiLocal.post('/auth/login', { email, password });
        localStorage.setItem('token', response.data.access_token);
        alert('Login realizado com sucesso!');
        navigate('/');
      } else {
        await apiLocal.post('/auth/register', { name, email, password });
        alert('Cadastro realizado! Agora faça seu login.');
        setIsLogin(true);
      }
    } catch {
      alert('Erro ao processar requisição. Verifique suas credenciais.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Entrar' : 'Criar Conta'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Senha</label>
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="ml-1 text-blue-600 font-bold hover:underline"
        >
          {isLogin ? 'Cadastre-se' : 'Faça Login'}
        </button>
      </p>
    </div>
  );
};

export default Login;