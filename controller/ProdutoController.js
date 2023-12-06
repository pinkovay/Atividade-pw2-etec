// Importando as configurações do storageFirebase & ás inicializando.
const storage = require('../config/firebase/firebaseStorageConfig').storage;
const storageAll = require('../config/firebase/firebaseStorageConfig');
// router
const router = require('../config/router/routerConfig');
// produto
const produto = require('../model/Produto')
// atalhos
const uploadImage = require('../helpers/uploadImagem');
const deleteImage = require('../helpers/deleteImagem');

router.get('/teste', (req, res) => {
    console.log("\nSua rota de produto está funcionando");
    res.send("Dados enviados ao console");
});

router.post('/cadastrarProduto', uploadImage.array('files', 2), (req, res) => {

    const { nome_produto, valor_produto, descricao_produto, codigo_categoria } = req.body;
    let imagem_peq_url, imagem_peq, imagem_grd_url, imagem_grd;
    let count = 0;
    const files = req.files;

    files.forEach(file => {

        // AQUI PRETENDO USAR A BIBLIOTECA SLUGIFY FUTURAMENTE
        const fileName = Date.now().toString() + '-' + file.originalname;
        const fileRef = storageAll.ref(storage, fileName);

        storageAll.uploadBytes(fileRef, file.buffer)
            .then((snapshot) => {
                imageRef = storageAll.ref(storage, snapshot.metadata.name);

                storageAll.getDownloadURL(imageRef)
                    .then((urlFinal) => {
                        if (count == 0) {
                            // imagem pequena
                            imagem_peq = fileName;
                            imagem_peq_url = urlFinal;
                            count++;
                            console.log('\x1b[38;5;33m%s\x1b[0m', `\nNome da imagem pequena: ${imagem_peq} `);
                            console.log('\x1b[38;5;33m%s\x1b[0m', `\nUrl da imagem pequena: ${urlFinal} `);
                        } else {
                            // imagem grande
                            imagem_grd = fileName;
                            imagem_grd_url = urlFinal;
                            count++;
                            console.log('\x1b[38;5;33m%s\x1b[0m', `\nNome da imagem grande: ${imagem_grd} `);
                            console.log('\x1b[38;5;33m%s\x1b[0m', `\nUrl da imagem grande: ${urlFinal} `);
                        };

                        if (imagem_peq && imagem_grd) {
                            // Gravando o produto no banco de dados
                            produto.create({
                                nome_produto, valor_produto, imagem_grd, imagem_grd_url, imagem_peq, imagem_peq_url, descricao_produto, codigo_categoria
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

    produto.findByPk(codigo_produto)
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

    produto.findByPk(codigo_produto)
        .then(
            (produto) => {
                deleteImage(produto.imagem_peq)
                deleteImage(produto.imagem_grd)
                produto.destroy({
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

    const { nome_produto, valor_produto, descricao_produto, codigo_categoria, imagem_peq, imagem_grd, codigo_produto } = req.body;

    /** UPDATE SEM IMAGEM **/
    produto.update(
        {
            nome_produto,
            valor_produto,
            descricao_produto,
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

