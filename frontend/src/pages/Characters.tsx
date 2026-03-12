import { useEffect, useState } from 'react';
import { apiExternal } from '../services/api';
import { Link } from 'react-router-dom';

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await apiExternal.get(`/character/?page=${page}&name=${search}`);
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error("Erro ao buscar variantes", error);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [page, search]);

  return (
    <div className="relative min-h-screen bg-[#0f1114] text-white pt-24 pb-20 px-6 md:px-20">
      <div className="fixed inset-0 z-0">
        <img
          src="/rick-and-morty-wallpaper.jpg"
          className="w-full h-full object-cover opacity-10 grayscale"
          alt="Background"
        />
        <div className="absolute inset-0 bg-[#0f1114]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-10">
          <div>
            <span className="text-orange-500 text-[10px] tracking-[0.5em] uppercase font-bold mb-2 block">Scanner de Variantes</span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Multiverso</h1>
          </div>

          <div className="relative w-full md:w-96 group">
            <input
              type="text"
              placeholder="FILTRAR POR NOME..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] font-bold tracking-[0.3em] uppercase focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/20"
            />
            <div className="absolute bottom-0 left-0 h-[1px] bg-orange-500 w-0 group-focus-within:w-full transition-all duration-500" />
          </div>
        </div>

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <p className="text-[10px] tracking-[0.5em] uppercase animate-pulse">Sincronizando Frequências...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {characters.map((char) => (
                <CharacterCard key={char.id} char={char} />
              ))}
            </div>

            <div className="mt-20 flex justify-center items-center gap-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-[10px] font-bold uppercase tracking-[0.3em] disabled:opacity-20 hover:text-orange-500 transition-colors"
              >
                [ Anterior ]
              </button>
              <span className="text-orange-500 font-mono text-sm">
                {page.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-[10px] font-bold uppercase tracking-[0.3em] disabled:opacity-20 hover:text-orange-500 transition-colors"
              >
                [ Próximo ]
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CharacterCard = ({ char }: { char: Character }) => (
  <Link
    to={`/characters/${char.id}`}
    className="group relative bg-white/5 border border-white/10 overflow-hidden hover:border-orange-500/50 transition-all duration-500"
  >
    <div className="aspect-square overflow-hidden">
      <img
        src={char.image}
        alt={char.name}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 brightness-105"
      />
    </div>
    <div className="p-6">
      <p className="text-orange-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{char.species} - {char.status}</p>
      <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-orange-100 transition-colors">{char.name}</h3>
    </div>
    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/0 group-hover:border-orange-500/50 transition-all" />
  </Link>
);

export default Characters;