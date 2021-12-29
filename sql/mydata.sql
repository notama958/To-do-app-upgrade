drop table if exists user;
drop table if exists USER;
create table user
(
    user_id             integer         not null unique
    , username          varchar(15)     not null
    , email             varchar(15)     not null
    , password          char(60)      not null
    , constraint user_id_primary_key
    primary key (user_id)
);

drop table if exists tag;
drop table if exists TAG;
create table tag
(
    tag_id              integer         not null unique
    , tagname           varchar(15)     not null
    , owner_id          integer
    , constraint tag_id_primary_key
    primary key (tag_id)

);


drop table if exists list;
drop table if exists LIST;
create table list
(
    task_id             integer         not null unique
    , desc              varchar(20)     not null
    , status            integer         not null
    , created           timestamp       not null
    , alarm             timestamp  -- it's not mandatory to have alarm for a task
    , tag_id            integer         not null
    , user_id           integer         not null
    , constraint    tag_id_foreign_key
    foreign key (tag_id)
    references  tag (tag_id)
    on delete cascade
    , constraint    user_id_foreign_key
    foreign key (user_id)
    references  user (userid)
    on delete cascade

);

drop trigger if exists update_when_delete_tag;
create trigger update_when_delete_tag
before delete on tag
begin
update list set tag_id = (select tag_id from tag where tagname='normal')
where list.tag_id=old.tag_id;
end;

insert into tag (tag_id,tagname)
values (100,"priority")
, (101,"important")
,(102,"normal")
;
