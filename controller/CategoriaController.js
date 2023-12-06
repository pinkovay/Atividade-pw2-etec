const express = require('express');
// Model a ser manipulada
const categoria = require('../model/Categoria')

const router = require('../config/router/routerConfig');

router.post("/cadastrarCategoria", (req, res) => {

    let { nome_categoria, observacoes_categoria } = req.body;

    categoria.create({ nome_categoria, observacoes_categoria })
        .then(() => {
            return res.status(201).json({
                errorStatus: false,
                messageStatus: `Categoria ${nome_categoria} inserida com sucesso!`
            })
        })
        .catch(((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: `ERRO ENCONTRADO: ${error}`
            });
        }));
});

router.get("/listarCategoria", (req, res) => {
    categoria.findAll()
        .then(
            (categorias) => {
                return res.status(200).json(categorias);
            }
        )
        .catch(((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: `ERRO ENCONTRADO: ${error}`
            });
        }));
});

router.get("/listarCategoria/:codigo_categoria", (req, res) => {

    let { codigo_categoria } = req.params;

    categoria.findByPk(codigo_categoria)
        .then(
            (categoriaBuscada) => {
                return res.status(200).json(
                    `O código [${codigo_categoria}] faz referência a categoria: ${categoriaBuscada.nome_categoria}`
                )
            }
        )
        .catch(((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: `ERRO ENCONTRADO: ${error}`
            });
        }));
});

router.put('/alterarCategoria', (req, res) => {

    let { codigo_categoria, nome_categoria } = req.body;

    categoria.update(
        { nome_categoria },
        { where: { codigo_categoria } }
    ).then(
        () => {
            return res.status(200).json({
                errorStatus: false,
                messageStatus: "Categoria alterada com sucesso"
            });
        }).catch(
            (error) => {
                return res.status(500).json({
                    errorStatus: true,
                    messageStatus: error
                });
            });
});

router.delete('/excluirCategoria/:codigo_categoria', (req, res)=>{
    let {codigo_categoria} = req.params;

    categoria.destroy(
        {where:{codigo_categoria}}
    )
    .then(
        ()=>{
            return res.status(200).json(
                {
                    errorStatus: false,
                    messageStatus: "Categoria excluída com sucesso!"
                }
            )
        }
    )
    .catch(
        (error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});

module.exports = router;
