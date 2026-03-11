import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Adicionado o Link
import { apiExternal } from '../services/api';

interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
  status: string;
}

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await apiExternal.get(`/character?page=${page}`);
        setCharacters(response.data.results);
      } catch {
        console.error("Error fetching characters");
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [page]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Personagens</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map((char) => (
              <div key={char.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img src={char.image} alt={char.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="font-bold text-xl">{char.name}</h2>
                  <p className="text-gray-600">{char.species} - {char.status}</p>

                  <Link
                    to={`/characters/${char.id}`}
                    className="mt-4 block text-center w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="self-center font-bold">Página {page}</span>
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Characters;