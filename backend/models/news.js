const mongoose = require('mongoose');

// Definir um esquema para as notícias
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // O título é obrigatório
    },
    content: {
        type: String,
        required: true // O conteúdo é obrigatório
    },
    author: {
        type: String,
        required: true // O autor é obrigatório
    },
    category: {
        type: String,
        required: true // A categoria é obrigatória
    },
    date: {
        type: Date,
        default: Date.now // A data atual será atribuída por padrão
    }
});

// Exportar o modelo baseado no esquema
module.exports = mongoose.model('News', newsSchema);
