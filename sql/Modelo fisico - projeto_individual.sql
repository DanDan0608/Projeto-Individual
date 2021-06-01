-- -----------------------------------------------------
-- Schema projeto_individual
-- -----------------------------------------------------
create database projeto_individual;

USE projeto_individual;

-- -----------------------------------------------------
-- Table `projeto_individual`.`rota_favorita`
-- -----------------------------------------------------
CREATE TABLE rota_favorita (

  id_rota INT NOT NULL auto_increment,
  nome_rota VARCHAR(45) NULL,
  
  PRIMARY KEY (id_rota)
  
);

-- -----------------------------------------------------
-- Table `projeto_individual`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE Usuarios (

	id_usuario INT NOT NULL auto_increment,
	nickname_lol VARCHAR(45) not null,
	senha_usuario VARCHAR(45) not null,
	email_usuario varchar(45) not null,
	fk_rota INT NOT NULL,
	PRIMARY KEY (id_usuario),
  
	FOREIGN KEY (fk_rota) REFERENCES rota_favorita (id_rota)
    
);


-- -----------------------------------------------------
-- Table `projeto_individual`.`tipo_ocorrencia`
-- -----------------------------------------------------
CREATE TABLE tipo_ocorrencia (

	id_tipo INT NOT NULL auto_increment,
	nome_tipo VARCHAR(45) not null,
	criticidate VARCHAR(45) not null,
  
	PRIMARY KEY (id_tipo)
  
);

-- -----------------------------------------------------
-- Table `projeto_individual`.`Ocorrencias`
-- -----------------------------------------------------
CREATE TABLE Ocorrencias (

	id_ocorrencia INT NOT NULL auto_increment,
	desc_ocorrencia VARCHAR(120) not null,
	fk_tipo INT NOT NULL,
	fk_usuario INT NOT NULL,
  
	PRIMARY KEY (id_ocorrencia),
    FOREIGN KEY (fk_tipo) REFERENCES tipo_ocorrencia (id_tipo),
    FOREIGN KEY (fk_usuario) REFERENCES Usuarios (id_usuario)

);

insert into tipo_ocorrencia values
(null, 'Atitude negativa', '1'), (null, 'Abandono de partida/ociosidade', '2'),
(null, 'Abuso Verbal', '3'), (null, 'Feeding intencional', '4'), 
(null, 'Discurso de ódio', '5');

insert into rota_favorita values
(null, 'TopLane'), (null, 'MidLane'), (null, 'Jungle'), (null, 'adCarry'), (null, 'Suporte');

select * from usuarios left join ocorrencias on id_usuario = fk_usuario where fk_rota = 4 or fk_rota = 5;

select * from usuarios left join ocorrencias on id_usuario = fk_usuario;

select * from rota_favorita;

show tables;

select * from ocorrencias;

select id_usuario from usuarios where nickname_lol = 'DDKESL';

desc rota_favorita;
