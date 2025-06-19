# Agents.md – Guia Técnico para Codex e Desenvolvedores

## 🏫 Sobre o Projeto

Este projeto consiste em um **Sistema de Gestão Escolar Integrado**, voltado para instituições de ensino fundamental e básico, com o objetivo de centralizar e automatizar todas as áreas críticas da gestão escolar, incluindo:

- Gestão Acadêmica
- Gestão de Alunos e Professores
- Secretaria Escolar
- Financeiro
- Administração Geral
- Biblioteca
- Comunicação Escolar
- Relatórios e Indicadores

O sistema é desenvolvido com uma **arquitetura moderna, modular e baseada em APIs RESTful**, utilizando autenticação segura via **JWT (JSON Web Token)**.

---

## 🧱 Tecnologias Utilizadas

### 📦 Backend

- **Linguagem:** Java 21
- **Framework:** Spring Boot 3.x
- **Banco de Dados:** MySQL
- **ORM:** JPA / Hibernate
- **Autenticação:** JWT + Spring Security
- **API:** RESTful com tratamento de erros global

### 💻 Frontend

- **Framework:** Angular 19
- **Component Library:** [MDB Angular (Material Design for Bootstrap)](https://mdbootstrap.com/docs/angular/)
- **Tabelas e Grids:** [AG Grid Community](https://www.ag-grid.com/angular-data-grid/)
- **Autenticação:** Armazenamento do token JWT em localStorage
- **Estilo e Layout:** CSS

---

## 🧩 Estrutura de Pastas

```
sentinel1.0/
├── backend/           → Projeto Java Spring Boot
│   ├── src/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   └── entity/
├── frontend/          → Projeto Angular
│   ├── src/app/
│   │   ├── components/
│   │   ├── models/
│   │   ├── services/
│   │
```

---

## 🔐 Perfis de Usuário e Permissões

O sistema conta com diferentes **níveis de acesso**, determinados por perfis de usuário:

Permissões são gerenciadas por **grupos**, com base em rotas e ações permitidas (ex: GET, POST, DELETE).

---

## 📊 Componentes principais

### AG Grid

- Utilizado para exibir **tabelas dinâmicas** com suporte a:
  - Filtros por coluna
  - Paginação
  - Ordenação
- Integrado a dados vindos da API Spring Boot.

Exemplo:

```html
<ag-grid-angular
  [rowData]="dados"
  [columnDefs]="colunas"
  [pagination]="true"
  class="ag-theme-alpine"
>
</ag-grid-angular>
```

### MDB Angular (Material Bootstrap)

- Utilizado para **formulários, inputs, modais, botões, validações e ícones**
- Interface moderna, responsiva e acessível
- Componentes com `mdbRipple`, `mdbBtn`, `mdbInput`, `mdbModal`

---

## 📈 Relatórios e Indicadores

Os módulos de relatório geram dashboards e exportações com base em:

- Desempenho por aluno/série
- Evasão, inadimplência, frequência
- Controle financeiro (fluxo de caixa, boletos)
- Exportação em **PDF**, **Excel** e visualização com **gráficos** interativos

biblioteca para charts ainda nao definida

---

## 🔄 Integrações Finais

- Integração futura com serviço de **envio de email**
- Integração futura com **API do WhatsApp** para envio de notificações
- Possível conexão com **google agenda api** para gestão de agenda escolar

---

## 🧠 Considerações para o Codex

- O frontend está localizado na pasta `/frontend`
- O backend está em `/backend`
- O `package.json` está dentro de `/frontend`, e o Codex deve apontar o diretório de trabalho para lá
- O projeto pode ser dividido por módulos (acadêmico, financeiro, etc.)

- APIs Spring Boot utilizam `@RestController`

---

## 📄 Documentação Complementar

- [README.md](./README.md) – Guia de instalação e execução
