// Importando as configurações do storageFirebase & ás inicializando.
const storage = require('../config/firebase/firebaseStorageConfig').storage;
const storageAll = require('../config/firebase/firebaseStorageConfig');
// router
const router = require('../config/router/routerConfig');

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
                            imagem_peq = fileName;
                            imagem_peq_url = urlFinal;
                            count++;
                            console.log('\x1b[38;5;33m%s\x1b[0m', `\n Nome da imagem pequena: ${imagem_peq} `);
                        }
                    });
            })
    });
});

module.exports = router;

