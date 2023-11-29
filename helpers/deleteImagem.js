// Storage do meu firebase
const storage = require('../config/firebase/firebaseStorageConfig').storage;

// funções do firebase/storage
const { getStorage, ref, deleteObject } = require('firebase/storage');

const deleteImage = (imagem) => {
    const deleteRef = ref(storage, imagem);
    deleteObject(deleteRef)
        .then(() => {
            console.log('\x1b[42;30m%s\x1b[0m', ` Imagem excluida com sucesso! `);
        })
        .catch((error) => {
            console.log('\x1b[38;5;9m%s\x1b[0m', ` Houve um erro ao excluir a imagem! `);
        })
}

module.exports = deleteImage