"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (request, response) => {
    console.log('Entrou na raiz');
    return response.send('Olá');
});
app.get('/usuarios', (request, response) => {
    const { page } = request.query; // http://localhost:8080/usuarios?page=1
    return response.send('Olá');
});
app.get('/usuarios/:id', (request, response) => {
    const { id } = request.params; // http://localhost:8080/usuarios/10
    if (!id || id === '0') {
        return response.status(400).json({
            mensagem: 'ID inválido'
        });
    }
    return response.json({
        id,
        nome: 'Kley',
        idade: 18
    });
});
app.post('/usuarios', (request, response) => {
    const { nome, idade } = request.body;
    if (!nome || !idade) {
        return response.status(400).json({
            mensagem: 'Dados inválidos'
        });
    }
    return response.status(201).json({
        nome,
        idade
    });
});
app.put('/usuarios/:id', (request, response) => {
    const { nome, idade } = request.body;
    const { id } = request.params;
    if (!nome || !idade || !id) {
        return response.status(400).json({
            mensagem: 'Dados inválidos'
        });
    }
    return response.json({
        id,
        nome,
        idade
    });
});
app.delete('/usuarios/:id', (request, response) => {
    const { id } = request.params;
    if (!id) {
        return response.status(400).json({
            mensagem: 'ID inválido'
        });
    }
    return response.sendStatus(204);
});
app.listen(8080, () => {
    console.log('API rodando...');
});
