# buraco_php
Objetivo: Estudar CSS e JS em backend PHP
Meio: desenvolver um jogo de baralho clássico


#1) Início
    Desenvolver jogo humano vs computador

##1.1) Estrutura Básica

###1.1.1) Backend Inicial
    Index.php é responsável por criar um home-page simples
        chamando uma funçao do screen.php
        que retorna um html básico, com os links para arquivos CSS e JS.
    Index.php também declara os requires para os arquivos php adicionais.
    Será usado Bootstrap para um mínimo de layout
        (que não é o foco deste estudo).
    Será usado um banco de dados Mysql.
    Registro de usuário e login são necessários para identificar o jogador
        E para fazer uma gravação contínua dos dados dos jogos em andamento
        Porque um jogo completo demora algumas horas
        e pode ser interrompido por qualquer razão
            (em tempo de desenvolvimento, por bugs e ajustes)
        e é desejável que o jogador possa restartar
            ou retomar a partir de um determinado ponto

###1.2.1) Registro Simples de Usuário
    A página inicial solicita um login.
        Login Social OAuth2 com facebook, google e twitter
        serão implementados no futuro, porque não são o foco neste momento.
    Então por enquanto será desenvolvido um controle simples,
        no banco de dados Local.
    Este recurso é considerado bastante simples
        e não será detalhado aqui.

####1.2.1.1) Registro e Login desenvolvidos
    O suficiente para manter a lógica por enquanto
    Recursos de Logout, Editar Conta e Esqueci minha senha
        serão implementados no futuro.

####1.2.1.2) Depois do Login
    Um usuário logado tem seu dados salves em uma sessão.
    Depois do login, será exibida uma tela inicial
        que terá vários recursos no futuro
        por enquanto só a marcação de local com um texto
        como um ranking de jogado e a lista dos últimos jogos do usuário
    Os recursos iniciais e mais importantes agora são
        Iniciar um Novo Jogo
        Continuar um jogo suspenso (quando houver)

#2) Jogo 

##2.1) Design da Mesa

###2.1.1) Layout Básico de Tela
    Haverá 4 ou 6 jogadores, definidos ao iniciar um jogo novo,
    e o layout da tela e a lógica do jogo precisam se adaptar a essas 2 possibilidades.
    Cada jogo tem 2 times.
    Como é para apenas um humano, o time do usuário terá mais 1 ou 2 robôs
        E o próprio usuário sempre será o líder do seu time
    O time adversário terá 2 ou 3 robôs e 1 deles será o líder desse time.

    Cada jogador tem sua própria área da mesa
        , onde são exibidas suas cartas viradas para baixo.
    O líder humano está sempre com a área central inferior.
        As cartas do líder humano estão sempre viradas para cima, 
            para que ela possa analisar suas opções o tempo todo.
    O líder robô está sempre com a área central superior.
    Os demais ficam com as laterais.

    À frente de cada líder, fica a area para exibir os jogos baixados
        normalmente seriam colunas e haveria de 0 a 12,
        mas podem ter mais.
    Também é necessário reservar mais 2 áreas pequenas:
        - área para os dois "mortos"
        - área para as cartas disponíveis para comprar
                e para o lixo (descartes)

###2.1.2) Consequências
    Há um desafio claro nos primeiros rascunhos
        , quanto ao design responsivo.
    Supondo telas "paisagem" (largura maior que altura)
        como desktops e notebooks
        a exibição fica de um jeito
        e fica de outro em telas "retrato" (largura menor que altura)
        como em tablets e celulares

###2.1.3) Pausa para fazer testes
    a) rascunhar diagramas
        a.1) 4 jogadores, paisagem 1920x1080
        a.2) 4 jogadores, retrato 1020x180
        a.3) 6 jogadores, paisagem 1920,1080

    b) desenvolver rascunho layout html+css
        b.1) usando as tags do bootstrap e mais css adicional
        b.2) usando divs flexbox
        b.3) usando css grid
    c) conclusão: todos servem, mas css grid é um código mais claro


##2.2) Baralho e Rounds
    O jogo usa 4 baralhos completos, incluindo os 2 Coringões de cada baralho
    Então inicialmente há 4*54 = 216 cartas
    Um jogo é composto de rodadas seguidas
        , ao final de cada uma os pontos são somados e acumulados
        e o jogo completo acaba quando, ao terminar uma rodada
            um dos times tenha ultrapassado 10.000 pontos
    Os pontos pertencem ao time, não ao jogador individual.
    Cada carta possui um valor de face e um valor de pontos
    E cada "coluna" de jogo baixado tem um determinado valor
    Além disso há "eventos" que somam ou subtraem pontos
        no cálculo final da rodada

###2.2.1) Quando uma rodada é iniciada, as cartas ficam divididas em
    a) 11 para cada jogador (cartas "na mão")
    b) 2 grupos de 11 separados virados para baixo
            estes são os "mortos", 
            cada um será destinado ao primeiro jogador de cada time
            que ficar sem cartas
    c) restante é o "monte", de onde os jogadores poderão tirar 2 cartas na sua vez de jogar
    d) ao lado do "monte" é a área de descarte, ou "lixo"

##2.3) Rascunho de Objetos para Controle

Jogo tem
    2 Times, cada um tem
        2 Jogadores cada, que tem
            Ordem na Mesa
            Nomes
            Imagem de Avatar
            Área da Mesa
            Cartas na mão
        Status do Morto (jogador(nome ou ''), pegou, usou)
        Área da Mesa para os jogos baixados
        Jogos Baixados
            que são agrupamentos de cartas
            de mesmo valor de face (exceto 3)
            que podem ser misturadas com coringas (2) ou coringões
        Pontos Acumulados
        Pontos na Rodada Atual

    Rodadas Sequenciais, cada uma tem
        Número de Ordem da Rodada no Jogo
        Status (iniciando, em andamento, concluído)
        Jogador Inicial
            precisa guardar porque na proxima rodada será o próximo a iniciar
        Jogador Atual
        1 Baralho Completo que tem
            216 Cartas que tem
                Valor de face
                Naipe
                Valor de pontos
                    No caso dos Coringões,
                        Valor de face ='C'
                        naipe = ''
        2 Mortos que tem
            11 cartas cada
        1 Lixo
            conjunto de cartas descartadas

##2.4) divisão FrontEnd - Backend
    Javascript no frontend executa as chamadas
        e cuida do efeito de exibição de cartas
    Faz as chamadas para o backend
        para iniciar jogo
        e para iniciar rodada
    quando a vez de jogar é de um robô
        faz uma pausa de 1s entre cada chamada
    não armazena os valores de cartas
        que estão nas mãos dos robôs
        nem nos mortos, nem no monte
    Esse controle fica com o back-end
        que recebe as requisições, manipula os objetos
        e devolve um json para o front-end
        com os dados que deve ser feito
    No caso do jogador 1 (humano)
        javascript precisa saber a sequencia de cartas
        para fazer a exibição com as faces para cima

#3) Jogando - story board Inicial

##3.1) Usuário clica no botão "Novo Jogo"
    requisição para o servidor
        objeto jogo é iniciado
        salva no bd id do jogo e usuário
        objeto rodada 1 é iniciada
        embaralha 
        sorteia jogador inicial
        distribui cartas começando pelo jogador inicial
            1 para cada na ordem do sorteio,incluindo os mortos
        salva tudo na sessão
        salva o json dos objetos no banco de dados
        devolve para o front-end
    front-end
        desenha a mesa
        faz animação da distribuição inicial das cartas
        cartas do usuário ficam viradas para baixo
        solicita para o front-end a lista de cartas do usuário
        exibe as cartas do usuário
        a) se o jogador inicial é robô
            requisição da jogada para o servidor
                servidor calcula a jogada
                salva dados na sessão
                devolve json para o front-end executar a animação das cartas
        b) se o jogador inicial é o usuário
            aguarda clique nas cartas para comprar
            requisita para o servidor as cartas compradas
                (porque o frontend não sabe a sequência das cartas)
            executa a animação
            aguarda usuário clicar cartas para jogar 
                e clicar no botão Jogar
                verifica validade do jogo
                envia informação do jogo para o servidor
                    (não precisa aguardar resposta)
                executa animação
            aguarda usuário clicar carta para descarte
                envia informação do jogo para o servidor
                aguardar resposta com o próximo jogador
                executa animação
        c) Se o próximo jogador é robô
            volta para A
        d) Se o próximo jogador é o usuário
            volta para B
        e) continua até um jogador "bater 1a.vez"
            como as jogadas são enviadas para o servidor
            ele "sabe" se bateu direto ou não
            e já "entrega" o morto nos objetos em uso
            e sabe se é para continuar ou jogando ou passar para o próximo jogador
        f) continua até um jogador "bater 2a.vez"
            respeitando regra de 
                - precisa ter usado o morto
                - precisa ter ao menos 1 canastra limpa e 1 suja

    Lembrando que o front-end "sabe"
        - quais cartas estão na mão do usuário
        - regras para validar se a jogada atual do usuário
            pode ou não ser executada
    Front-end "não sabe"
        - sequência de cartas no monte e nos mortos
        - valores das cartas dos robôs
        - valores das cartas no lixo



        















