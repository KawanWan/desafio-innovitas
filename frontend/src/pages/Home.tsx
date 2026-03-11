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
  const [stats, setStats] = useState<Stats | null>(null);
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
          lastFavorites = localRes.data.slice(-3).reverse();
        }

        setStats({
          characters: charRes.data.info.count,
          locations: locRes.data.info.count,
          episodes: epiRes.data.info.count,
          userSaved: userSavedCount,
        });
        setFavorites(lastFavorites);
      } catch {
        console.error("Erro ao carregar dados do dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-6 text-center">Carregando dashboard...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Personagens (API)" value={stats?.characters} color="bg-blue-500" />
        <StatCard title="Total Localizações" value={stats?.locations} color="bg-green-500" />
        <StatCard title="Total Episódios" value={stats?.episodes} color="bg-purple-500" />
        <StatCard title="Meus Personagens" value={stats?.userSaved} color="bg-orange-500" />
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Meus Favoritos (Últimos 3)</h2>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favorites.map(char => (
              <div key={char.id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
                <img src={char.image} alt={char.name} className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold">{char.name}</h3>
                  <Link to="/my-characters" className="text-blue-500 text-sm hover:underline">Ver na minha lista</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Você ainda não salvou personagens.</p>
        )}
      </section>
    </div>
  );
};

const StatCard = ({ title, value, color }: { title: string, value?: number, color: string }) => (
  <div className={`${color} text-white p-6 rounded-lg shadow-lg`}>
    <p className="text-sm uppercase font-semibold opacity-80">{title}</p>
    <p className="text-4xl font-bold mt-2">{value ?? 0}</p>
  </div>
);

export default Home;