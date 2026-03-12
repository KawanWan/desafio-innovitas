import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiLocal } from '../services/api';

interface LocalCharacter {
  id: number;
  name: string;
  species: string;
  image: string;
  status: string;
  gender: string;
  origin: string;
  location: string;
  notes?: string;
}

const LocalCharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [char, setChar] = useState<LocalCharacter | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', status: '', notes: '' });

  useEffect(() => {
    const fetchLocalChar = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await apiLocal.get(`/characters/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChar(response.data);
        setFormData({
          name: response.data.name,
          status: response.data.status,
          notes: response.data.notes || ''
        });
      } catch {
        navigate('/my-characters');
      }
    };
    fetchLocalChar();
  }, [id, navigate]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await apiLocal.patch(`/characters/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChar(prev => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
      alert("Registro atualizado com sucesso!");
    } catch {
      alert("Erro ao atualizar registro local.");
    }
  };

  if (!char) return <div className="p-20 text-center">Carregando registro local...</div>;

  return (
    <div className="min-h-screen bg-[#0f1114] text-white pt-28 px-6 md:px-20">
      <div className="max-w-4xl mx-auto border border-white/10 bg-black/40 p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-12">
          <img src={char.image} alt={char.name} className="w-64 h-64 border-2 border-orange-500/50 object-cover" />

          <div className="flex-1 space-y-6 text-left">
            <span className="text-orange-500 text-[10px] tracking-widest uppercase font-bold">Registro de Custódia Local</span>

            {isEditing ? (
              <div className="space-y-4">
                <input
                  className="w-full bg-white/5 border border-white/20 p-2 text-2xl font-bold uppercase outline-none focus:border-orange-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <select
                  className="w-full bg-black border border-white/20 p-2 text-sm uppercase outline-none"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Alive">VIVO / ATIVO</option>
                  <option value="Dead">MORTO / INATIVO</option>
                  <option value="unknown">DESCONHECIDO</option>
                </select>
                <textarea
                  placeholder="Adicionar observações do dossiê..."
                  className="w-full bg-white/5 border border-white/20 p-2 h-32 text-sm outline-none focus:border-orange-500"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
                <div className="flex gap-4">
                  <button onClick={handleUpdate} className="bg-orange-500 px-6 py-2 text-[10px] font-bold uppercase hover:bg-orange-600 transition-all">Salvar Alterações</button>
                  <button onClick={() => setIsEditing(false)} className="border border-white/20 px-6 py-2 text-[10px] font-bold uppercase hover:bg-white/10 transition-all">Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-5xl font-black uppercase tracking-tighter">{char.name}</h1>
                <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-widest text-white/60">
                  <p>Espécie: <span className="text-white">{char.species}</span></p>
                  <p>Status: <span className={char.status === 'Alive' ? 'text-green-400' : 'text-red-400'}>{char.status}</span></p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-[10px] text-orange-500 font-bold mb-2 uppercase">Notas de Campo:</p>
                  <p className="text-sm italic text-white/40">{char.notes || "Nenhuma observação registrada para este alvo."}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-8 border border-orange-500/50 text-orange-500 px-8 py-3 text-[10px] font-bold uppercase hover:bg-orange-500 hover:text-white transition-all"
                >
                  Editar Registro (CRUD: Update)
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalCharacterDetails;