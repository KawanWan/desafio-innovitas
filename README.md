# Desafio Técnico - Rick and Morty Dashboard (Innovitas)

Esta é uma aplicação Full Stack desenvolvida para o processo seletivo da Innovitas. O projeto consiste em um dashboard que consome a API oficial do Rick and Morty, permitindo que usuários autenticados salvem e gerenciem seus personagens favoritos em um banco de dados local.

## Tecnologias Utilizadas

### Frontend
- **React + Vite + TypeScript**: Para uma interface performática e tipada.
- **Tailwind CSS**: Estilização moderna e responsiva.
- **React Router Dom**: Gerenciamento de rotas SPA.
- **Axios**: Consumo de APIs externas e locais.

### Backend
- **NestJS + TypeScript**: Estrutura modular e robusta para o servidor.
- **TypeORM + SQLite**: Persistência de dados local de fácil portabilidade.
- **JWT (JSON Web Token)**: Autenticação segura para rotas protegidas.
- **Bcrypt**: Criptografia de senhas dos usuários.

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM ou Yarn

### 1. Configurar o Backend
```powershell
cd backend
npm install
# O banco SQLite será criado automaticamente na raiz do backend
npm run start:dev
O servidor backend estará rodando em http://localhost:3000.

### 2. Configurar o Frontend
Em um novo terminal:

PowerShell
cd frontend
npm install
npm run dev
A aplicação estará disponível em http://localhost:5173.

📌 Funcionalidades Implementadas
[x] Home: Dashboard com estatísticas da API e favoritos do usuário.

[x] Personagens: Listagem completa com paginação e filtro por nome.

[x] Detalhes: Exibição detalhada com lógica de salvamento e edição.

[x] Autenticação: Sistema de Login e Cadastro com proteção de rotas.

[x] Meus Personagens: Gerenciamento (CRUD) de personagens salvos no banco local.

👤 Autor
Kawan Wan - Desenvolvedor Full Stack.