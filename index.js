// função que permite usar os dados do arquivo .env
require('dotenv').config();

const app = require('./config/express/expressConfig')

// PORT usada para rodar o projeto
const PORT = process.env.PORT || 3000;

// Importando as rotas
// ...
// ...
// ...
// ...

app.listen(PORT, ()=>{
    console.log('\x1b[42;30m%s\x1b[0m', ` API RODANDO EM - http://localhost:${PORT} `);
});
