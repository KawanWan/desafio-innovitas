import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLocal } from '../services/api';

interface LocalCharacter {
  id: number;
  original_character_id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

const MyCharacters = () => {
  const [characters, setCharacters] = useState<LocalCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyCharacters = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await apiLocal.get('/characters', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCharacters(response.data);
    } catch (error) {
      console.error("Erro ao carregar coleção local", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCharacters();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!window.confirm("Confirmar exclusão deste registro da sua base de dados?")) return;

    const token = localStorage.getItem('token');
    try {
      await apiLocal.delete(`/characters/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCharacters(prev => prev.filter(char => char.id !== id));
    } catch (error) {
      console.error("Erro técnico na exclusão:", error);
      alert("Falha ao excluir personagem do servidor.");
    }
  };

  if (loading) return (
    <div className="h-screen bg-[#0f1114] flex items-center justify-center text-orange-500 uppercase tracking-widest text-[10px] animate-pulse">
      Acessando Banco de Dados Local...
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#0f1114] text-white pt-32 pb-20 px-6 md:px-20 font-sans overflow-x-hidden">
      <div className="fixed inset-0 z-0 opacity-5 grayscale pointer-events-none">
        <img src="/rick-and-morty-wallpaper.jpg" className="w-full h-full object-cover" alt="" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-left">
        <div className="mb-16 border-l-4 border-orange-500 pl-6">
          <span className="text-orange-500 text-[10px] tracking-[0.5em] uppercase font-bold mb-2 block">Arquivo Pessoal</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Meus Personagens</h1>
          <p className="text-white/30 text-[10px] mt-4 uppercase tracking-widest">Registros salvos em sua unidade de custódia local</p>
        </div>

        {characters.length === 0 ? (
          <div className="py-20 border border-dashed border-white/10 text-center flex flex-col items-center gap-6">
            <p className="text-white/20 uppercase tracking-[0.3em] text-xs">Nenhum registro localizado no banco de dados.</p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 border border-orange-500 text-orange-500 text-[10px] font-bold uppercase hover:bg-orange-500 hover:text-white transition-all"
            >
              Explorar Multiverso
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {characters.map((char) => (
              <div
                key={char.id}
                onClick={() => navigate(`/character/${char.original_character_id}`)}
                className="group relative bg-black/40 border border-white/10 p-3 hover:border-orange-500/50 transition-all duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

                <div className="relative overflow-hidden aspect-square border border-white/5">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent z-20">
                    <span className="text-[8px] text-orange-500 font-bold tracking-widest uppercase mb-1 block">
                      {char.species}
                    </span>
                    <h3 className="text-lg font-bold uppercase tracking-tight leading-tight group-hover:text-orange-400 transition-colors">
                      {char.name}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center relative z-30">
                  <div className="flex flex-col">
                    <span className="text-[7px] text-white/30 uppercase tracking-widest">Status de Custódia</span>
                    <span className={`text-[9px] font-bold uppercase ${char.status === 'Alive' ? 'text-green-500' : 'text-red-500'}`}>
                      {char.status === 'Alive' ? '● Ativo' : '● Inativo'}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleDelete(e, char.id)}
                    className="p-2 border border-white/10 text-white/20 hover:text-red-500 hover:border-red-500/50 transition-all flex items-center gap-2 group/btn"
                    title="Excluir Registro"
                  >
                    <span className="text-[9px] font-bold uppercase hidden group-hover/btn:block">Excluir</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCharacters;