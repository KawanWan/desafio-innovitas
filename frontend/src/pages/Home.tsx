import { useEffect, useState } from 'react';
import { apiExternal, apiLocal } from '../services/api';
import { Link } from 'react-router-dom';

interface Stats {
  characters: number;
  locations: number;
  episodes: number;
  userSaved: number;
}

interface Character {
  id: number;
  name: string;
  image: string;
}

const Home = () => {
  const [stats, setStats] = useState<Stats>({ characters: 0, locations: 0, episodes: 0, userSaved: 0 });
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const [charRes, locRes, epiRes] = await Promise.all([
          apiExternal.get('/character'),
          apiExternal.get('/location'),
          apiExternal.get('/episode'),
        ]);

        let userSavedCount = 0;
        let lastFavorites: Character[] = [];

        if (token) {
          const localRes = await apiLocal.get('/characters', {
            headers: { Authorization: `Bearer ${token}` }
          });
          userSavedCount = localRes.data.length;
          // CORREÇÃO: Alterado de -4 para -3 para cumprir o requisito do desafio
          lastFavorites = localRes.data.slice(-3).reverse();
        }

        setStats({
          characters: charRes.data.info.count,
          locations: locRes.data.info.count,
          episodes: epiRes.data.info.count,
          userSaved: userSavedCount,
        });
        setFavorites(lastFavorites);
      } catch (error) {
        console.error("Dashboard sync failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="h-screen bg-[#0f1114] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-white font-black tracking-[0.5em] uppercase text-[10px]">Sincronizando Multiverso</p>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#0f1114] text-white overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <img
          src="/rick-and-morty-wallpaper.jpg"
          className="w-full h-full object-cover opacity-20 grayscale-[0.2]"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1114] via-transparent to-[#0f1114]" />
      </div>

      <div className="relative z-10">

        {/* HERO & STATS */}
        <section className="min-h-screen w-full flex flex-col justify-center px-6 md:px-20 pt-20">
          <div className="max-w-6xl w-full">
            <span className="text-orange-500 text-[10px] tracking-[0.6em] uppercase mb-6 block font-bold animate-pulse">
              System Active: C-137 Intelligence
            </span>

            <h1 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">
              INTEL <br /> <span className="opacity-30 italic">CENTER</span>
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 border-y border-white/10">
              <StatCard title="Personagens" value={stats.characters} />
              <StatCard title="Localizações" value={stats.locations} />
              <StatCard title="Episódios" value={stats.episodes} />
              <StatCard title="Meus Personagens" value={stats.userSaved} highlight />
            </div>

            <div className="mt-16">
              <Link to="/characters" className="group inline-flex items-center gap-4 border border-white/20 px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500">
                Iniciar Exploração
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="min-h-screen w-full flex flex-col justify-center px-6 md:px-20 py-32">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Favoritos</h2>
              <div className="h-1 w-24 bg-orange-500 mt-2" />
            </div>
            <Link to="/my-characters" className="text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">
              Minha Coleção Completa
            </Link>
          </div>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {favorites.map((char) => (
                <Link
                  to="/my-characters"
                  key={char.id}
                  className="group relative aspect-[3/4] bg-white/5 border border-white/10 rounded-sm overflow-hidden"
                >
                  <img
                    src={char.image}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 brightness-110"
                    alt={char.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-orange-500 text-[9px] font-bold uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">Target Verified</p>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">{char.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full h-96 border border-dashed border-white/10 flex flex-col items-center justify-center gap-6 bg-white/[0.02]">
              <p className="text-white/20 uppercase tracking-[0.4em] text-xs">Sem variantes sob custódia.</p>
              <Link to="/characters" className="text-orange-500 text-[10px] font-bold uppercase border-b border-orange-500/30 pb-1">Encontrar Alvos</Link>
            </div>
          )}
        </section>

        <footer className="py-20 px-6 md:px-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Innovitas C-137 System</span>
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-center md:text-right">Portal de Inteligência Interdimensional</span>
        </footer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, highlight }: { title: string, value: number, highlight?: boolean }) => (
  <div className={`p-8 md:p-12 flex flex-col items-start border-x border-white/5 transition-all duration-500 hover:bg-white/[0.03] group ${highlight ? 'bg-orange-500/[0.02]' : ''}`}>
    <p className={`text-[10px] uppercase tracking-[0.3em] mb-4 font-bold transition-colors ${highlight ? 'text-orange-500' : 'text-white/30 group-hover:text-white/60'}`}>
      {title}
    </p>
    <p className={`text-5xl md:text-7xl font-light tracking-tighter ${highlight ? 'text-orange-500' : 'text-white'}`}>
      {value}
    </p>
  </div>
);

export default Home;