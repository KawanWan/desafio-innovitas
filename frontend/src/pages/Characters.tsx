import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [search, setSearch] = useState(''); // Estado para o filtro de nome

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        // A API oficial aceita o parâmetro &name= para busca
        const response = await apiExternal.get(`/character?page=${page}&name=${search}`);
        setCharacters(response.data.results);
      } catch {
        setCharacters([]); // Limpa a lista caso não encontre nada na busca
        console.error("Erro ao buscar personagens ou nenhum resultado encontrado");
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [page, search]); // Recarrega quando a página ou a busca mudar

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Personagens</h1>

        {/* Campo de Filtro */}
        <input
          type="text"
          placeholder="Filtrar por nome..."
          className="p-2 border border-gray-300 rounded-md w-full md:w-64 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reseta para a primeira página ao buscar
          }}
        />
      </div>

      {loading ? (
        <p className="text-center py-10">Carregando...</p>
      ) : (
        <>
          {characters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map((char) => (
                <div key={char.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                  <img src={char.image} alt={char.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="font-bold text-xl truncate">{char.name}</h2>
                    <p className="text-gray-600">{char.species} - {char.status}</p>
                    <Link
                      to={`/characters/${char.id}`}
                      className="mt-4 block text-center w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors font-medium"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 italic">
              Nenhum personagem encontrado com o nome "{search}".
            </div>
          )}

          {/* Paginação */}
          {characters.length > 0 && (
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
              >
                Anterior
              </button>
              <span className="self-center font-bold text-gray-700">Página {page}</span>
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Characters;