# buraco_php
Objetivo: Estudar CSS e JS em backend PHP
Meio: desenvolver um jogo de baralho clássico


1) Início
    Desenvolver jogo humano vs computador

1.1) Estrutura Básica

1.1.1) Backend Inicial
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

1.2.1) Registro Simples de Usuário
    A página inicial solicita um login.
        Login Social OAuth2 com facebook, google e twitter
        serão implementados no futuro, porque não são o foco neste momento.
    Então por enquanto será desenvolvido um controle simples,
        no banco de dados Local.
    Este recurso é considerado bastante simples
        e não será detalhado aqui.

1.2.1.1) Registro e Login desenvolvidos
    O suficiente para manter a lógica por enquanto
    Recursos de Logout, Editar Conta e Esqueci minha senha
        serão implementados no futuro.

1.2.1.2) Depois do Login
    Um usuário logado tem seu dados salves em uma sessão.
    Depois do login, será exibida uma tela inicial
        que terá vários recursos no futuro
        por enquanto só a marcação de local com um texto
        como um ranking de jogado e a lista dos últimos jogos do usuário
    Os recursos iniciais e mais importantes agora são
        Iniciar um Novo Jogo
        Continuar um jogo suspenso (quando houver)

2) Jogo 

2.1) Design da Mesa

2.1.1) Layout Básico de Tela
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

2.1.2) Consequências
    Há um desafio claro nos primeiros rascunhos
        , quanto ao design responsivo.
    Supondo telas "paisagem" (largura maior que altura)
        como desktops e notebooks
        a exibição fica de um jeito
        e fica de outro em telas "retrato" (largura menor que altura)
        como em tablets e celulares

2.1.3) Pausa para fazer testes
    a) rascunhar diagramas
        a.1) 4 jogadores, paisagem 1920x1080
        a.2) 4 jogadores, retrato 1020x180
        a.3) 6 jogadores, paisagem 1920,1080

    b) desenvolver rascunho layout html+css
        b.1) usando as tags do bootstrap e mais css adicional



        


2.2) Baralho e Rounds
    O jogo usa 4 baralhos completos, incluindo os 2 Coringões de cada baralho
    Então inicialmente há 4*54 = 216 cartas
    Um jogo é composto de rodadas
        , ao final de cada uma os pontos são somados e acumulados
        e o jogo completo acaba quando, ao terminar uma rodada
            um dos times tenha ultrapassado 10.000 pontos
    Os pontos pertencem ao time, não ao jogador individual.
    Cada carta possui um valor de face e um valor de pontos
    E cada "coluna" de jogo baixado tem um determinado valor
    Além disso há "eventos" que somam ou subtraem pontos
    


