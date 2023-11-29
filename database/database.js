// Importando o modulo do sequelize
const sequelize = require("sequelize");

const connection = new sequelize(
    "bd_atv_PW2",
    "root",
    "",
    {
        host: "localhost",
        port: "3306",
        dialect: "mysql",
        timezone: "-03:00",
        logging: false
    }
);

if (!connection.config.logging){
    console.log(`\x1b[43m%s\x1b[0m`, ' Aviso: O logging está desativado na configuração de conexão do projeto \n');
};

module.exports = connection;