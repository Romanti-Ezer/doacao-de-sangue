<div align="center">
	<h1 style="border:none">MyBlood</h1><br/>
	<img width="150" height="139" src="https://raw.githubusercontent.com/Romanti-Ezer/doacao-de-sangue/master/src/assets/imgs/logo.png">
</div>

## Introdução 

MyBlood é um aplicativo híbrido voltado para a sociedade, com o principal objetivo de aumentar o número de doadores de sangue no Brazil, possibilitando a publicação e busca de campanhas de doações de sangue por qualquer pessoa, entre outras funcionalidades, como tirar dúvidas sobre a doação de sangue e possibilitar um controle de doações.

Em nosso projeto utilizamos as seguintes tecnologias e serviços:

* Ionic 3
* Firebase 
* Dialogflow
* Maps JavaScript API
* Geocoding API

## Instalação
1. [Clone o projeto do Github](https://github.com/Romanti-Ezer/doacao-de-sangue);
2. Entre na pasta do projeto `cd doacao-de-sangue` e execute `npm install` no terminal para instalar as dependências;
3. Após a finalização coloque o`config.ts` mais atualizado no `src\app`;
4. Crie um arquivo vazio chamado `index.js.map` dentro do `node_modules/api-ai-javascript` para corrigir um bug da dependência;
5. Execute `ionic serve --lab` para buildar o aplicativo e abrir no navegador.