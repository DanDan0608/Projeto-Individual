	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		id: {
			field: 'id_usuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nick: {
			field: 'nickname_lol',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email_usuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha_usuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		rota: {
			field: 'fk_rota',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'Usuarios', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};
