# buraco_php
Objetivo: Estudar CSS e JS em backend PHP
Meio: desenvolver um jogo de baralho clássico


# 1) Início
    Desenvolver jogo humano vs computador

## 1.1) Estrutura Básica

### 1.1.1) Backend Inicial
    Index.php é responsável por criar um home-page simples
        chamando uma funçao do home.php
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

### 1.2.1) Registro Simples de Usuário
    A página inicial solicita um login.
        Login Social OAuth2 com facebook, google e twitter
        serão implementados no futuro, porque não são o foco neste momento.
    Então por enquanto será desenvolvido um controle simples,
        no banco de dados Local.
    Este recurso é considerado bastante simples
        e não será detalhado aqui.

#### 1.2.1.1) Registro e Login desenvolvidos
    O suficiente para manter a lógica por enquanto
    Recursos de Logout, Editar Conta e Esqueci minha senha
        serão implementados no futuro.

#### 1.2.1.2) Depois do Login
    Um usuário logado tem seu dados salvos em uma sessão.
    Depois do login, será exibida uma tela inicial
        que terá vários recursos no futuro
        por enquanto só a marcação de local com um texto
        como um ranking de jogadores e a lista dos últimos jogos do usuário
    Os recursos iniciais e mais importantes agora são
        Iniciar um Novo Jogo
        Continuar um jogo suspenso (quando houver)

# 2) Jogo 

## 2.1) Design da Mesa

### 2.1.1) Layout Básico de Tela
    Cada jogo tem 4 jogadores divididos em 2 times
        - time Humano: usuário logado + robô
        - time Robô: 2 robôs.
    *futuro* implementar para 6 jogadores ?

    Os jogadores de cada time ficam frente a frente na mesa.
    Cada jogador tem sua própria área da mesa
        , onde são exibidas suas cartas viradas para baixo.
    O jogador humano está sempre com a área central inferior.
        e suas cartas estão sempre viradas para cima, 
            para que ela possa analisar suas opções o tempo todo.

    No centro da mesa, ficam as 2 áreas para cada time
        baixar suas colunas de jogos.
    Também é necessário reservar mais 2 áreas pequenas:
        - área para os dois "mortos"
        - área para as cartas disponíveis para comprar
                e para o lixo (descartes)

### 2.1.2) Consequências
    Há um desafio claro nos primeiros rascunhos
        , quanto ao design responsivo.
    Supondo telas "paisagem" (largura maior que altura)
        como desktops e notebooks
        a exibição fica de um jeito
        e fica de outro em telas "retrato" (largura menor que altura)
        como em tablets e celulares

### 2.1.3) Pausa para fazer testes
    a) rascunhar diagramas
        a.1) 4 jogadores, paisagem 1920x1080
        a.2) 4 jogadores, retrato 1080x1920

    b) desenvolver rascunho layout html+css
        b.1) usando as tags do bootstrap e mais css adicional
        b.2) usando divs flexbox
        b.3) usando *css grid*
    c) conclusão: todos servem, mas css grid é um código mais claro


## 2.2) Baralho e Rounds
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

### 2.2.1) Cartas iniciais
    Quando uma rodada é iniciada, as cartas ficam divididas em
    a) 11 para cada jogador (cartas "na mão")
    b) 2 grupos de 11 separados virados para baixo
            estes são os "mortos", 
            cada um será destinado ao primeiro jogador de cada time
            que ficar sem cartas
    c) restante é o "monte", de onde os jogadores poderão tirar 2 cartas na sua vez de jogar
    d) ao lado do "monte" é a área de descarte, ou "lixo"

## 2.3) Rascunho de Objetos para Controle
```
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
```

## 2.4) divisão FrontEnd - Backend
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
        com os dados do que deve ser feito
    No caso do jogador 1 (humano)
        javascript precisa saber a sequencia de cartas
        para fazer a exibição com as faces para cima

# 3) Jogando - story board Inicial

## 3.1) Usuário clica no botão "Novo Jogo"
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


# 4) Desenvolvimento        

## 4.1) Divagações
    O controle do jogo pode ser feito em um conjunto à parte
        de arquivos php no servidor ?
    Isso porque qualquer arquivo no servidor tem acesso à sessão
        não precisa chamar sempre o index.php ?
    Poderia facilitar o retorno com json's simples
        quanto não for necessário devolver conteúdo html
    Tentar fazer dessa forma nas próximas requisições após devolver o html da área de jogo

## 4.2) Questão das imagens
    Tem que escolher imagens free para as cartas
        - precisa de uma imagem para cada naipe/valor de face
        - e uma imagem para coringa
        - e uma imagem para carta "virada para baixo"
    Precisa ser um conjunto de imagens gratuitas
        para não ter problemas com copyright
    Não consegui encontrar um conjunto gratuito,
        então criei as minhas próprias.
    Não é nenhuma maravilha, mas vai servir para os testes.

## 4.3) Iniciando

### 4.3.1) Botão de Start
    o botão Iniciar novo Jogo chama um ajax que devolve o html da tela de jogo
    Hora de admitir minha total falta de jeito com jogo de cores.
    Deixa do jeito que está e depois testa alguma coisa diferente
    Tons de azul para o Team-Human e tons de salmão para o Team-Robot

#### 4.3.1.1) Inicializar o Jogo no servidor
    Recebido o html da tela, JS chama uma url de inicializar o jogo
        que vai devolver um json
    Então precisa alterar a função geral_ajax para comportar isso
    OK função para tratar ajax que recebe json na resposta.
    OK game.php inicial para chamar o que foi passado na requisição,
        e devolver um json, se a resposta da chamada for um array

    Agora tratar a inicialização do jogo.
    A função é game_start_round
        porque vai ser chamada para iniciar qualquer rodada.
    Se tem um subarray game setado na session,
        então ele deve ter um id de jogo
    Se não tem, significa que não tem nenhum jogo iniciado,
        e precisa iniciar um novo.
    Primeiro, gera um id de jogo no banco de dados,
        associado ao id do usuário, e com uma data de início
    Inicialmente, para testar o retorno, somente devolver os dados do jogo
        e não salvar no banco dados
    Até aqui: está gerando um json de cartas embaralhadas correntamente

    Agora cria uma matriz que contém
        - baralho: cartas no "monte";
        - distrib: cartas em cada jogador e nos mortos;
        - garbage['cards']: inicia vazio, porque não tem cartas
        - garbage['closed_until']: inicia '', 
                        quando for jogado um 3preto ou coringa
                        muda para o número do jogador que poderá usar
        - games_human[]: inicia vazio, terá os jogos na mesa do time humano
        - games_robot[]: inicia vazio, terá os jogos do time robô
        - deadcards['human']['player']:  0, porque ainda não pegou o morto
        - deadcards['robot']['player']:  0, porque ainda não pegou o morto
        - deadcards['human']['status']:  ''
        - deadcards['robot']['status']:  ''
        - nextplayer = integer, número de 1 a 4 sorteado para ser o próximo jogador
            - depois passa a ser sequencial
        - e isso é tudo que é necessário para distribuir as cartas
    o json disso precisa ser salvo no banco de dados
        na tabela da rodada 1
        para o  caso de o jogo ser reiniciado
        essa tabela tem que salvar o json inicial da rodada
        e o json atual a cada jogada antes e depois do usuário
        não precisa salvar o json atual entre um robô e outro
        porque em teoria o algoritmo dos robôs vai executar,
            em cima das mesmas cartas,
            sempre a mesma jogada


    Primeiro, testar o retorno do json inicial completo,
        sem salvar no banco de dados
    se parecer ok, aí faz a gravação no banco de dados
        e o retorno limitado acima

    Teste OK, gravação no BD OK

#### 4.3.1.2) Inicializar o Jogo no FrontEnd
    Do array de dados do game,
    tem que preparar o que tem que será retornado para o front-end
    Do item acima, o json devolvido para o frontend precisa ter
        - número de cartas no monte
        - número de cartas de cada jogador e de cada morto
        - lista de cartas do usuário
        - lixo: número de cartas, última carta e status do closed
        - nextplayer
        - games_human
        - games_robot
        - deadcards
    Retorno Json para o Frontend ok,
        tratar exibição no frontend

### 4.3.2) Ajuste do frontend 

#### 4.3.2.1) Ícones e espaços
    Cada área de jogador precisa ter um ícone de identificação
        e uma div que vai exibir as cartas desse jogador
    A área do monte precisa estar dividida
        em duas sub-áreas, com duas imagens de marcação
            a do monte e a do lixo
    A área dos mortos também precisa ter a mesma divisão e marcação
    Deixar os espaços marcados exibindo imagem vazia
        é útil para depois calcular posicionamento para os novos itens

    Ok, marcações de espaço implementadas.
    Mais difícil foi a área de monte+lixo e área de mortos.
        mas google salvou

### 4.3.2.3) Animação da distribuição (next task)
    Como o front-end recebe os dados do servidor na inicialização do jogo,
        precisa fazer uma animação para exibir isso no front-end
        99,99% de certeza de que tenha biblioteca pronta para isso
        Mas a animação a princípio não é nada alienígena
            - partindo de posição XY e tamanho HW (do monte)
            - e tendo a posição XY e tamanho HW (do placeholder destino)
            - em um tempo total de 0.1s (66cartas = 6.6 segundos)
            - calcular a distância entre os dois centros
            - e a cada timeout de 0.001
            - alterar os dados da imagem para a nova posição
    Sequência
        - encontrar posição XY e medidas dos placeholders
        - teste de posicionar um elemento fake pré-existente no html
        - criar o elemento fake dinamicamente, usar no teste
        - desenvolver sequencias para todas as 6 cartas X todos os 6 places
        - integrar sons de distribuição de cartas
        - ao fim de cada posicionamento, 
            tratar os fakes e exibições
                - para os mortos 1 e 2
                    - se é a primeira carta,
                        mudar o src da imagem para o verso-folhas.gif
                    - senão apenas destruir a fake e pronto
                - para os players 2 a 4
                    - integrar a fake-card dentro do container
                - para o player 1
                    - integrar a fake-card dentro do container
                        e mudar o src image
                        para mostrar o valor conforme o que foi recebido
                        no json de retorno da distribuição de cartas
                        






              

    




        















