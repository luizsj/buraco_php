/* links
https://www.leobreda.net/artigos/instalando-o-mysql-no-docker-43.html


starting
sudo docker run --detach --name mariadb_docker -p3306:3306 -v /var/www/html/buraco_php/bd/data:/var/lib/mysql  --env MARIADB_USER=luizsoares --env MARIADB_PASSWORD=golf_card --env MARIADB_ROOT_PASSWORD=my_golf_field  mariadb:latest

sudo docker stop mariadb_docker

sudo docker start mariadb_docker

enter container console
docker exec -it mariadb_docker bash

mariadb -u root -p
my_golf_field


Create database buraco_araucaria;


CREATE USER 'luizsoares'@'172.17.0.1' IDENTIFIED BY 'golf_card';
GRANT ALL PRIVILEGES ON site_buraco.* TO 'luizsoares'@'172.17.0.1';
FLUSH PRIVILEGES;

*/

Create table users(
    id integer auto_increment,
    username varchar(15),
    email varchar(150),
    hashed_password varchar(255),
    created_at timestamp default current_timestamp,
    last_login timestamp,
    constraint pk_users primary key(id)
);
Create unique index idx_user_name on users(username);
Create unique index idx_user_email on users(email);
