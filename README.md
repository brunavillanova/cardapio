Documentação do Projeto: Cardápio Interativo com Carrinho de Compras e Integração com WhatsApp
Índice

    Visão Geral do Projeto
    Tecnologias Utilizadas
    Estrutura do Projeto
    Funcionalidades Principais
    Guia de Instalação
    Guia de Uso
    Melhorias Futuras
    Autores

1. Visão Geral do Projeto

O "Cardápio Interativo" é uma aplicação web que permite aos usuários adicionar itens de um menu ao carrinho de compras e finalizar o pedido enviando uma mensagem de resumo para um número de WhatsApp. A aplicação é projetada para restaurantes que desejam oferecer um método rápido e conveniente para os clientes fazerem pedidos online.
Objetivo

Facilitar o processo de pedido para os clientes de um restaurante, permitindo que eles selecionem itens do menu, visualizem o total e finalizem o pedido diretamente via WhatsApp.
2. Tecnologias Utilizadas

    HTML/CSS/JavaScript: Estrutura e comportamento da aplicação.
    Toastify.js: Para exibir notificações de alerta na tela.
    Git/GitHub: Controle de versão e repositório do código.
    WhatsApp API: Para enviar o resumo do pedido via WhatsApp.

3. Estrutura do Projeto

plaintext

|-- index.html
|-- styles.css
|-- script.js
|-- README.md

Arquivos e Pastas

    index.html: Contém a estrutura do site, incluindo o menu e o modal do carrinho de compras.
    styles.css: Estilos personalizados para a interface do usuário.
    script.js: Lógica de adicionar itens ao carrinho, atualização do modal e integração com WhatsApp.
    README.md: Documentação básica do projeto.

4. Funcionalidades Principais
4.1. Adicionar Itens ao Carrinho

    Descrição: Os usuários podem adicionar itens ao carrinho clicando no botão "Adicionar ao Carrinho" ao lado de cada item do menu.
    Detalhes: A quantidade de itens aumenta se o mesmo item for adicionado mais de uma vez.

4.2. Remover Itens do Carrinho

    Descrição: Permite aos usuários remover itens do carrinho ou diminuir a quantidade.
    Detalhes: Quando a quantidade de um item chega a zero, ele é removido do carrinho.

4.3. Visualizar Carrinho

    Descrição: Os usuários podem visualizar todos os itens adicionados ao carrinho em um modal.
    Detalhes: O total do pedido é automaticamente atualizado conforme os itens são adicionados ou removidos.

4.4. Finalizar Pedido via WhatsApp

    Descrição: Após selecionar os itens, o usuário pode finalizar o pedido enviando os detalhes para o WhatsApp do restaurante.
    Detalhes: A mensagem inclui os itens, quantidade, preço e o endereço de entrega.

4.5. Verificar Disponibilidade do Restaurante

    Descrição: O sistema verifica se o restaurante está aberto com base no horário atual.
    Detalhes: Um alerta é exibido se o pedido for tentado fora do horário de funcionamento.

5. Guia de Instalação
5.1. Pré-requisitos

    Navegador web moderno (Google Chrome, Firefox, etc.).
    Conexão com a internet para acessar o WhatsApp Web.

5.2. Passos de Instalação

    Clone o repositório:

    bash

git clone https://github.com/brunavillanova/cardapio.git

Navegue até a pasta do projeto:

bash

    cd cardapio

    Abra o arquivo index.html em seu navegador.

6. Guia de Uso
6.1. Adicionando Itens ao Carrinho

    Navegue pelo menu e clique no botão "Adicionar ao Carrinho" ao lado de qualquer item.

6.2. Visualizando o Carrinho

    Clique no ícone do carrinho para abrir o modal e visualizar os itens adicionados.

6.3. Finalizando o Pedido

    Preencha o campo de endereço e clique em "Finalizar Pedido".
    Verifique o horário de funcionamento do restaurante antes de finalizar.
    Uma nova aba será aberta com o WhatsApp Web, onde você pode confirmar e enviar o pedido.

7. Melhorias Futuras

    Integração com métodos de pagamento: Permitir que os clientes paguem diretamente via plataforma.
    Sistema de Login: Adicionar funcionalidade de login para que os usuários possam salvar endereços e históricos de pedidos.
    Otimização Mobile: Melhorar a experiência do usuário em dispositivos móveis.

8. Autores

    Bruna Vilanova - Desenvolvedora do projeto.
