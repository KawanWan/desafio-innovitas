import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiExternal, apiLocal } from '../services/api';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiExternal.get(`/character/${id}`)
      .then(res => setCharacter(res.data))
      .catch(() => console.error("Erro ao buscar detalhes"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisa estar logado para salvar um personagem!');
      navigate('/login');
      return;
    }

    try {
      await apiLocal.post('/characters', {
        original_character_id: character?.id,
        name: character?.name,
        species: character?.species,
        gender: character?.gender,
        status: character?.status,
        image: character?.image,
        origin: character?.origin.name,
        location: character?.location.name,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Personagem salvo com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert('Sessão inválida ou erro interno. Por favor, faça login novamente.');
      navigate('/login');
    }
  };

  if (loading) return <p className="p-6">Carregando detalhes...</p>;
  if (!character) return <p className="p-6">Personagem não encontrado.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <img src={character.image} alt={character.name} className="w-full h-80 object-cover" />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Espécie:</strong> {character.species}</p>
          <p><strong>Gênero:</strong> {character.gender}</p>
          <p><strong>Origem:</strong> {character.origin.name}</p>
        </div>
        <button
          onClick={handleSave}
          className="mt-8 w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
        >
          Salvar no Banco Local
        </button>
      </div>
    </div>
  );
};

export default CharacterDetails;