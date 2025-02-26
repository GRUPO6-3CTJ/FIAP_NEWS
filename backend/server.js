const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config'); // Certifique-se de que o arquivo config.js esteja correto
const News = require('./models/news'); // Importando o modelo News

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permite CORS para chamadas da API
app.use(bodyParser.json()); // Para analisar o corpo das requisições em JSON

// Conexão com o MongoDB
mongoose.connect(config.mongoURI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rota para criar uma nova notícia (POST)
app.post('/api/news', async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para obter todas as notícias (GET)
app.get('/api/news', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter uma notícia específica por ID (GET)
app.get('/api/news/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'Notícia não encontrada.' });
        }
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para atualizar uma notícia por ID (PUT)
app.put('/api/news/:id', async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!news) {
            return res.status(404).json({ message: 'Notícia não encontrada.' });
        }
        res.json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para deletar uma notícia por ID (DELETE)
app.delete('/api/news/:id', async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'Notícia não encontrada.' });
        }
        res.json({ message: 'Notícia removida com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Início do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
