import { useEffect, useState } from 'react';
import { apiLocal } from '../services/api';

interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
  status: string;
}

const MyCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedCharacters = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await apiLocal.get('/characters', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCharacters(response.data);
      } catch {
        console.error('Erro ao buscar personagens locais');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedCharacters();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      await apiLocal.delete(`/characters/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCharacters(characters.filter((char) => char.id !== id));
      alert('Personagem removido!');
    } catch {
      alert('Erro ao remover personagem.');
    }
  };

  if (loading) return <p className="p-6">Carregando seus personagens...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Meus Personagens Salvos</h1>
      {characters.length === 0 ? (
        <p>Você ainda não salvou nenhum personagem.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <div key={char.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={char.image} alt={char.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="font-bold text-xl">{char.name}</h2>
                <p className="text-gray-600">{char.species} - {char.status}</p>
                <button
                  onClick={() => handleDelete(char.id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCharacters;