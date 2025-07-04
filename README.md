# Sentinel 1.0 – Sistema de Gestão Escolar

Este é um sistema completo de gestão escolar, desenvolvido com **Java Spring Boot** no backend e **Angular** no frontend.

---

## 📁 Estrutura do Projeto

```
sentinel1.0/
├── backend/     → Projeto Java Spring Boot (API REST)
├── frontend/    → Projeto Angular (Interface Web)
```

---

## 🚀 Como executar o projeto

### ▶️ Backend (Spring Boot)

Pré-requisitos:

- Java 21
- Maven

> **Nota:** O Maven precisa acessar a internet para baixar dependências em um primeiro build.
> Caso não haja conexão, utilize um espelho local do repositório ou um cache
> pré-carregado. Em ambientes de CI, considere disponibilizar um repositório
> Maven local para permitir builds offline.
> Avalie também empacotar um cache do repositório Maven ou configurar o CI para fornecer essas dependências sem acesso à internet.

Para executar:

```bash
cd backend
./mvnw spring-boot:run
```

ou, se estiver no Windows:

```bash
cd backend
mvn spring-boot:run
```

---

### 🌐 Frontend (Angular)

Pré-requisitos:

- Node.js (recomendado: 18+)
- Angular CLI

Para instalar as dependências e executar:

```bash
cd frontend
npm install
npm start
```

A aplicação estará disponível em:

```
http://localhost:4200
```

---

## 💻 Tecnologias utilizadas

- Java 21
- Spring Boot 3
- Maven
- MySQL
- Angular 19
- TypeScript
- ag-grid
- mdbMaterial

---

## 🛠️ Autor

Desenvolvido por [Diego Tiburcio](https://github.com/DiegoLuizst)

---
