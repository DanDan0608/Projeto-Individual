var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;
var ocorrencia = require('../models').ocorrencia;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var nick = req.body.nick; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
	
	let instrucaoSql = `select * from usuarios where nickname_lol='${nick}' and senha_usuario='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.nickname_lol)
			sessoes.push(resultado[0].dataValues.fk_rota);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um usuário');
	
	Usuario.create({

		nick: req.body.nick,
		email: req.body.email,
		senha: req.body.senha,
		rota: req.body.rota

	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

	var id_users = '';

router.post('/registrar', function(req, res, next) {
	console.log('Criando uma ocorrencia');

	var nick = req.body.nick;

	console.log(`Nick recebido: ${nick}`)

	let instrucaoSql = `select id_usuario from usuarios where nickname_lol = '${nick}'`;

	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {

		id_users = resultado[0].dataValues.id_usuario;

		console.log(`${id_users}`);

	ocorrencia.create({

		desc: req.body.desc_ocorrencia,
		fk_tipo: req.body.tipo_reporte,
		fk_usuario: id_users

	}).then(result => {

		console.log(`Registro criado: ${result}`)

        res.send(result);

    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);

  		});
	});
});
/* Verificação de usuário */
router.get('/sessao/:nick', function(req, res, next) {
	let nick = req.params.nick;
	console.log(`Verificando se o usuário ${nick} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == nick) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${nick} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
	
});


/* Logoff de usuário */
router.get('/sair/:nick', function(req, res, next) {
	let nick = req.params.nick;
	console.log(`Finalizando a sessão do usuário ${nick}`);
	let nova_sessoes = [];
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != nick) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${nick} finalizada com sucesso!`);
});

var jogadores = [];
var rotas_jogadores = [];
var ocorrencias = [];
var todos_registros = [];

/* Recuperar todos os usuários */
router.get('/buscar/:fk_rota', function(req, res, next) {
	
	var fk_rota = req.params.fk_rota;

	let instrucaoSql = "";

	if(fk_rota == 15){

		instrucaoSql = `select * from usuarios left join ocorrencias on id_usuario = fk_usuario`;

	}else if(fk_rota == 9){

		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select * from usuarios left join ocorrencias on id_usuario = fk_usuario where fk_rota = 4 or fk_rota = 5`;

	}else{

		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select * from usuarios left join ocorrencias on id_usuario = fk_usuario where fk_rota = ${fk_rota}`;
	
	}

	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario 
	}).then(resultado => {

		console.log(`Encontrados: ${resultado.length}`);

		jogadores = [];
		rotas_jogadores = [];
		ocorrencias = [];
		todos_registros = [];

		for(var cont = 0; cont < resultado.length ; cont++){

		console.log(`enviando ${resultado[cont].dataValues.nickname_lol}`);
		console.log(`enviando ${resultado[cont].dataValues.fk_rota}`);
		console.log(`enviando ${resultado[cont].dataValues.desc_ocorrencia}`);

		if(resultado[cont].dataValues.desc_ocorrencia == null){

			var desc_ocorrencia = `sem ocorrencias`;

			todos_registros.push(resultado[cont].dataValues.nickname_lol, resultado[cont].dataValues.fk_rota,
				desc_ocorrencia);

		}else if(resultado[cont].dataValues.id_usuario == resultado[cont + 1].dataValues.id_usuario){
			
			ocorrencias.push(`${resultado[cont].dataValues.desc_ocorrencia} <br><br> ${resultado[cont+1].dataValues.desc_ocorrencia}`);

			console.log(`colocando ocorrencias no vetor: ${resultado[cont].dataValues.desc_ocorrencia,
				 resultado[cont+1].dataValues.desc_ocorrencia}`)

			todos_registros.push(resultado[cont].dataValues.nickname_lol, resultado[cont].dataValues.fk_rota,
				ocorrencias);

				cont++;

		}else{
			
			todos_registros.push(resultado[cont].dataValues.nickname_lol, resultado[cont].dataValues.fk_rota,
				resultado[cont].dataValues.desc_ocorrencia);
			

			}

		}
	
	res.json(todos_registros);

	console.log(`res.json = ${todos_registros}`);

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});

});

module.exports = router;
