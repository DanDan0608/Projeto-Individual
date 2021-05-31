'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let ocorrencia = sequelize.define('ocorrencia',{
		id: {
			field: 'id_ocorrencia',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		desc: {
			field: 'desc_ocorrencia',
			type: DataTypes.STRING,
			allowNull: false
		},
		fk_tipo: {
			field: 'fk_tipo',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		fk_usuario: {
			field: 'fk_usuario',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'ocorrencias', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return ocorrencia;
};
