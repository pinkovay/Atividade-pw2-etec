// Importando as configurações do storageFirebase & ás inicializando.
const storage = require('../config/firebase/firebaseStorageConfig').storage;
const storageAll = require('../config/firebase/firebaseStorageConfig');
// router
const router = require('../config/router/routerConfig');
// produto
const produto = require('../model/Produto')

router.get('/teste', (req, res) => {
    console.log("\nSua rota de produto está funcionando");
    res.send("Dados enviados ao console");
});

router.post('/cadastrarProduto', upload.array('files', 3), (req, res) => {

    const { titulo, preco, detalhes, codigo_categoria } = req.body;
    let imagem_peq_url, imagem_peq, imagem_grd_url, imagem_grd;
    let count = 0;
    const files = req.files;

    files.forEach(file => {

        // AQUI PRETENDO USAR A BIBLIOTECA SLUGIFY FUTURAMENTE
        const fileName = Date.now().toString() + '-' + file.orinalName;
        const fileRef = ref(storage, fileName);

        storageAll.uploadBytes(fileRef, file.buffer)
            .then((snapshot) => {
                imageRef = ref(storage, snapshot.metadata.name);

                storageAll.getDownloadURL(imageRef)
                    .then((urlFinal) => {
                        if (count == 0) {
                            // imagem pequena
                            imagem_peq = fileName;
                            imagem_peq_url = urlFinal;
                            count++;
                            console.log('\x1b[38;5;33m%s\x1b[0m', `\n Nome da imagem pequena: ${imagem_peq} `);
                            console.log('\x1b[38;5;33m%s\x1b[0m', `\n Url da imagem pequena: ${urlFinal} `);
                        } else {
                            // imagem grande
                            imagem_grd = fileName;
                            imagem_grd_url = urlFinal;
                            count++;
                            console.log('\x1b[38;5;33m%s\x1b[0m', `\n Nome da imagem pequena: ${imagem_grd} `);
                            console.log('\x1b[38;5;33m%s\x1b[0m', `\n Url da imagem pequena: ${urlFinal} `);
                        };

                        if (imagem_peq && imagem_grd) {
                            // Gravando o produto no banco de dados
                            produto.create({
                                titulo, preco, imagem_grd, imagem_grd_url, imagem_peq, imagem_peq_url, detalhes, codigo_categoria
                            }).then(() => {
                                return res.status(201).json({
                                    errorStatus: false,
                                    mensagemStatus: 'Produto inserido com sucesso.'
                                });
                            }).catch((erro) => {
                                return res.status(400).json({
                                    errorStatus: true,
                                    errorMensagem: erro
                                });
                            });

                        };
                    });
            }).catch((error) => {
                res.send(`ERRO: ${error}`)
            });
    });
});

router.get('/listarProduto', (req, res) => {

    produto.findAll()
        .then((produtos) => {
            return res.status(200).json(produtos)
        }).catch((erro) => {
            return res.status(400).json({
                errorStatus: true,
                errorMensagem: erro
            })
        });
});

router.get('/listarProduto/:codigo_produto', (req, res) => {

    const { codigo_produto } = req.params

    livro.findByPk(codigo_produto)
        .then((produto) => {
            return res.status(200).json(produto)
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.delete('/excluirProduto/:codigo_produto', (req, res) => {

    const { codigo_produto } = req.params;

    livro.findByPk(codigo_produto)
        .then(
            (produto) => {
                deleteImage(livro.imagem_peq)
                deleteImage(livro.imagem_grd)
                livro.destroy({
                    where: { codigo_produto }
                }).then(
                    () => {
                        return res.status(200).json({
                            erroStatus: false,
                            mensagemStatus: 'Produto excluído com sucesso.'
                        });
                    }).catch((erro) => {
                        return res.status(400).json({
                            erroStatus: true,
                            erroMensagem: erro
                        });
                    });
            });
});

router.put('/editarProduto', (req, res) => {

    const { titulo, preco, detalhes, codigo_categoria, imagem_peq, imagem_grd, codigo_livro } = req.body;

    /** UPDATE SEM IMAGEM **/
    produto.update(
        {
            titulo,
            preco,
            detalhes,
            imagem_peq,
            imagem_grd,
            codigo_categoria
        },
        { where: { codigo_produto } }
    ).then(
        () => {
            return res.status(200).json({
                erroStatus: false,
                mensagemStatus: 'Produto alterado com sucesso.'
            });
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

module.exports = router;

