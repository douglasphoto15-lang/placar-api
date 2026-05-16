const express = require('express');
const cors = require('cors');
const app = express();

// O Render define a porta automaticamente, localmente usamos a 3000
const PORT = process.env.PORT || 3000;

// Configurações para o servidor entender JSON e aceitar conexões externas
app.use(cors());
app.use(express.json());

// Objeto que vai guardar o placar na memória do servidor
let placar = {
    time_casa: "PRODUZ",
    gols_casa: 0,
    time_fora: "SPORTS",
    gols_fora: 0,
    tempo: "00:00",
    periodo: "1T"
};

// Rota para o vMix consultar o placar (GET)
app.get('/placar', (req, res) => {
    res.json(placar);
});

// Rota para o painel do tablet atualizar o placar (POST)
app.post('/atualizar', (req, res) => {
    // Mescla o que já existe no placar com os dados novos que o tablet enviou
    placar = { ...placar, ...req.body };
    res.json({ success: true, atual: placar });
});

// Liga o servidor na porta correspondente
app.listen(PORT, () => {
    console.log(`Servidor do placar rodando com sucesso na porta ${PORT}`);
});