# Awesome Works
## Controle de Equipamentos (Desafio Técnico)
Projeto criado para resolver o cenário do desafio técnico. Este projeto consiste em uma API RESTful para controle e rastreamento de equipamentos de TI. O objetivo principal é oferecer uma solução backend capaz de gerenciar de forma centralizada os ativos tecnológicos da organização, permitindo o cadastro, controle, rastreamento e associação dos dispositivos (como notebooks, desktops e celulares) aos colaboradores e departamentos.

## 1 — Visão geral

API RESTful (NestJS + TypeScript + Prisma + PostgreSQL) para controlar modelos de equipamentos e itens (dispositivos físicos). Permite:

* Cadastrar/editar/excluir modelos de equipamentos (ex.: Notebook, Desktop);
* Cadastrar/editar/excluir itens com número de série e IMEI;
* Registrar vínculo do item a um colaborador (employee) e ao departamento;
* Controlar status do item: `AVAILABLE`, `IN_USE`, `MAINTENANCE`, `DISCARDED`;
* Histórico mínimo de timestamps (created_at, updated_at, deleted_at);
* Documentação via Swagger e coleção Postman

## 2 — Tecnologias usadas

* Node.js + TypeScript
* NestJS
* Prisma ORM (PostgreSQL)
* class-validator / class-transformer (validações DTOs)
* Swagger (documentação)

## 3 — Modelagem do banco de dados
<img width="796" height="842" alt="Awesome Works" src="https://github.com/user-attachments/assets/cc0f8669-198d-4d35-b024-4fea6165575d" />

## 4 — Entidades e regras de negócio

* **equipaments_models**: modelos de equipamentos (nome único + prefixo) — ex.: `NB`, `DK`.
* **equipaments_items**: cada dispositivo físico contém `serial_number`, `imei`, referência ao modelo e (opcional) ao `employee` responsável. Status controlado por enum (`AVAILABLE`, `IN_USE`, `MAINTENANCE`, `DISCARDED`).
* **departments**: setores da empresa.
* **employees**: colaboradores, com `department_id`.
* Regras importantes:
  * Um `equipament_item` deve pertencer a um `equipament_model` existente.
  * `employee_id` pode ser `null` (item sem responsável).
  * `equipaments_models.name` é único (evita duplicação de modelos).
  * Deleção lógica com compo `active`
  
## 6 — Instalação e execução local

Pré-requisitos:

* Node.js (>= 18)
* PostgreSQL rodando localmente (ou container)
* `DATABASE_URL` configurada em `.env` (ex.: `postgresql://user:pass@localhost:5432/dbname?schema=public`)

Passos (exemplo com npm):

```bash
# clonar
git clone git@github.com:Axiotes/api-awesome-works.git
cd api-awesome-works

# instalar dependências
npm install

# configurar .env
# DATABASE_URL="postgresql://postgres:password@localhost:5432/awesome_works_db"

# gerar cliente Prisma
npx prisma generate

# rodar migrations (ver seção 7 para instruções de seed)
npx prisma migrate dev --name init

# rodar em desenvolvimento
npm run start:dev

# Rota base: http://localhost:3000/api/v1
# Swagger: http://localhost:3000/api/docs
```

## 7 — Documentação & Coleção de Requisições
* Swagger disponível em `/api/docs` (ex.: `http://localhost:3000/api/docs`)
* Coleção do Postman

## 8 — Melhorias futuras
* Registrar histórico de movimentações (quem pegou/entregou o equipamento e quando)
* Endpoint para anexar histórico de reparos/manutenção
* Implementar testes unitários em caso de sucesso e falha

## Autor
- Arthur Axiotes de Souza
