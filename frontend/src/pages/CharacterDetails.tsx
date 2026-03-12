import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiExternal, apiLocal } from '../services/api';

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  episode: string[];
}

interface LocalCharacter {
  id: number;
  original_character_id: number;
  name: string;
  image: string;
}

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [char, setChar] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchChar = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await apiExternal.get(`/character/${id}`);
        setChar(response.data);

        if (token) {
          const localRes = await apiLocal.get('/characters', {
            headers: { Authorization: `Bearer ${token}` }
          });

          const alreadySaved = localRes.data.some((item: LocalCharacter) =>
            item.original_character_id === Number(id)
          );
          setIsSaved(alreadySaved);
        }
      } catch (error) {
        console.error("Erro ao acessar detalhes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChar();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Autenticação necessária. Por favor, faça login.");
      navigate('/login');
      return;
    }

    setIsSaving(true);
    try {
      await apiLocal.post('/characters', {
        original_character_id: char?.id,
        name: char?.name,
        species: char?.species,
        gender: char?.gender,
        status: char?.status,
        image: char?.image,
        origin: char?.origin.name || "Unknown",
        location: char?.location.name || "Unknown",
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsSaved(true);
      alert("Personagem salvo com sucesso!");
    } catch (error) {
      console.error("Falha ao salvar", error);
      alert("Erro ao salvar: Verifique a conexão com o banco de dados.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="h-screen bg-[#0f1114] flex items-center justify-center text-orange-500 uppercase tracking-widest text-[10px] animate-pulse">
      Sincronizando Dados...
    </div>
  );

  if (!char) return <div className="p-20 text-center text-white">Personagem não localizado.</div>;

  return (
    <div className="relative min-h-screen bg-[#0f1114] text-white pt-28 pb-20 px-6 md:px-20 overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 opacity-10 grayscale pointer-events-none">
        <img src="/rick-and-morty-wallpaper.jpg" className="w-full h-full object-cover" alt="" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-left">
        <button
          onClick={() => navigate(-1)}
          className="mb-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-orange-500 transition-colors flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> [ VOLTAR PARA A LISTA ]
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="relative group">
            <div className="absolute -inset-1 bg-orange-500/20 blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative border border-white/10 p-2 bg-black/40 backdrop-blur-sm overflow-hidden">
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-auto brightness-110 contrast-110 transition-all duration-700"
              />
              <div className="absolute top-0 left-0 w-full h-0.5 bg-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.8)] animate-[scan_3s_ease-in-out_infinite]" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <DataPoint label="ID DO REGISTRO" value={`#${char.id.toString().padStart(4, '0')}`} />
              <DataPoint
                label="ESTADO ATUAL"
                value={char.status === 'Alive' ? 'VIVO' : char.status === 'Dead' ? 'MORTO' : 'DESCONHECIDO'}
                highlight={char.status === 'Alive'}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-12">
            <div>
              <span className="text-orange-500 text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block underline underline-offset-8 text-left">
                Dossiê de Campo
              </span>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 text-left">
                {char.name}
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-8 border-l border-white/10 pl-8">
              <InfoRow label="Espécie" value={char.species} />
              <InfoRow label="Gênero" value={char.gender === 'Male' ? 'MASCULINO' : char.gender === 'Female' ? 'FEMININO' : 'OUTRO'} />
              <InfoRow label="Origem" value={char.origin.name} />
              <InfoRow label="Localização Atual" value={char.location.name} />
              <InfoRow label="Registros de Episódios" value={`${char.episode.length} Aparições`} />
            </div>

            <div className="pt-8 flex flex-col items-start gap-4">
              <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] text-left">
                {isSaved ? "Este personagem já consta em sua base de dados." : "Deseja salvar este registro em sua coleção?"}
              </p>

              <button
                onClick={handleSave}
                disabled={isSaved || isSaving}
                className={`px-10 py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-300 border
                  ${isSaved
                    ? 'border-green-500/50 text-green-500 cursor-not-allowed bg-green-500/5'
                    : 'border-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-600/20 active:scale-95'
                  } ${isSaving ? 'opacity-50 animate-pulse' : ''}`}
              >
                {isSaving ? "PROCESSANDO..." : isSaved ? "SALVO NO SISTEMA" : "SALVAR PERSONAGEM"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataPoint = ({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) => (
  <div className="border border-white/5 p-4 bg-white/5 text-left">
    <p className="text-[8px] text-white/40 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xl font-bold uppercase ${highlight ? 'text-green-400' : 'text-white'}`}>{value}</p>
  </div>
);

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="text-left">
    <p className="text-[10px] text-orange-500/60 uppercase tracking-[0.3em] font-bold mb-1">{label}</p>
    <p className="text-xl md:text-2xl font-light uppercase tracking-tight text-white/90 italic">{value}</p>
  </div>
);

export default CharacterDetails;