# Back-end Boiler-plate

Repositório com o template para criação de projetos com foco no domínio da aplicação, utilizando [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) que visa separar as regras de negócio dos recursos que são consumidos pela aplicação, como Banco de Dados e serviços externos. Com isso, ao utilizar esse template, o back-end desenvolvido
poderá ser guiado por usuários, programas, testes automatizados...podendo ter sua testabilidade realizada de forma isolada dos recursos.

### SOLID Principles

O template contém alguns dos principios do [SOLID]((http://principles-wiki.net/collections:robert_c._martin_s_principle_collection)) para entregar um design capaz de tolerar mudanças ao longo do tempo, são eles:

* Single Responsibility: separação das "coisas" que mudam por motivos diferentes.
* Liskov Substitution: as interfaces definidas quando são implementadas nunca é violado o contrato estabelecido.
* Dependency Inversion: tem como base desacoplar dependências. Logo, módulos de alto nível (regras de negócios) não devem depender baixo nível (banco de dados, filas...).

### Design Patterns

Alguns [Design Patterns](https://refactoring.guru/design-patterns) foram adicionados natualmente ao template, como:

* Singleton: realiza a criação de apenas uma instância por classe.
* Dependency Injection: a forma de criar e gerenciar dependências para uma classe é injetada por mecanismo externo.

Este template está configurado para projetos que visam construir um back-end com Application Program Interface (API), o Runtime NodeJS, o framework minimalista [Express](https://expressjs.com/) e o Object Relational Mapping (ORM) [Prisma](https://www.prisma.io/). Além disso, o template está configurado com as seguintes tecnologias:

* Desenvolvimento de testes com o framework [Vitest](https://vitest.dev/);
* Autenticação utilizando [JWT](https://jwt.io/)
* Validação de campos com [Zod](https://zod.dev/);
* Internacionalização com [i18n](https://www.npmjs.com/package/i18n);
* Logger com [Winston](https://github.com/winstonjs/winston) e [Morgan](https://github.com/expressjs/morgan);
* Documentação da API com [Swagger Autogen](https://swagger-autogen.github.io/docs/);

## Requisitos (Ambiente Local)

[NodeJS](https://nodejs.org/en/download/package-manager)

PS: O Banco de Dados pode ser [PostgreSQL](https://www.postgresql.org/download/), [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)...

## Configurações

Antes de iniciar o back-end, é preciso criar um Banco de Dados e a posteriori realizar o seu gerenciamento. Para isso, pode ser utilizada a ferramenta [DBeaver](https://dbeaver.io/).
Para rodar a API em modo desenvolvimento, é necessário configurar as variáveis de ambiente (ver .env.example para saber quais estão disponíveis) em um arquivo .env na raiz do projeto.

## Instruções

Para instalar as dependências da aplicação, execute o comando:
```
npm i
```
Para criar as tabelas no BD, execute o comando de migration:

```
npx prisma migrate dev
```

Em seguida, é preciso popular as seeds com o comando:

```
npx prisma db seed
```

O back-end pode ser iniciado com o comando:

```
npm run dev:server
```

Em seguida, ao acessar a URL http://localhost:3333/api-docs no navegador, é renderizada a documentação da API.

### Testes

Para rodar os testes, executar:

```
npm run test
```

### Commits
Esse repositório está configurado com [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Para que isso seja garantido, é utilizado o [husky](https://github.com/typicode/husky) e [commitlint](https://github.com/conventional-changelog/commitlint) para validar o formato das mensagens de commit. Sendo assim, para realização de commits, executar:

```
git add .
```

```
npm run commit
```
Em seguinda pode ser dado o push ao executar o comando:

```
git push origin main
```

### Sugestões

Sugestão para fluxo de desenvolvimento utilzando este template:

1. Construção dos testes unitários com Test-Driven Developer (TDD)
2. Criação de Entities
3. Definição da Interface
4. Implementação do Repositório In-Memory
5. Desenvolvimento do Service
6. Construção do Controller
7. Definição da Rota
8. Implementação de testes de integração com TDD
9. Criação do Schema de Dados com o prisma
10. Construção do Repositório de dados para o PostgreSQL ou MongoDB
11. Registro do Repositório na pasta de container em shared
12. Adição de validações na Rota com o Zod
13. Tradução das mensagens de erro no arquivo de locales
