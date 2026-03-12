🛸 C-137 Intelligence System | Rick and Morty CRUD
Este projeto é uma aplicação de inteligência interdimensional que permite explorar personagens do multiverso de Rick and Morty e gerenciar uma base de dados local de custódia. Desenvolvido como parte do desafio técnico para a Innovitas.

🚀 Funcionalidades Principais
Dashboard Cinematográfico: Estatísticas em tempo real da API externa e da base de dados local.

Scanner de Variantes: Listagem de personagens com paginação e busca por nome.

Dossiê de Campo: Visualização detalhada de dados da API externa.

Unidade de Custódia (CRUD Completo):

Create: Salva personagens na base local.

Read: Lista coleções personalizadas do usuário logado.

Update: Permite editar informações (Nome, Status, Notas de Campo) dos registros locais.

Delete: Remove registros da base de dados local.

Autenticação JWT: Sistema de Login e Registro com proteção de rotas no Frontend e Backend.

Design HUD Futurista: Interface inspirada em interfaces de naves espaciais (Heads-Up Display) com Glassmorphism.

🛠️ Tecnologias Utilizadas
Frontend
React + TypeScript (Vite)

Tailwind CSS (Estilização)

React Router Dom (Navegação)

Axios (Integração com APIs)

Lucide React (Iconografia)

Backend
NestJS (Framework Node.js)

TypeORM (Persistência de dados)

SQLite (Banco de dados local)

Passport + JWT (Segurança)

📦 Como Rodar o Projeto
1. Clonar o Repositório
Bash
git clone https://github.com/seu-usuario/desafio-innovitas.git
cd desafio-innovitas
2. Configurar o Backend
Bash
cd backend
npm install
npm run start:dev
O servidor iniciará em http://localhost:3000

3. Configurar o Frontend
Bash
cd ../frontend
npm install
npm run dev
Acesse o link gerado pelo Vite (geralmente http://localhost:5173)

🛡️ Decisões de Arquitetura
Separação de Contextos: Dados da API pública de Rick and Morty são tratados como consulta (read-only), enquanto os dados locais permitem o ciclo completo de edição (CRUD).

Clean Code & ESLint: O projeto segue regras rígidas de linting para garantir um código limpo e livre de variáveis não utilizadas ou erros de tipagem.

Experiência do Usuário (UX): Uso de estados de carregamento (Skeleton/Pulse), transições suaves e feedback imediato em ações de salvamento e exclusão.

Desenvolvido por Kawan - 2026.