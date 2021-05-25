create database league_of_friends;

use league_of_friends;

-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Table `league_of_friends`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE `Usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nick_lol` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `rota_preferida` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `league_of_friends`.`Reports`	
-- -----------------------------------------------------
CREATE TABLE `Reports` (
  `id_reports` INT NOT NULL,
  `classificação_report` VARCHAR(45) NULL,
  `descricao_report` VARCHAR(45) NULL,
  `Usuario_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_reports`),
  INDEX `fk_Reports_Usuario_idx` (`Usuario_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Reports_Usuario`
    FOREIGN KEY (`Usuario_id_usuario`)
    REFERENCES `mydb`.`Usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

select * from usuario;