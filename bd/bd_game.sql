Create table games (
    id integer auto_increment,
    user_id integer,
    created_at timestamp default current_timestamp,
    current_round integer default 1,
    points_human integer default 0,
    points_robot integer default 0,
    constraint pk_game primary key(id),
    constraint fk_game_user foreign key(user_id) references users (id)
);
Create Index idx_game_users on games(user_id);

Create Table gamerounds (
    game_id integer,
    round_id integer,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    last_json JSON,
    constraint pk_gameround primary key (game_id, round_id),
    constraint fk_gameround_game foreign key (game_id) references games(id)
);