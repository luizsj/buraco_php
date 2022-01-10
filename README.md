# buraco_php
Study JS and CSS developing a popular card game


1) Start
    Develop human vs computer game

1.1) Basic Structure

1.1.1) Logic of Start
    First index.php is responsible for create a simple home page
        calling a function from screen.php
        wich returns de basic html, linking css and js files.
    Also, index.php declare requires of additional php files.
    Will be used Bootstrap for a minimal design effects.
    A PostgreSql database will be used at this project.
    Login is needed to identify user
        and as a first resource continuous save data about current game,
        because it may be interrupted for any reason
            (at develop time, by errors and adjusts)
        and is desired that the player can restart it at the interrupted point.

1.2.1) Simple User Register
    The homepage asks visitor for login.
        Social login will be implemented on the future, 
            because it needs register as a developer in the plataforms,
            and some needs a functional published url too,
            and this will take some precious time at this moment.
    So, I will develop the local structure for users.
    This resource is off-toppic, and will not be detailed.
    
1.2.1.1) Register and Login developed
    This is enough to mantain the logical for now.
    Resources logout, edit account and forgot password will be implemented later.

1.2.1.2) After Login
    A logged user have his data saved in Session[user] subarray
    After Login, will be displayed a start screen
        that will have various resources
        which will be developed in future
        like a ranking of players
            and last games played
        and a principal is START NEW GAME
        








