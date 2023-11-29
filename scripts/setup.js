// biblioteca para criação de arquivos
const fs = require("fs");

// conteudo do arquivo .env que será criado.
const envContent = `

# firebase config's

API_KEY= "",
AUTH_DOMAIN= "",
PROJECT_ID= "",
STORAGE_BUCKET= "",
MSG_ID= "",
APP_ID= "",
MSR_ID= "",

# necessário consultar seus dados nas configurações de seu projeto no firebase
# inserir os dados entre as aspas

# Port number

PORT= ""

`;

// criandoo o arquivo ja adicionando seu conteudo
fs.writeFileSync('.env', envContent.trim());

console.log('\x1b[42;30m%s\x1b[0m', ' .env file created successfully with default values. ');