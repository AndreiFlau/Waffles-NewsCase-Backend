# Back-end do Case Desenvolvimento - Gamificação em the news

Frontend pode ser visto [aqui](https://github.com/AndreiFlau/Waffles-NewsCase-Frontend)
Email de admin para teste: admin@thenews.digital
Email de usuário comum para teste: user6@example.com

## Instalação

Clone esse repositório e execute:

```bash
npm install
```

Crie um arquivo .env com esses segredos:

- DATABASE_URL =
- PORT =
- SECRETPASS =
- SECRETJWTPASS =
- TESTEMAIL =

Com .env configurado, popule a sua base de dados com:

```bash
npm run populatedb
```

Agora rode:

```bash
npm run dev
```

## Stacks

**Tecnologias usadas:**

**Frontend**

- React com React Router
- Typescript
- CSS/Tailwind
- HTML

**Backend**

- Typescript
- Express.js
- PostgreSQL

**Quais problemas você enfrentou ao desenvolver?**

Enfrentei alguns problemas, principalmente no frontend, um desses problemas foi na hora de fazer a requsição de dados para armazená-los no contexto do usuário. Outro problema interessante foi um problema na hora de logar, onde eu não estava retornando nulo quando um erro acontecia.

**Qual a organização que escolheu e por quê?**

Eu escolhi a organização MVC para o backend e a um modelo similar ao "Atomic Design" para o frontend. Elas foram escolhidas não só pela familiaridade, mas também por serem bem estruturadas.

## Dados

**Qual a estrutura do seu SQL?**

O meu banco de dados foi feito com PostgreSQL (Modelo relacional) e consultas de SQL puras. Ele possue as tabelas em users, streaks, users_badges, badges e email_stats.

**Como você lida com as inserções e consultas dos leitores?**

As inserções são feitas pela rota do webhook, onde ela cadastra um usuário pelo seu email e cria os dados relacionados a ele (Como a sua streak, badge e estátistica).

Já as consultas são feitas pelas suas respectivas rotas, controladores e queries.

**Ele é escalável? Explique.**

Ele é escalável, mas com algumas áreas para melhora. O backend é modularizado de forma com que cada rota, controlador e query tenha apenas um papel, o stack node + express é um bom stack para escalabilidade, os endpoints são bem estruturados e as consultas são otimizadas.

Com pesquisas sobre escalabilidade, eu entendo que ele poderia ser melhor, como na área de cache com Redis e também na limitação de requisições para o servidor.

## Testes

**Quais testes você realizou?**

A maioria dos testes realizados foram testes manuais após implementações de componentes. Exemplos desses testes seria usar Postman para testar apis, checar "rede" no dev tools e navegar pelo website como um usuário navegaria.

A outro parte dos testes foram testes unitários que checam se determinada função ou rota retorna os dados desejados.

**Quanto tempo levou o desenvolvimento e testes?**

Os testes unitários demoraram algumas horas para serem feitos e foram feitos após o desenvolvimento da aplicação.

## Sugestões de melhorias

Seria interessante adicionar um sistema de níveis, onde o usuário ganharia experiência toda vez que ele acessar uma newsletter.

Talvez também um sistema de recomendação, onde os usuários podem ganhar recompensas ao convidar amigos para se cadastrarem na newsletter.

Uma ideia mais difícil de ser implementada, mas que deixaria os usuários ainda mais engajados seria um sistema de comunidade onde os usuários poderiam compartilhar feedback, dicas e conversar sobre a waffle ou tópicos similares.

OBS: Infelizmente não consegui implementar o webhook de vocês. Eu tentei diferentes urls, mas não obtive nenhuma resposta do endpoint.
