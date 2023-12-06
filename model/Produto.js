const sequelize = require("sequelize");

// Importando a conexão com o banco de dados
const connection = require("../database/database")

// Requisitando a tbl Categoria para a criação da FK
const Categoria = require("./Categoria");

const Produto = connection.define(
    'tbl_produto', // nome da tabela
    {
        codigo_produto: {
            type: sequelize.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nome_produto: {
            type: sequelize.STRING(255),
            allowNull: false
        },
        valor_produto: {
            type: sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        imagem_peq:{
            type: sequelize.STRING,
            allowNull: false
        },
        imagem_peq_url:{
            type: sequelize.STRING,
            allowNull: false
        },
        imagem_grd:{
            type: sequelize.STRING,
            allowNull: false
        },
        imagem_grd_url:{
            type: sequelize.STRING,
            allowNull: false
        },
        descricao_produto: {
            type: sequelize.TEXT,
            allowNull: false
        },
        codigo_categoria: {
            type: sequelize.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
                model: Categoria,
                key: 'codigo_categoria',
            },
        }
    }
);

// Modo de criação da FK
Categoria.hasMany(Produto, { foreignKey: 'codigo_categoria' });
Produto.belongsTo(Categoria, { foreignKey: 'codigo_categoria' });

// Sincronizando e criando a tabela caso não exista
Produto.sync({ force: false })

module.exports = Produto;