# Marvel Comics.

Compartilhe quadrinhos com os seus amigos.

## Descrição

Projeto criado utilizando:

- Next JS;
- Styled components;
- Google Typescript styleguide | Lint;
- MailTrap;
- Testes com Jest e Cypress;
- Deploy na Vercel;
- Docker.

## Instruções
Instruções de como executar o projeto:


Instale as dependências:
```bash
npm install
# ou
yarn
```

Antes de executar o projeto, crie na raiz dele um arquivo `.env.local` e adicione as seguintes variáveis de ambiente:

```
## Chaves da API da Marvel
NEXT_PUBLIC_API_PUBLIC_KEY=<sua chave pública>
NEXT_PUBLIC_API_SECRET_KEY=<sua chave privada>

## Configurações do serviço de e-mail
## Necessário ter conta to serviço MailTrap
NEXT_PUBLIC_MAIL_TRAP_USER=<seu usuário>
NEXT_PUBLIC_MAIL_TRAP_PASS=<sua senha>'
NEXT_PUBLIC_MAIL_TRAP_HOST='smtp.mailtrap.io'
NEXT_PUBLIC_MAIL_TRAP_PORT=2525

```

Para o envio de e-mail foi utilizado o serviço de testes [MailTrap](https://mailtrap.io/). Então para testar localmente será necessário criar uma conta nele e obter as credenciais necessárias para preencher o arquivo `.env.local`

---
Para executar o projeto em modo de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

O projeto será ficará disponível no endereço [http://localhost:3000](http://localhost:3000).

Para executar uma build de produção, utilize os seguintes comandos:

```bash
npm run build
# ou
yarn build
```

Para executar a versão buildada, utilize os comandos:

```bash
npm start
# ou
yarn start
```

## Testes

Para executar os testes unitários, utilize os seguintes comandos:

```bash
npm run test
# ou
yarn test
```

Para executar os testes E2E utilize os seguintes comandos:

```bash
npm run cypress:run
# ou
yarn cypress:run
```

## Docker

Para executar o projeto utilizando o Docker, execute o seguinte comando:

```bash
docker-compose up
```
