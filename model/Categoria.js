const sequelize = require("sequelize");

// Importando a conexão com o banco de dados
const connection = require("../database/database");

// Definindo os campos da tabela Categoria
const Categoria = connection.define(
    'tbl_categoria', // Tabela em especifico que desejo;
    {
        codigo_categoria:{
            type: sequelize.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        
        nome_categoria:{
            type: sequelize.STRING(255),
            allowNull: false
        },
        observacoes_categoria: {
            type: sequelize.TEXT,
            allowNull: false  
        }
    }
);

// Sincronizando o DB e criando a tabela caso ela NÃO exista.
Categoria.sync({force:false})

module.exports = Categoria
